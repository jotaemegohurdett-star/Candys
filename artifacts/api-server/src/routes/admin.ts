import { Router, type IRouter } from "express";
import { createHmac } from "crypto";
import { db, stockTable, settingsTable, productImagesTable } from "@workspace/db";
import { eq, asc, max, sql, inArray } from "drizzle-orm";
import { randomUUID } from "crypto";
import { logger } from "../lib/logger";
import { adminGuard, signToken } from "../middleware/adminAuth";
import { positiveInteger, priceKey, resolvePrice } from "../lib/catalog-pricing";
import { recoverOriginalCatalog } from "../lib/recover-catalog";
import {
  CreateProductBody,
  GetAdminProductsResponse,
  UpdateProductDescriptionBody,
  UpdateProductDescriptionResponse,
  UpdateProductPricesBody,
  UpdateProductPricesResponse,
  UpdateSettingBody,
} from "@workspace/api-zod";

const router: IRouter = Router();
const PRODUCT_DESCRIPTION_PREFIX = "product_description_";

const SECRET   = process.env["SESSION_SECRET"] ?? "dev-secret";
const PASSWORD = process.env["ADMIN_PASSWORD"] ?? "candys2025";

function getRouteParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

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
  const id = getRouteParam(req.params.id);
  const { qty } = req.body as { qty: number };
  if (!Number.isSafeInteger(qty) || qty < 0) {
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
  const key = getRouteParam(req.params.key);
  const parsed = UpdateSettingBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "INVALID_SETTING" }); return; }
  const { value } = parsed.data;
  if (typeof value !== "string" || !value.trim()) { res.status(400).json({ error: "MISSING_VALUE" }); return; }
  if (key.startsWith("price_") && positiveInteger(value) === null) {
    res.status(400).json({ error: "INVALID_PRICE", message: "Ingresa un precio entero mayor que cero." }); return;
  }
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

