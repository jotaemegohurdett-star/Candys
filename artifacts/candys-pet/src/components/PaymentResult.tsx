import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

type ResultType = 'success' | 'failure' | 'pending' | null;

export function PaymentResult() {
  const [result, setResult] = useState<ResultType>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment') as ResultType;
    const order = params.get('order');

    if (payment) {
      setResult(payment);
      setOrderId(order);
      if (payment === 'success') clearCart();
      // Clean the URL without reload
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [clearCart]);

  const dismiss = () => setResult(null);

  const config = {
    success: {
      icon: <CheckCircle className="w-7 h-7" />,
      title: '¡Pago recibido! 🎉',
      message: 'Tu pedido está confirmado. Te contactaremos por WhatsApp para coordinar el envío.',
      bg: 'linear-gradient(135deg, hsl(142 72% 29%), hsl(142 72% 22%))',
      border: 'hsl(142 72% 40% / 0.4)',
      glow: 'hsl(142 72% 40% / 0.25)',
    },
    failure: {
      icon: <XCircle className="w-7 h-7" />,
      title: 'El pago no se completó',
      message: 'Podés intentarlo nuevamente o coordinar por WhatsApp. Tu carrito sigue guardado.',
      bg: 'linear-gradient(135deg, hsl(0 72% 35%), hsl(0 72% 28%))',
      border: 'hsl(0 72% 50% / 0.4)',
      glow: 'hsl(0 72% 50% / 0.2)',
    },
    pending: {
      icon: <Clock className="w-7 h-7" />,
      title: 'Pago en proceso',
      message: 'Tu pago está siendo procesado. Te avisaremos por WhatsApp cuando sea confirmado.',
      bg: 'linear-gradient(135deg, hsl(38 92% 35%), hsl(38 92% 28%))',
      border: 'hsl(38 92% 55% / 0.4)',
      glow: 'hsl(38 92% 55% / 0.2)',
    },
  };

  return (
    <AnimatePresence>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: -80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -60, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed top-5 left-1/2 z-[200] w-[calc(100%-2rem)] max-w-lg"
          style={{ transform: 'translateX(-50%)' }}
        >
          <div
            className="relative flex items-start gap-4 px-5 py-4 rounded-2xl shadow-2xl text-white border"
            style={{
              background: config[result].bg,
              borderColor: config[result].border,
              boxShadow: `0 20px 60px ${config[result].glow}`,
            }}
          >
            {/* Icon */}
            <div className="shrink-0 mt-0.5">{config[result].icon}</div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-base leading-snug">{config[result].title}</p>
              <p className="text-sm mt-1 opacity-85 leading-relaxed">{config[result].message}</p>
              {orderId && (
                <p className="text-[10px] mt-2 opacity-50 font-mono">
                  Orden: {orderId.slice(0, 8).toUpperCase()}
                </p>
              )}
            </div>

            {/* Dismiss */}
            <button
              onClick={dismiss}
              className="shrink-0 p-1 rounded-full hover:bg-white/15 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
