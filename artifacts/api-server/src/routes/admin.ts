import { Router, type IRouter } from "express";
import { createHmac } from "crypto";
import { db, stockTable, settingsTable, productImagesTable } from "@workspace/db";
import { eq, asc, max } from "drizzle-orm";
import { randomUUID } from "crypto";
import { logger } from "../lib/logger";
import { adminGuard, signToken } from "../middleware/adminAuth";

const router: IRouter = Router();

const SECRET   = process.env["SESSION_SECRET"] ?? "dev-secret";
const PASSWORD = process.env["ADMIN_PASSWORD"] ?? "candys2025";

/* ──────────────────── AUTH ──────────────────── */

router.post("/login", (req, res) => {
  const { password } = req.body as { password?: string };
  if (!password) { res.status(400).json({ error: "MISSING_PASSWORD" }); return; }

  // Constant-time compare
  const expected = createHmac("sha256", SECRET).update(PASSWORD).digest("hex");
  const received = createHmac("sha256", SECRET).update(password).digest("hex");
  if (expected !== received) {
    res.status(401).json({ error: "WRONG_PASSWORD" });
    return;
  }

  const ts  = Date.now();
  const sig = signToken(ts);
  res.cookie("admin_token", `${ts}:${sig}`, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 8 * 60 * 60 * 1000, // 8 h
    secure: process.env["NODE_ENV"] === "production",
  });
  res.json({ ok: true });
});

router.post("/logout", (_req, res) => {
  res.clearCookie("admin_token");
  res.json({ ok: true });
});

router.get("/me", adminGuard, (_req, res) => {
  res.json({ authenticated: true });
});

/* ──────────────────── STOCK ──────────────────── */

