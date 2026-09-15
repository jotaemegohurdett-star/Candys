import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const productImagesTable = pgTable("product_images", {
  id: text("id").primaryKey(),
  productId: text("product_id").notNull(),
  url: text("url").notNull(),
  /** Optional color label shown with this image in the storefront gallery. */
  color: text("color"),
  position: integer("position").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type ProductImage = typeof productImagesTable.$inferSelect;
