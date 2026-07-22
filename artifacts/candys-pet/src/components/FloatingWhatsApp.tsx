import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export function FloatingWhatsApp() {
  const { generateWhatsAppLink, totalItems } = useCart();
  const [showTooltip, setShowTooltip] = React.useState(false);

  React.useEffect(() => {
    // Show tooltip occasionally to draw attention
    const interval = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 4000);
    }, 20000);
    
    // Initial show
    const initialTimeout = setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 4000);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="mr-4 bg-white px-4 py-2 rounded-2xl shadow-lg border border-border text-sm font-medium text-foreground relative hidden sm:block whitespace-nowrap"
          >
            {totalItems > 0 ? '¡Completa tu pedido aquí! 👇' : '¿Dudas? ¡Escríbenos! 👋'}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white border-r border-t border-border rotate-45 hidden sm:block"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={generateWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#25D366]/30 hover:scale-110 hover:shadow-[#25D366]/50 transition-all duration-300 relative group z-10"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        {totalItems > 0 && (
          <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white shadow-sm">
            {totalItems}
          </div>
        )}
      </a>
    </div>
  );
}
