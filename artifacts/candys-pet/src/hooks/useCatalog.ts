/**
 * useCatalog – fetches dynamic prices and product images from the API.
 * Falls back to hardcoded defaults if the API is unavailable.
 */
import { useState, useEffect, useCallback } from 'react';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export interface CatalogData {
  prices: {
    price_m: number;
    price_l: number;
    price_carnet_a6: number | null;
    price_carnet_a5: number | null;
  };
  /** productId → ordered gallery images with optional color labels */
  images: Record<string, { url: string; color: string | null }[]>;
  /** All products registered in admin, in order: [{id, name}] */
  products: { id: string; name: string }[];
}

const DEFAULTS: CatalogData = {
  prices: {
    price_m: 17990,
    price_l: 18990,
    price_carnet_a6: null,
    price_carnet_a5: null,
  },
  images: {},
  products: [],
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
        images: Record<string, { url: string; color: string | null }[]>;
        products?: { id: string; name: string }[];
      };
      setCatalog({
        prices: {
          price_m: parseInt(data.prices['price_m'] ?? '17990', 10) || 17990,
          price_l: parseInt(data.prices['price_l'] ?? '18990', 10) || 18990,
          price_carnet_a6: parseConfiguredPrice(data.prices['price_carnet_a6']),
          price_carnet_a5: parseConfiguredPrice(data.prices['price_carnet_a5']),
        },
        images: data.images ?? {},
        products: data.products ?? [],
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

  const getVeterinaryPrice = (format: 'A6' | 'A5'): number | null =>
    format === 'A6' ? catalog.prices.price_carnet_a6 : catalog.prices.price_carnet_a5;

  /** Returns first image URL for a product from the DB, or null if none uploaded yet. */
  const getPrimaryImage = (productId: string): string | null =>
    catalog.images[productId]?.[0]?.url ?? null;

  return { catalog, loading, getPrice, getVeterinaryPrice, getPrimaryImage };
}

function parseConfiguredPrice(value: string | undefined): number | null {
  if (!value?.trim()) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}