/** Returns unique products and their saved descriptions */
router.get("/products", adminGuard, async (_req, res): Promise<void> => {
  try {
    const [rows, settingRows] = await Promise.all([
      db.select().from(stockTable).orderBy(asc(stockTable.productId)),
      db.select().from(settingsTable),
    ]);
    const descriptions = new Map<string, string>();
    for (const setting of settingRows) {
      if (setting.key.startsWith(PRODUCT_DESCRIPTION_PREFIX)) {
        descriptions.set(setting.key.slice(PRODUCT_DESCRIPTION_PREFIX.length), setting.value);
      }
    }
    const seen = new Set<string>();
    const products: { id: string; name: string; description: string }[] = [];
    for (const r of rows) {
      if (!seen.has(r.productId)) {
        seen.add(r.productId);
        products.push({
          id: r.productId,
          name: r.productName,
          description: descriptions.get(r.productId) ?? "",
        });
      }
    }
    res.json(GetAdminProductsResponse.parse(products));
  } catch (err) {
    logger.error({ err }, "admin: products fetch failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

/** Create a new product — inserts M + L stock rows with optional initial qty and prices */
router.post("/products", adminGuard, async (req, res) => {
  const parsed = CreateProductBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "INVALID_PRODUCT", message: "Revisa el nombre, los precios y las cantidades." }); return; }
  const { name, qtyM, qtyL, priceM, priceL } = parsed.data;
  if (typeof name !== "string" || !name.trim()) { res.status(400).json({ error: "MISSING_NAME" }); return; }
  if ([qtyM, qtyL].some(qty => qty !== undefined && (!Number.isSafeInteger(qty) || qty < 0))) {
    res.status(400).json({ error: "INVALID_QTY" }); return;
  }
  if ([priceM, priceL].some(price => price !== undefined && positiveInteger(price) === null)) {
    res.status(400).json({ error: "INVALID_PRICE" }); return;
  }

  try {
    // Determine next product ID (find max pN number)
    const rows = await db.select({ id: stockTable.productId }).from(stockTable);
    const nums = [...new Set(rows.map(r => r.id))]
      .map(id => { const m = id.match(/^p(\d+)$/); return m ? parseInt(m[1]) : 0; });
    const nextN = (nums.length ? Math.max(...nums) : 4) + 1;
    const productId = `p${nextN}`;

    const initialQtyM = typeof qtyM === "number" && qtyM >= 0 ? qtyM : 0;
    const initialQtyL = typeof qtyL === "number" && qtyL >= 0 ? qtyL : 0;

    await db.transaction(async tx => {
      const settingRows = await tx.select().from(settingsTable);
      const settings = Object.fromEntries(settingRows.map(row => [row.key, row.value]));
      const m = priceM === undefined ? resolvePrice(settings, productId, "M") : positiveInteger(priceM);
      const l = priceL === undefined ? resolvePrice(settings, productId, "L") : positiveInteger(priceL);
      if (m === null || l === null) throw new Error("Invalid configured price");
      await tx.insert(stockTable).values([
        { id: `${productId}-M`, productId, productName: name.trim(), size: "M", qty: initialQtyM },
        { id: `${productId}-L`, productId, productName: name.trim(), size: "L", qty: initialQtyL },
      ]);
      await tx.insert(settingsTable).values([
        { key: priceKey(productId, "M"), value: String(m) },
        { key: priceKey(productId, "L"), value: String(l) },
      ]).onConflictDoUpdate({ target: settingsTable.key, set: { value: sql`excluded.value`, updatedAt: new Date() } });
    });

    res.json({ ok: true, id: productId, name: name.trim() });
  } catch (err) {
    logger.error({ err }, "admin: product create failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

/** Rename a product — updates productName in all its stock rows */
router.put("/products/:id/name", adminGuard, async (req, res) => {
  const id = getRouteParam(req.params.id);
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

router.put("/products/:id/description", adminGuard, async (req, res): Promise<void> => {
  const id = getRouteParam(req.params.id);
  const parsed = UpdateProductDescriptionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "INVALID_DESCRIPTION" });
    return;
  }

  const description = parsed.data.description.trim();
  try {
    const updated = await db.transaction(async tx => {
      const [product] = await tx
        .select({ id: stockTable.productId })
        .from(stockTable)
        .where(eq(stockTable.productId, id))
        .limit(1);
      if (!product) return false;

      await tx.insert(settingsTable).values({
        key: `${PRODUCT_DESCRIPTION_PREFIX}${id}`,
        value: description,
        updatedAt: new Date(),
      }).onConflictDoUpdate({
        target: settingsTable.key,
        set: { value: sql`excluded.value`, updatedAt: new Date() },
      });
      return true;
    });

    if (!updated) {
      res.status(404).json({ error: "PRODUCT_NOT_FOUND" });
      return;
    }
    res.json(UpdateProductDescriptionResponse.parse({ productId: id, description }));
  } catch (err) {
    logger.error({ err, productId: id }, "admin: product description update failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

router.put("/products/:id/prices", adminGuard, async (req, res) => {
  const id = getRouteParam(req.params.id);
  const parsed = UpdateProductPricesBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "INVALID_PRICE", message: "Ingresa precios enteros mayores que cero." });
    return;
  }
  if (positiveInteger(parsed.data.priceM) === null || positiveInteger(parsed.data.priceL) === null) {
    res.status(400).json({ error: "INVALID_PRICE", message: "Ingresa precios enteros mayores que cero." });
    return;
  }

  try {
    const updated = await db.transaction(async tx => {
      const [product] = await tx
        .select({ id: stockTable.productId })
        .from(stockTable)
        .where(eq(stockTable.productId, id))
        .limit(1);
      if (!product) return false;

      await tx.insert(settingsTable).values([
        { key: priceKey(id, "M"), value: parsed.data.priceM, updatedAt: new Date() },
        { key: priceKey(id, "L"), value: parsed.data.priceL, updatedAt: new Date() },
      ]).onConflictDoUpdate({
        target: settingsTable.key,
        set: { value: sql`excluded.value`, updatedAt: new Date() },
      });
      return true;
    });

    if (!updated) {
      res.status(404).json({ error: "PRODUCT_NOT_FOUND" });
      return;
    }
    res.json(UpdateProductPricesResponse.parse({
      productId: id,
      priceM: parsed.data.priceM,
      priceL: parsed.data.priceL,
    }));
  } catch (err) {
    logger.error({ err, productId: id }, "admin: product prices update failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

/** Delete a product — removes all its stock rows and images */
router.delete("/products/:id", adminGuard, async (req, res) => {
  const id = getRouteParam(req.params.id);
  try {
    await db.delete(stockTable).where(eq(stockTable.productId, id));
    await db.delete(productImagesTable).where(eq(productImagesTable.productId, id));
    await db.delete(settingsTable).where(inArray(settingsTable.key, [
      priceKey(id, "M"),
      priceKey(id, "L"),
      `${PRODUCT_DESCRIPTION_PREFIX}${id}`,
    ]));
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "admin: product delete failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

/* ──────────────────── PRODUCT IMAGES ──────────────────── */

router.post("/catalog/recover-original", adminGuard, async (_req, res) => {
  try {
    res.json({ ok: true, ...await recoverOriginalCatalog() });
  } catch (err) {
    logger.error({ err }, "admin: original catalog recovery failed");
    res.status(500).json({ error: "CATALOG_RECOVERY_FAILED" });
  }
});

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
  const id = getRouteParam(req.params.id);
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
  const id = getRouteParam(req.params.id);
  try {
    await db.delete(productImagesTable).where(eq(productImagesTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "admin: image delete failed");
    res.status(500).json({ error: "DB_ERROR" });
  }
});

export default router;
