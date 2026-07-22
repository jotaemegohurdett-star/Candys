import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

/**
 * Stock por producto + talla.
 * product_id = id del producto (p1, p2, p3, p4)
 * size       = "M" | "L"
 * qty        = unidades disponibles
 */
export const stockTable = pgTable("stock", {
  id: text("id").primaryKey(), // e.g. "p1-M"
  productId: text("product_id").notNull(),
  productName: text("product_name").notNull(),
  size: text("size").notNull(),
  qty: integer("qty").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Stock = typeof stockTable.$inferSelect;
export type InsertStock = typeof stockTable.$inferInsert;
