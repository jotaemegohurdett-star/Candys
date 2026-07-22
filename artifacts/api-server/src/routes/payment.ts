import { Router, type IRouter } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { logger } from "../lib/logger";

const router: IRouter = Router();

/**
 * POST /api/payment/preference
 *
 * Creates a MercadoPago Checkout Pro preference and returns the init_point URL.
 * Requires MP_ACCESS_TOKEN env var (set it in Replit Secrets when you have credentials).
 *
 * Body:
 *   items:    [{ title, quantity, unit_price, currency_id }]
 *   back_url: string  — origin of the frontend (e.g. https://xxx.replit.dev)
 */
router.post("/preference", async (req, res) => {
  const accessToken = process.env["MP_ACCESS_TOKEN"];

  if (!accessToken) {
    // Graceful: let the frontend fall back to WhatsApp
    res.status(503).json({
      error: "MP_NOT_CONFIGURED",
      message:
        "MercadoPago aún no está configurado. Por favor coordina tu pago por WhatsApp.",
    });
    return;
  }

  const { items, back_url } = req.body as {
    items: { title: string; quantity: number; unit_price: number; currency_id: string }[];
    back_url: string;
  };

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ error: "INVALID_ITEMS", message: "items is required and must be a non-empty array." });
    return;
  }

  try {
    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    const origin = back_url ?? "https://candys-pet.replit.app";

    const result = await preference.create({
      body: {
        items: items.map((item) => ({
          id: item.title.toLowerCase().replace(/\s+/g, "-"),
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
          currency_id: item.currency_id ?? "CLP",
        })),
        back_urls: {
          success: `${origin}?payment=success`,
          failure: `${origin}?payment=failure`,
          pending: `${origin}?payment=pending`,
        },
        auto_return: "approved",
        statement_descriptor: "CANDYS PET",
        payment_methods: {
          installments: 12,
        },
      },
    });

    logger.info({ preference_id: result.id }, "MP preference created");

    res.json({
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
 * MercadoPago notifies payment status changes here.
 * Configure this URL in your MP app settings once you deploy.
 */
router.post("/webhook", async (req, res) => {
  const { type, data } = req.body as { type: string; data: { id: string } };

  logger.info({ type, payment_id: data?.id }, "MP webhook received");

  // TODO (Task #3): when DB is live, update order status here
  // const payment = await new Payment(client).get({ id: data.id });
  // await db.update(orders).set({ status: payment.status }).where(eq(orders.mp_payment_id, data.id));

  res.status(200).json({ received: true });
});

export default router;
