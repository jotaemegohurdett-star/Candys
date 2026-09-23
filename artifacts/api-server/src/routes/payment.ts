import { Router, type IRouter } from "express";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { db, stockTable, ordersTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { randomUUID } from "crypto";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const CUSTOM_ITEM_PRICES: Record<string, number> = {
  "custom-veterinary-notebook-A6": 12990,
  "custom-veterinary-notebook-A5": 15990,
};
const SHIPPING_COST = 3500;
const FREE_SHIPPING_THRESHOLD = 49900;

function isStockManagedProduct(productId: string): boolean {
  return productId !== "shipping" && !productId.startsWith("custom-");
}

function normalizeItemPrice<T extends { productId: string; size: string; unit_price: number }>(item: T): T {
  const configuredPrice = CUSTOM_ITEM_PRICES[`${item.productId}-${item.size}`];
  return configuredPrice === undefined ? item : { ...item, unit_price: configuredPrice };
}

function normalizeShippingPrice<T extends { productId: string; unit_price: number }>(items: T[]): T[] {
  const subtotal = items
    .filter((item) => item.productId !== "shipping")
    .reduce((total, item) => total + item.unit_price, 0);
  const shippingPrice = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

  return items.map((item) =>
    item.productId === "shipping" ? { ...item, unit_price: shippingPrice } : item,
  );
}

function getMpClient() {
  const accessToken = process.env["MP_ACCESS_TOKEN"];
  if (!accessToken) return null;
  return new MercadoPagoConfig({ accessToken });
}

/** Deduct stock for each item in an order (runs inside a transaction). */
async function deductStock(
  items: { productId: string; size: string; quantity: number }[]
) {
  for (const item of items) {
    if (!isStockManagedProduct(item.productId)) continue;
    const stockId = `${item.productId}-${item.size}`;
    await db
      .update(stockTable)
      .set({
        qty: sql`GREATEST(qty - ${item.quantity}, 0)`,
        updatedAt: new Date(),
      })
      .where(eq(stockTable.id, stockId));
  }
}

/**
 * POST /api/payment/preference
 *
 * Creates a MercadoPago Checkout Pro preference and a pending order.
 * Body:
 *   items:    [{ productId, title, quantity, unit_price, size, color }]
 *   back_url: string
 */
router.post("/preference", async (req, res) => {
  const client = getMpClient();

  if (!client) {
    res.status(503).json({
      error: "MP_NOT_CONFIGURED",
      message: "MercadoPago aún no está configurado. Coordina tu pago por WhatsApp.",
    });
    return;
  }

  const { items, back_url } = req.body as {
    items: {
      productId: string;
      title: string;
      quantity: number;
      unit_price: number;
      currency_id: string;
      size: string;
      color?: string;
    }[];
    back_url: string;
  };

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: "INVALID_ITEMS" });
    return;
  }

  const normalizedItems = normalizeShippingPrice(items.map(normalizeItemPrice));

  // Verify stock before creating preference
  for (const item of normalizedItems) {
    if (!isStockManagedProduct(item.productId)) continue;
    const stockId = `${item.productId}-${item.size}`;
    const [stockRow] = await db
      .select()
      .from(stockTable)
      .where(eq(stockTable.id, stockId));

    if (stockRow && stockRow.qty < item.quantity) {
      res.status(409).json({
        error: "OUT_OF_STOCK",
        message: `Sin stock para ${item.title} (Talla ${item.size}). Quedan ${stockRow.qty} unidades.`,
        productId: item.productId,
        size: item.size,
        available: stockRow.qty,
      });
      return;
    }
  }

  try {
    const orderId = randomUUID();
    const origin = back_url ?? "https://candyspet.cl";
     const totalAmount = normalizedItems.reduce((acc, i) => acc + i.unit_price * i.quantity, 0);

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        external_reference: orderId,
         items: normalizedItems.map((item) => ({
          id: `${item.productId}-${item.size}`,
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
          currency_id: item.currency_id ?? "CLP",
        })),
        back_urls: {
          success: `${origin}?payment=success&order=${orderId}`,
          failure: `${origin}?payment=failure&order=${orderId}`,
          pending: `${origin}?payment=pending&order=${orderId}`,
        },
        auto_return: "approved",
        statement_descriptor: "CANDYS PET",
        payment_methods: {
          installments: 12,
        },
        notification_url: `${origin}/api/payment/webhook`,
      },
    });

    // Save pending order to DB
    await db.insert(ordersTable).values({
      id: orderId,
      mpPreferenceId: result.id ?? "",
      status: "pending",
       items: normalizedItems as unknown as Record<string, unknown>[],
      totalAmount,
    });

    logger.info({ orderId, preference_id: result.id }, "Order created, preference ready");

    res.json({
      order_id: orderId,
      preference_id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (err) {
    logger.error({ err }, "Failed to create MP preference");
    res.status(500).json({
      error: "MP_ERROR",
      message: "No se pudo iniciar el pago. Intenta nuevamente o coordina por WhatsApp.",
    });
  }
});

