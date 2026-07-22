import { pgTable, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

/**
 * Órdenes de compra.
 * status: "pending" → "approved" | "rejected" | "cancelled"
 */
export const ordersTable = pgTable("orders", {
  id: text("id").primaryKey(),           // UUID generado por nosotros
  mpPreferenceId: text("mp_preference_id"),
  mpPaymentId: text("mp_payment_id"),
  status: text("status").notNull().default("pending"),
  items: jsonb("items").notNull(),        // snapshot del carrito
  totalAmount: integer("total_amount").notNull(),
  buyerEmail: text("buyer_email"),
  buyerName: text("buyer_name"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Order = typeof ordersTable.$inferSelect;
export type InsertOrder = typeof ordersTable.$inferInsert;