router.get("/stock", adminGuard, async (_req, res) => {
  try {
    const rows = await db.select().from(stockTable).orderBy(asc(stockTable.id));
    res.json(rows);
  } catch (err) {
    logger.error({ err }, "admin: stock fetch failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

router.put("/stock/:id", adminGuard, async (req, res) => {
  const { id } = req.params;
  const { qty } = req.body as { qty: number };
  if (typeof qty !== "number" || qty < 0) {
    res.status(400).json({ error: "INVALID_QTY" });
    return;
  }
  try {
    await db
      .update(stockTable)
      .set({ qty, updatedAt: new Date() })
      .where(eq(stockTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "admin: stock update failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

/* ──────────────────── SETTINGS (precios) ──────────────────── */

router.get("/settings", adminGuard, async (_req, res) => {
  try {
    const rows = await db.select().from(settingsTable);
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value;
    res.json(map);
  } catch (err) {
    logger.error({ err }, "admin: settings fetch failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

router.put("/settings/:key", adminGuard, async (req, res) => {
  const { key } = req.params;
  const { value } = req.body as { value: string };
  if (!value) { res.status(400).json({ error: "MISSING_VALUE" }); return; }
  try {
    await db
      .insert(settingsTable)
      .values({ key, value, updatedAt: new Date() })
      .onConflictDoUpdate({ target: settingsTable.key, set: { value, updatedAt: new Date() } });
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "admin: settings update failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

/* ──────────────────── PRODUCTS (CRUD) ──────────────────── */

/** Returns unique products [{id, name}] derived from the stock table */
router.get("/products", adminGuard, async (_req, res) => {
  try {
    const rows = await db.select().from(stockTable).orderBy(asc(stockTable.productId));
    const seen = new Set<string>();
    const products: { id: string; name: string }[] = [];
    for (const r of rows) {
      if (!seen.has(r.productId)) {
        seen.add(r.productId);
        products.push({ id: r.productId, name: r.productName });
      }
    }
    res.json(products);
  } catch (err) {
    logger.error({ err }, "admin: products fetch failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

/** Create a new product — inserts M + L stock rows with optional initial qty and prices */
router.post("/products", adminGuard, async (req, res) => {
  const { name, qtyM, qtyL, priceM, priceL } = req.body as {
    name?: string;
    qtyM?: number;
    qtyL?: number;
    priceM?: string;
    priceL?: string;
  };
  if (!name?.trim()) { res.status(400).json({ error: "MISSING_NAME" }); return; }

  try {
    // Determine next product ID (find max pN number)
    const rows = await db.select({ id: stockTable.productId }).from(stockTable);
    const nums = [...new Set(rows.map(r => r.id))]
      .map(id => { const m = id.match(/^p(\d+)$/); return m ? parseInt(m[1]) : 0; });
    const nextN = (nums.length ? Math.max(...nums) : 4) + 1;
    const productId = `p${nextN}`;

    const initialQtyM = typeof qtyM === "number" && qtyM >= 0 ? qtyM : 0;
    const initialQtyL = typeof qtyL === "number" && qtyL >= 0 ? qtyL : 0;

    await db.insert(stockTable).values([
      { id: `${productId}-M`, productId, productName: name.trim(), size: "M", qty: initialQtyM },
      { id: `${productId}-L`, productId, productName: name.trim(), size: "L", qty: initialQtyL },
    ]);

    // Optionally update global prices
    const priceUpdates: Promise<unknown>[] = [];
    if (priceM?.trim()) {
      priceUpdates.push(
        db.insert(settingsTable).values({ key: "price_m", value: priceM.trim(), updatedAt: new Date() })
          .onConflictDoUpdate({ target: settingsTable.key, set: { value: priceM.trim(), updatedAt: new Date() } })
      );
    }
    if (priceL?.trim()) {
      priceUpdates.push(
        db.insert(settingsTable).values({ key: "price_l", value: priceL.trim(), updatedAt: new Date() })
          .onConflictDoUpdate({ target: settingsTable.key, set: { value: priceL.trim(), updatedAt: new Date() } })
      );
    }
    await Promise.all(priceUpdates);

    res.json({ ok: true, id: productId, name: name.trim() });
  } catch (err) {
    logger.error({ err }, "admin: product create failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

/** Rename a product — updates productName in all its stock rows */
router.put("/products/:id/name", adminGuard, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body as { name?: string };
  if (!name?.trim()) { res.status(400).json({ error: "MISSING_NAME" }); return; }
  try {
    await db.update(stockTable).set({ productName: name.trim() }).where(eq(stockTable.productId, id));
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "admin: product rename failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

/** Delete a product — removes all its stock rows and images */
router.delete("/products/:id", adminGuard, async (req, res) => {
  const { id } = req.params;
  try {
    await db.delete(stockTable).where(eq(stockTable.productId, id));
    await db.delete(productImagesTable).where(eq(productImagesTable.productId, id));
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "admin: product delete failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

/* ──────────────────── PRODUCT IMAGES ──────────────────── */

router.get("/images", adminGuard, async (_req, res) => {
  try {
    const rows = await db.select().from(productImagesTable).orderBy(asc(productImagesTable.productId), asc(productImagesTable.position));
    res.json(rows);
  } catch (err) {
    logger.error({ err }, "admin: images fetch failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

router.post("/images", adminGuard, async (req, res) => {
  const { productId, url, color } = req.body as {
    productId: string;
    url: string;
    color?: string | null;
  };
  if (!productId || !url) { res.status(400).json({ error: "MISSING_FIELDS" }); return; }
  const id = randomUUID();
  try {
    // Calculate next position so images maintain insertion order
    const [maxRow] = await db
      .select({ maxPos: max(productImagesTable.position) })
      .from(productImagesTable)
      .where(eq(productImagesTable.productId, productId));
    const nextPosition = (maxRow?.maxPos ?? -1) + 1;

    await db.insert(productImagesTable).values({
      id,
      productId,
      url,
      color: color?.trim() || null,
      position: nextPosition,
      updatedAt: new Date(),
    });
    res.json({ ok: true, id });
  } catch (err) {
    logger.error({ err }, "admin: image insert failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

router.put("/images/:id", adminGuard, async (req, res) => {
  const { id } = req.params;
  const { url, color } = req.body as { url?: string; color?: string | null };
  if (!url && color === undefined) { res.status(400).json({ error: "MISSING_FIELDS" }); return; }
  try {
    await db
      .update(productImagesTable)
      .set({
        ...(url ? { url } : {}),
        ...(color !== undefined ? { color: color?.trim() || null } : {}),
        updatedAt: new Date(),
      })
      .where(eq(productImagesTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "admin: image update failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

router.delete("/images/:id", adminGuard, async (req, res) => {
  const { id } = req.params;
  try {
    await db.delete(productImagesTable).where(eq(productImagesTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "admin: image delete failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

export default router;
