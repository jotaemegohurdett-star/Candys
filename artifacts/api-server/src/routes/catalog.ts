/**
 * GET /api/catalog
 * Public endpoint — returns prices and product images for the storefront.
 * No auth required.
 */
import { Router, type IRouter } from "express";
import { db, settingsTable, productImagesTable, stockTable } from "@workspace/db";
import { asc } from "drizzle-orm";
import { logger } from "../lib/logger";
import { GetCatalogResponse } from "@workspace/api-zod";

const router: IRouter = Router();
const PRODUCT_DESCRIPTION_PREFIX = "product_description_";

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

    // Only expose pricing settings; product descriptions are returned with each product.
    const prices: Record<string, string> = {};
    const descriptions: Record<string, string> = {};
    for (const r of settingsRows) {
      if (r.key.startsWith("price_")) {
        prices[r.key] = r.value;
      } else if (r.key.startsWith(PRODUCT_DESCRIPTION_PREFIX)) {
        descriptions[r.key.slice(PRODUCT_DESCRIPTION_PREFIX.length)] = r.value;
      }
    }

    // Build ordered image galleries with optional color labels.
    const images: Record<string, { url: string; color: string | null }[]> = {};
    for (const r of imageRows) {
      if (!images[r.productId]) images[r.productId] = [];
      images[r.productId].push({ url: r.url, color: r.color ?? null });
    }

    // Build products list: unique [{id, name, description}] from stock table and settings.
    const seen = new Set<string>();
    const products: { id: string; name: string; description: string }[] = [];
    for (const r of stockRows) {
      if (!seen.has(r.productId)) {
        seen.add(r.productId);
        products.push({
          id: r.productId,
          name: r.productName,
          description: descriptions[r.productId] ?? "",
        });
      }
    }

    res.setHeader("Cache-Control", "no-store");
    res.json(GetCatalogResponse.parse({ prices, images, products }));
  } catch (err) {
    logger.error({ err }, "Failed to fetch catalog");
    res.status(500).json({ error: "CATALOG_ERROR" });
  }
});

export default router;
