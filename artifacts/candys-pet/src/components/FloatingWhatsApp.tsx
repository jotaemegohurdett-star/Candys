import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { waLink } from '../lib/constants';

const WA_HREF = waLink("Hola Candy's Pet! Me gustaría consultar sobre sus porta mascotas 🐾");

export function FloatingWhatsApp() {
  const [visible, setVisible]     = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 400 && !visible) setVisible(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [visible]);

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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: 'spring', damping: 20, stiffness: 220 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Chat bubble */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                className="relative rounded-2xl shadow-2xl p-4 max-w-[220px]"
                style={{
                  background: 'hsl(220 25% 10%)',
                  border: '1px solid hsl(220 25% 18%)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                }}
              >
                {/* Dismiss */}
                <button
                  onClick={dismiss}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: 'hsl(220 25% 20%)', color: 'rgba(255,255,255,0.6)' }}
                  aria-label="Cerrar mensaje"
                >
                  <X className="w-3 h-3" />
                </button>

                <p className="text-xs font-bold text-white mb-1">🐾 Candy's Pet</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  ¡Hola! ¿Buscas el porta mascota ideal? Te ayudo a elegir la talla 💕
                </p>

                {/* Speech tail */}
                <div
                  className="absolute -bottom-2 right-7 w-4 h-4 rotate-45"
                  style={{
                    background: 'hsl(220 25% 10%)',
                    borderRight: '1px solid hsl(220 25% 18%)',
                    borderBottom: '1px solid hsl(220 25% 18%)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main WhatsApp button */}
          <motion.a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, hsl(142 70% 48%), hsl(142 70% 38%))',
              boxShadow: '0 8px 32px rgba(37,211,102,0.5), 0 0 0 3px rgba(37,211,102,0.15)',
            }}
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
