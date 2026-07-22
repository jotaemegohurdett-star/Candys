import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function FloatingWhatsApp() {
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setShowBubble(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowBubble(false);
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="relative bg-white rounded-2xl shadow-xl p-4 max-w-[220px] border border-gray-100"
          >
            <button
              onClick={dismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-3 h-3 text-gray-600" />
            </button>
            <p className="text-xs font-semibold text-gray-800 mb-1">🐾 Candy's Pet</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              ¡Hola! ¿Buscas el porta mascota ideal? Te ayudo a elegir la talla 💕
            </p>
            {/* Triangle */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.a
        href="https://wa.me/56936693300?text=Hola%20Candy's%20Pet!%20Me%20gustar%C3%ADa%20consultar%20sobre%20sus%20porta%20mascotas%20%F0%9F%90%BE"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 1 }}
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl text-white text-2xl"
        style={{ background: 'hsl(142 70% 45%)', boxShadow: '0 8px 28px rgba(37, 211, 102, 0.45)' }}
        aria-label="Contactar por WhatsApp"
        onClick={() => setShowBubble(false)}
      >
        💬
      </motion.a>
    </div>
  );
}
