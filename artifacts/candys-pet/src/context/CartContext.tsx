import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { WA_NUMBER } from '../lib/constants';
import { useCatalog } from '../hooks/useCatalog';

export interface CartItem {
  id: string;
  productId: string;   // e.g. "p1", "p2" — needed for stock deduction
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  updatePrices: (prices: { productId: string; size?: string; unit_price: number }[]) => void;
  totalItems: number;
  totalPrice: number;
  generateWhatsAppLink: () => string;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'candys-pet-cart';

function loadSavedCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadSavedCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { catalog, ready } = useCatalog();

  useEffect(() => {
    if (!ready) return;
    setItems(previous => {
      let changed = false;
      const next = previous.map(item => {
        if (item.productId.startsWith('custom-') || !['M', 'L'].includes(item.size ?? '')) return item;
        const size = item.size!.toLowerCase();
        const price = catalog.prices[`price_${item.productId}_${size}`] ?? catalog.prices[`price_${size}`];
        if (!price || !Number.isSafeInteger(price) || price === item.price) return item;
        changed = true;
        return { ...item, price };
      });
      return changed ? next : previous;
    });
  }, [catalog, ready]);

  const updatePrices = useCallback((prices: { productId: string; size?: string; unit_price: number }[]) => {
    setItems(previous => previous.map(item => {
      const current = prices.find(price => price.productId === item.productId && price.size === item.size);
      return current ? { ...item, price: current.unit_price } : item;
    }));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch { /* storage quota exceeded */ }
  }, [items]);

  const addToCart = useCallback((newItem: Omit<CartItem, 'id' | 'quantity'>) => {
    const id = `${newItem.productId}-${newItem.size ?? ''}-${newItem.color ?? ''}`
      .replace(/\s+/g, '-')
      .toLowerCase();

    setItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, price: newItem.price, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, id, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart  = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const generateWhatsAppLink = useCallback(() => {
    if (items.length === 0)
      return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola! Me gustaría hacer una consulta.')}`;

    let message = `Hola Candy's Pet! 🐾 Me gustaría reservar los siguientes productos:\n\n`;
    for (const item of items) {
      message += `- ${item.quantity}x ${item.name}`;
      if (item.size)  message += ` (Talla: ${item.size})`;
      if (item.color) message += ` (Color: ${item.color})`;
      message += ` — $${(item.price * item.quantity).toLocaleString('es-CL')}\n`;
    }
    message += `\nTotal: $${totalPrice.toLocaleString('es-CL')}\n\nQuedo atento(a) para coordinar pago y envío. ¡Gracias! ✨`;

    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [items, totalPrice]);

  const value = useMemo<CartContextType>(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      updatePrices,
      totalItems,
      totalPrice,
      generateWhatsAppLink,
      isCartOpen,
      openCart,
      closeCart,
    }),
    [
      items, addToCart, removeFromCart, updateQuantity, clearCart, updatePrices,
      totalItems, totalPrice, generateWhatsAppLink, isCartOpen, openCart, closeCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
