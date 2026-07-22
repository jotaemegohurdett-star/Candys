import { Router, type IRouter } from "express";
import { db, stockTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "../lib/logger";

const router: IRouter = Router();

/**
 * GET /api/stock
 * Returns all stock levels grouped by product+size.
 */
router.get("/", async (_req, res) => {
  try {
    const rows = await db.select().from(stockTable);
    // Map to { "p1-M": 10, "p1-L": 8, ... }
    const map: Record<string, number> = {};
    for (const row of rows) {
      map[row.id] = row.qty;
    }
    res.json({ stock: map });
  } catch (err) {
    logger.error({ err }, "Failed to fetch stock");
    res.status(500).json({ error: "STOCK_ERROR", message: "No se pudo obtener el stock." });
  }
});

/**
 * GET /api/stock/:productId/:size
 * Returns stock for a specific product+size.
 */
router.get("/:productId/:size", async (req, res) => {
  const { productId, size } = req.params;
  const id = `${productId}-${size}`;
  try {
    const [row] = await db.select().from(stockTable).where(eq(stockTable.id, id));
    res.json({ id, qty: row?.qty ?? 0 });
  } catch (err) {
    logger.error({ err }, "Failed to fetch single stock");
    res.status(500).json({ error: "STOCK_ERROR" });
  }
});

export default router;
