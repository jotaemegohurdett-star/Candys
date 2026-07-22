/**
 * useCatalog – fetches dynamic prices and product images from the API.
 * Falls back to hardcoded defaults if the API is unavailable.
 */
import { useState, useEffect, useCallback } from 'react';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export interface CatalogData {
  prices: { price_m: number; price_l: number };
  /** productId → ordered list of image URLs */
  images: Record<string, string[]>;
}

const DEFAULTS: CatalogData = {
  prices: { price_m: 18990, price_l: 20990 },
  images: {},
};

export function useCatalog() {
  const [catalog, setCatalog] = useState<CatalogData>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  const fetch_ = useCallback(async () => {
    try {
      const res = await fetch(`${BASE}/api/catalog`);
      if (!res.ok) return;
      const data = await res.json() as {
        prices: Record<string, string>;
        images: Record<string, string[]>;
      };
      setCatalog({
        prices: {
          price_m: parseInt(data.prices['price_m'] ?? '18990', 10) || 18990,
          price_l: parseInt(data.prices['price_l'] ?? '20990', 10) || 20990,
        },
        images: data.images ?? {},
      });
    } catch {
      // silently keep defaults
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  const getPrice = (size: 'M' | 'L'): number =>
    size === 'M' ? catalog.prices.price_m : catalog.prices.price_l;

  /** Returns first image URL for a product from the DB, or null if none uploaded yet. */
  const getPrimaryImage = (productId: string): string | null =>
    catalog.images[productId]?.[0] ?? null;

  return { catalog, loading, getPrice, getPrimaryImage };
}
