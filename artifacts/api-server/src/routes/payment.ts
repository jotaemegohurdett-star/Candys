import { Router, type IRouter } from "express";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { db, stockTable, ordersTable, settingsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { randomUUID } from "crypto";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const LEGACY_CUSTOM_ITEM_PRICES: Record<string, number> = {
  A6: 12990,
  A5: 15990,
};
const VETERINARY_NOTEBOOK_ID = "veterinary-notebook";
const SHIPPING_COST = 3500;
const FREE_SHIPPING_THRESHOLD = 49900;
const SHIPPING_PROVIDER_NAMES: Record<string, string> = {
  "blue-express": "Blue Express",
  starken: "Starken",
  chilexpress: "Chilexpress",
};

function isVeterinaryNotebook(productId: string): boolean {
  return productId === VETERINARY_NOTEBOOK_ID || productId.startsWith("custom-veterinary-notebook");
}

function isStockManagedProduct(productId: string): boolean {
  return productId !== "shipping" && !productId.startsWith("custom-") && !isVeterinaryNotebook(productId);
}

type PaymentItem = {
  productId: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
  size: string;
  color?: string;
};

type RequestedPaymentItem = {
  productId?: unknown;
  quantity?: unknown;
  size?: unknown;
  color?: unknown;
};

function configuredPrice(value: string | undefined): number | null {
  if (!value?.trim()) return null;
  const price = Number(value);
  return Number.isInteger(price) && price > 0 ? price : null;
}

async function normalizePaymentItems(
  requestedItems: RequestedPaymentItem[],
  shippingRequested: boolean,
  shippingProvider: string | undefined,
): Promise<PaymentItem[]> {
  const [settingsRows, stockRows] = await Promise.all([
    db.select().from(settingsTable),
    db.select().from(stockTable),
  ]);
  const settings = Object.fromEntries(settingsRows.map((row) => [row.key, row.value]));
  const productNames = new Map(stockRows.map((row) => [row.productId, row.productName]));
  const priceBySize = {
    M: configuredPrice(settings.price_m),
    L: configuredPrice(settings.price_l),
  } as const;

  const normalizedItems = requestedItems.map((requested): PaymentItem => {
    const productId = typeof requested.productId === "string" ? requested.productId : "";
    const quantity = Number(requested.quantity);
    const color = typeof requested.color === "string" ? requested.color.trim() : "";

    if (
      !productId ||
      productId === "shipping" ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 100
    ) {
      throw new Error("INVALID_ITEM");
    }

    if (isVeterinaryNotebook(productId)) {
      const format = typeof requested.size === "string" ? requested.size.toUpperCase() : "";
      const priceKey = format === "A5" ? "price_carnet_a5" : format === "A6" ? "price_carnet_a6" : null;
      const unitPrice = priceKey
        ? configuredPrice(settings[priceKey]) ?? LEGACY_CUSTOM_ITEM_PRICES[format]
        : null;

      if (!priceKey || !unitPrice) throw new Error("PRICE_NOT_CONFIGURED");

      return {
        productId,
        title: `Carnet veterinario personalizado · Formato ${format}${color ? ` · ${color}` : ""}`,
        quantity,
        unit_price: unitPrice,
        currency_id: "CLP",
        size: format,
        ...(color ? { color } : {}),
      };
    }

    const size = typeof requested.size === "string" ? requested.size.toUpperCase() : "";
    const productName = productNames.get(productId);
    const unitPrice = size === "M" || size === "L" ? priceBySize[size] : null;

    if (!productName) throw new Error("INVALID_ITEM");
    if (!unitPrice) throw new Error("PRICE_NOT_CONFIGURED");

    return {
      productId,
      title: `${productName} · Talla ${size}${color ? ` · ${color}` : ""}`,
      quantity,
      unit_price: unitPrice,
      currency_id: "CLP",
      size,
      ...(color ? { color } : {}),
    };
  });

  if (!shippingRequested) return normalizedItems;

  const subtotal = normalizedItems.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0,
  );
  const shippingPrice = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const providerName = SHIPPING_PROVIDER_NAMES[shippingProvider ?? ""] ?? "transportista seleccionado";

  return [
    ...normalizedItems,
    {
      productId: "shipping",
      title: `Despacho con ${providerName}`,
      quantity: 1,
      unit_price: shippingPrice,
      currency_id: "CLP",
      size: "shipping",
    },
  ];
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
 *   items:    [{ productId, quantity, size, color }]
 *   shippingRequested: boolean
 *   shippingProvider: "blue-express" | "starken" | "chilexpress"
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

  const {
    items,
    back_url,
    shippingRequested,
    shippingProvider,
  } = req.body as {
    items?: unknown;
    back_url?: unknown;
    shippingRequested?: unknown;
    shippingProvider?: unknown;
  };

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: "INVALID_ITEMS" });
    return;
  }

  let normalizedItems: PaymentItem[];
  try {
    normalizedItems = await normalizePaymentItems(
      items as RequestedPaymentItem[],
      shippingRequested === true,
      typeof shippingProvider === "string" ? shippingProvider : undefined,
    );
  } catch (err) {
    if (err instanceof Error && err.message === "PRICE_NOT_CONFIGURED") {
      res.status(409).json({
        error: "PRICE_NOT_CONFIGURED",
        message: "El precio del formato seleccionado aún no está configurado.",
      });
      return;
    }
    if (err instanceof Error && err.message === "INVALID_ITEM") {
      res.status(400).json({
        error: "INVALID_ITEMS",
        message: "El carrito contiene un producto, talla o cantidad no válida.",
      });
      return;
    }
    logger.error({ err }, "Failed to validate payment items");
    res.status(500).json({ error: "PAYMENT_VALIDATION_ERROR" });
    return;
  }

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
