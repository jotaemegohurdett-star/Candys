import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity, totalPrice, generateWhatsAppLink, isCartOpen, closeCart } = useCart();

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-[100dvh] w-full sm:w-[400px] bg-background z-[101] shadow-2xl flex flex-col border-l border-border"
            >
              <div className="p-6 flex items-center justify-between border-b border-border bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-heading font-bold">Tu Carrito</h2>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-muted/30">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                    <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
                    <p className="text-lg font-medium text-foreground mb-2">Tu carrito está vacío</p>
                    <p className="text-sm text-muted-foreground">¡Agrega algunos slings increíbles para tu mascota!</p>
                    <button 
                      onClick={() => {
                        closeCart();
                        document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-6 px-6 py-2 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 transition-colors"
                    >
                      Ir al catálogo
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {items.map((item) => (
                      <div key={item.id} className="bg-white p-4 rounded-2xl flex gap-4 border border-border/50 shadow-sm relative group">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h4 className="font-bold text-sm leading-tight text-foreground">{item.name}</h4>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="text-xs text-muted-foreground mb-2 flex gap-2">
                            {item.size && <span>Talla: {item.size}</span>}
                            {item.size && item.color && <span>•</span>}
                            {item.color && <span>Color: {item.color}</span>}
                          </div>
                          
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-3 bg-muted/50 rounded-full px-2 py-1 border border-border/50">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-foreground hover:text-primary shadow-sm"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-foreground hover:text-primary shadow-sm"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-bold text-primary text-sm">
                              ${(item.price * item.quantity).toLocaleString('es-CL')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 bg-white border-t border-border shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-muted-foreground">Total estimado</span>
                    <span className="text-2xl font-bold font-heading text-foreground">
                      ${totalPrice.toLocaleString('es-CL')}
                    </span>
                  </div>
                  
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeCart}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98]"
                  >
                    Hacer Pedido por WhatsApp
                  </a>
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Al hacer clic serás redirigido a WhatsApp con el detalle de tu reserva. El pago se coordina directamente.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
