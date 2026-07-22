/**
 * GET /api/catalog
 * Public endpoint — returns prices and product images for the storefront.
 * No auth required.
 */
import { Router, type IRouter } from "express";
import { db, settingsTable, productImagesTable, stockTable } from "@workspace/db";
import { asc } from "drizzle-orm";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.get("/", async (_req, res) => {
  try {
    const [settingsRows, imageRows, stockRows] = await Promise.all([
      db.select().from(settingsTable),
      db.select().from(productImagesTable).orderBy(
        asc(productImagesTable.productId),
        asc(productImagesTable.position),
      ),
      db.select().from(stockTable).orderBy(asc(stockTable.productId)),
    ]);

    // Build prices map: { price_m: "18990", price_l: "20990" }
    const prices: Record<string, string> = {};
    for (const r of settingsRows) prices[r.key] = r.value;

    // Build images map: { p1: ["url1","url2"], p2: [], ... }
    const images: Record<string, string[]> = {};
    for (const r of imageRows) {
      if (!images[r.productId]) images[r.productId] = [];
      images[r.productId].push(r.url);
    }

    // Build products list: unique [{id, name}] from stock table
    const seen = new Set<string>();
    const products: { id: string; name: string }[] = [];
    for (const r of stockRows) {
      if (!seen.has(r.productId)) {
        seen.add(r.productId);
        products.push({ id: r.productId, name: r.productName });
      }
    }

    res.json({ prices, images, products });
  } catch (err) {
    logger.error({ err }, "Failed to fetch catalog");
    res.status(500).json({ error: "CATALOG_ERROR" });
  }
});

export default router;