/**
 * POST /api/payment/webhook
 *
 * MercadoPago notifies payment status here.
 * On approval → update order status + deduct stock.
 */
router.post("/webhook", async (req, res) => {
  const client = getMpClient();
  const { type, data } = req.body as { type: string; data: { id: string } };

  logger.info({ type, payment_id: data?.id }, "MP webhook received");

  // Only process payment events
  if (type !== "payment" || !data?.id) {
    res.status(200).json({ received: true });
    return;
  }

  try {
    if (!client) {
      logger.warn("Webhook received but MP not configured");
      res.status(200).json({ received: true });
      return;
    }

    const payment = await new Payment(client).get({ id: data.id });
    const orderId = payment.external_reference;
    const status = payment.status; // approved | rejected | pending | cancelled

    if (!orderId) {
      logger.warn({ payment_id: data.id }, "Payment has no external_reference");
      res.status(200).json({ received: true });
      return;
    }

    // Fetch the order
    const [order] = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, orderId));

    if (!order) {
      logger.warn({ orderId }, "Order not found for webhook");
      res.status(200).json({ received: true });
      return;
    }

    // Update order with payment info
    await db
      .update(ordersTable)
      .set({
        mpPaymentId: String(data.id),
        status: status ?? "unknown",
        buyerEmail: payment.payer?.email ?? undefined,
        buyerName: payment.payer?.first_name
          ? `${payment.payer.first_name} ${payment.payer.last_name ?? ""}`.trim()
          : undefined,
        updatedAt: new Date(),
      })
      .where(eq(ordersTable.id, orderId));

    // Deduct stock only on first approval
    if (status === "approved" && order.status !== "approved") {
      const orderItems = order.items as {
        productId: string;
        size: string;
        quantity: number;
      }[];
      await deductStock(orderItems);
      logger.info({ orderId, items: orderItems }, "Stock deducted after payment approval");
    }

    res.status(200).json({ received: true });
  } catch (err) {
    logger.error({ err }, "Webhook processing error");
    // Always return 200 to MP so it doesn't retry excessively
    res.status(200).json({ received: true, error: "internal" });
  }
});

/**
 * GET /api/payment/order/:orderId
 * Returns order status — used by the frontend after redirect from MP.
 */
router.get("/order/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const [order] = await db
      .select({
        id: ordersTable.id,
        status: ordersTable.status,
        totalAmount: ordersTable.totalAmount,
        createdAt: ordersTable.createdAt,
      })
      .from(ordersTable)
      .where(eq(ordersTable.id, orderId));

    if (!order) {
      res.status(404).json({ error: "ORDER_NOT_FOUND" });
      return;
    }

    res.json(order);
  } catch (err) {
    logger.error({ err }, "Failed to fetch order");
    res.status(500).json({ error: "ORDER_ERROR" });
  }
});

export default router;
