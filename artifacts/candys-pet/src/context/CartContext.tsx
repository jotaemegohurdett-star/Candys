import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
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
  totalItems: number;
  totalPrice: number;
  generateWhatsAppLink: () => string;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const WHATSAPP_NUMBER = '56936693300'; // Lorena Abarca — Candy's Pet

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (newItem: Omit<CartItem, 'id' | 'quantity'>) => {
    setItems((prev) => {
      // Create a composite ID based on name, size, color
      const id = `${newItem.name}-${newItem.size || ''}-${newItem.color || ''}`.replace(/\s+/g, '-').toLowerCase();
      
      const existingItem = prev.find((item) => item.id === id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, id, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const generateWhatsAppLink = () => {
    if (items.length === 0) return `https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Me%20gustar%C3%ADa%20hacer%20una%20consulta.`;
    
    let message = `Hola Candy's Pet! 🐾 Me gustaría reservar los siguientes productos:\n\n`;
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name}`;
      if (item.size) message += ` (Talla: ${item.size})`;
      if (item.color) message += ` (Color: ${item.color})`;
      message += ` - $${(item.price * item.quantity).toLocaleString('es-CL')}\n`;
    });
    
    message += `\nTotal: $${totalPrice.toLocaleString('es-CL')}\n\nQuedo atenta(o) para coordinar el pago y envío. ¡Gracias! ✨`;
    
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        generateWhatsAppLink,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
