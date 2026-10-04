/**
 * useCatalog – fetches dynamic prices and product images from the API.
 * Falls back to hardcoded defaults if the API is unavailable.
 */
import { useState, useEffect, useCallback } from 'react';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export interface CatalogData {
  prices: Record<string, number>;
  /** productId → ordered gallery images with optional color labels */
  images: Record<string, { url: string; color: string | null }[]>;
  /** All products registered in admin, in order: [{id, name}] */
  products: { id: string; name: string }[];
}

const DEFAULTS: CatalogData = {
  prices: { price_m: 17990, price_l: 18990 },
  images: {},
  products: [],
};

export function useCatalog() {
  const [catalog, setCatalog] = useState<CatalogData>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  const fetch_ = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/api/catalog`);
      if (!res.ok) return;
      const data = await res.json() as {
        prices: Record<string, string>;
        images: Record<string, { url: string; color: string | null }[]>;
        products?: { id: string; name: string }[];
      };
      setCatalog({
        prices: {
          ...Object.fromEntries(Object.entries(data.prices).filter(([key]) => key.startsWith('price_')).map(([key, value]) => [key, Number(value)])),
          price_m: parseInt(data.prices['price_m'] ?? '17990', 10) || 17990,
          price_l: parseInt(data.prices['price_l'] ?? '18990', 10) || 18990,
        },
        images: data.images ?? {},
        products: data.products ?? [],
      });
      setReady(true);
    } catch {
      // silently keep defaults
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch_();
    const interval = window.setInterval(fetch_, 30000);
    const refresh = () => { fetch_(); };
    const refreshWhenAnotherTabUpdates = (event: StorageEvent) => {
      if (event.key === 'candys-pet-catalog-updated') fetch_();
    };
    window.addEventListener('focus', refresh);
    window.addEventListener('storage', refreshWhenAnotherTabUpdates);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('storage', refreshWhenAnotherTabUpdates);
    };
  }, [fetch_]);

  const getPrice = (size: 'M' | 'L', productId?: string): number =>
    (productId ? catalog.prices[`price_${productId}_${size.toLowerCase()}`] : undefined)
      ?? catalog.prices[`price_${size.toLowerCase()}`]!;

  /** Returns first image URL for a product from the DB, or null if none uploaded yet. */
  const getPrimaryImage = (productId: string): string | null =>
    catalog.images[productId]?.[0]?.url ?? null;

  return { catalog, loading, ready, getPrice, getPrimaryImage };
}
