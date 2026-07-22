import { useState, useEffect, useCallback } from 'react';

type StockMap = Record<string, number>; // e.g. { "p1-M": 15, "p1-L": 12 }

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function useStock() {
  const [stock, setStock] = useState<StockMap>({});
  const [loading, setLoading] = useState(true);

  const fetchStock = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/api/stock`);
      if (!res.ok) return;
      const data = await res.json();
      setStock(data.stock ?? {});
    } catch {
      // silently fail — stock badges just won't show
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStock();
    // Refresh every 60s
    const interval = setInterval(fetchStock, 60_000);
    return () => clearInterval(interval);
  }, [fetchStock]);

  /**
   * Returns qty. While loading, returns Infinity so UI doesn't block purchases.
   * After load, missing keys return Infinity (product not tracked → assume available).
   * Only explicit 0 values mean out of stock.
   */
  const getQty = (productId: string, size: string): number => {
    const key = `${productId}-${size}`;
    if (loading) return Infinity;
    // Key absent from DB means this product isn't tracked yet — treat as available
    if (!(key in stock)) return Infinity;
    return stock[key];
  };

  const isOutOfStock = (productId: string, size: string): boolean => {
    const qty = getQty(productId, size);
    return qty !== Infinity && qty === 0;
  };

  const isLowStock = (productId: string, size: string): boolean => {
    const qty = getQty(productId, size);
    return qty !== Infinity && qty > 0 && qty <= 3;
  };

  return { stock, loading, getQty, isOutOfStock, isLowStock, refresh: fetchStock };
}
