import { db, stockTable, settingsTable, productImagesTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import original from "../data/catalog-original.json";

/**
 * Explicit, authenticated recovery only. Never runs during startup or a build.
 * Existing stock, prices, names and newer image edits are preserved.
 */
export async function recoverOriginalCatalog() {
  return db.transaction(async tx => {
    const stock = await tx.insert(stockTable).values(original.stock.map(row => ({
      id: row.id,
      productId: row.product_id,
      productName: row.product_name,
      size: row.size,
      qty: row.qty,
      updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
    }))).onConflictDoNothing().returning({ id: stockTable.id });

    const settings = await tx.insert(settingsTable).values(original.settings.map(row => ({
      key: row.key,
      value: row.value,
      updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
    }))).onConflictDoNothing().returning({ key: settingsTable.key });

    const images = await tx.insert(productImagesTable).values(original.images.map(row => ({
      id: row.id,
      productId: row.product_id,
      url: `/catalog-recovered/${row.id}.jpg`,
      color: row.color,
      position: row.position,
      updatedAt: row.updated_at ? new Date(row.updated_at) : new Date(),
    }))).onConflictDoUpdate({
      target: productImagesTable.id,
      set: { url: sql`excluded.url` },
      // Only repair the old Replit storage links. Never replace a newer upload.
      setWhere: sql`${productImagesTable.url} LIKE '/api/storage/objects/uploads/%'`,
    }).returning({ id: productImagesTable.id });

    return { restoredStockRows: stock.length, restoredImages: images.length, restoredSettings: settings.length };
  });
}