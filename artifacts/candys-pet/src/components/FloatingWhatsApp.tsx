import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { waLink } from '../lib/constants';

const WA_HREF = waLink("Hola Candy's Pet! Me gustaría consultar sobre sus porta mascotas 🐾");

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Appear after scrolling 400 px — feels natural, not intrusive
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 400 && !visible) setVisible(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [visible]);

  // Show chat bubble 2 s after button appears (once)
  useEffect(() => {
    if (!visible || dismissed) return;
    const t = setTimeout(() => setShowBubble(true), 2000);
    return () => clearTimeout(t);
  }, [visible, dismissed]);

  const dismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowBubble(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 220 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Chat bubble */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.92 }}
                transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                className="relative bg-white rounded-2xl shadow-2xl p-4 max-w-[220px] border border-gray-100"
              >
                <button
                  onClick={dismiss}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Cerrar mensaje"
                >
                  <X className="w-3 h-3 text-gray-600" />
                </button>
                <p className="text-xs font-bold text-gray-800 mb-1">🐾 Candy's Pet</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  ¡Hola! ¿Buscas el porta mascota ideal? Te ayudo a elegir la talla 💕
                </p>
                {/* Speech triangle */}
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <motion.a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl text-white text-2xl"
            style={{ background: 'hsl(142 70% 45%)', boxShadow: '0 8px 28px rgba(37,211,102,0.45)' }}
            aria-label="Contactar por WhatsApp"
            onClick={() => setShowBubble(false)}
          >
            💬
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
