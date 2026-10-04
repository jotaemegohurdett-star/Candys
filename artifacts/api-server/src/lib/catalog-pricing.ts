export const DEFAULT_PRICES: Record<string, number> = { M: 17990, L: 18990 };
export const CUSTOM_ITEM_PRICES: Record<string, number> = {
  "custom-veterinary-notebook-A6": 12990,
  "custom-veterinary-notebook-A5": 15990,
};
export const priceKey = (productId: string, size: string) =>
  `price_${productId}_${size.toLowerCase()}`;

export function positiveInteger(value: unknown): number | null {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "string" && !/^\d+$/.test(value.trim())) return null;
  const number = Number(value);
  return Number.isSafeInteger(number) && number > 0 ? number : null;
}

export function resolvePrice(settings: Record<string, string>, productId: string, size: string): number | null {
  const customPrice = CUSTOM_ITEM_PRICES[`${productId}-${size}`];
  if (customPrice !== undefined) return customPrice;
  if (productId.startsWith("custom-") || (size !== "M" && size !== "L")) return null;
  const configured = settings[priceKey(productId, size)] ?? settings[`price_${size.toLowerCase()}`];
  return configured === undefined ? DEFAULT_PRICES[size]! : positiveInteger(configured);
}

export interface CheckoutItem {
  productId: string;
  title: string;
  size?: string;
  color?: string;
  quantity: number;
  unit_price?: number;
  currency_id?: string;
}

export class CheckoutError extends Error {
  constructor(public code: string, message: string, public details: Record<string, unknown> = {}) {
    super(message);
  }
}

/** Pure checkout calculation; never trusts the browser's amount or currency. */
export function priceCheckout(
  items: CheckoutItem[],
  settings: Record<string, string>,
  stocks: { productId: string; size: string; qty: number; productName: string }[],
) {
  if (!Array.isArray(items) || !items.length || items.length > 100) {
    throw new CheckoutError("INVALID_ITEMS", "El carrito no es válido.");
  }
  const quantities = new Map<string, number>();
  let shippingCount = 0;
  const normalized = items.map(item => {
    if (!item || typeof item.productId !== "string" || !Number.isSafeInteger(item.quantity) || item.quantity < 1) {
      throw new CheckoutError("INVALID_ITEMS", "La cantidad debe ser un entero positivo.");
    }
    if (item.productId === "shipping") {
      if (++shippingCount > 1 || item.quantity !== 1) {
        throw new CheckoutError("INVALID_ITEMS", "Solo se admite un despacho por pedido.");
      }
      return { ...item, title: typeof item.title === "string" ? item.title : "Despacho", size: "", unit_price: 0, currency_id: "CLP" };
    }
    const size = item.size ?? "";
    const price = resolvePrice(settings, item.productId, size);
    if (price === null) throw new CheckoutError("INVALID_PRODUCT", "Producto o talla no disponible.");
    const stock = stocks.find(row => row.productId === item.productId && row.size === size);
    if (!item.productId.startsWith("custom-")) {
      if (!stock) throw new CheckoutError("INVALID_PRODUCT", "El producto ya no está disponible.");
      const key = `${item.productId}-${size}`;
      const quantity = (quantities.get(key) ?? 0) + item.quantity;
      quantities.set(key, quantity);
      if (quantity > stock.qty) {
        throw new CheckoutError("OUT_OF_STOCK",
          `Sin stock para ${stock.productName} (Talla ${size}). Quedan ${stock.qty} unidades.`,
          { productId: item.productId, size, available: stock.qty });
      }
    }
    const title = [stock?.productName ?? "Cuaderno veterinario personalizado", `Talla ${size}`, item.color].filter(Boolean).join(" · ");
    return { ...item, title, size, unit_price: price, currency_id: "CLP" };
  });
  const subtotal = normalized.filter(item => item.productId !== "shipping")
    .reduce((total, item) => total + item.unit_price * item.quantity, 0);
  if (!Number.isSafeInteger(subtotal) || subtotal <= 0) {
    throw new CheckoutError("INVALID_ITEMS", "El total del carrito no es válido.");
  }
  return normalized.map(item => item.productId === "shipping"
    ? { ...item, unit_price: subtotal > 49900 ? 0 : 3500 }
    : item);
}