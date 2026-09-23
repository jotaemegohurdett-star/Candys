import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Truck } from 'lucide-react';
import { waLink } from '../lib/constants';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_PROVIDERS } from '../lib/shipping';

const methods = [
  {
    id: 'mercadopago',
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <circle cx="30" cy="30" r="30" fill="#009ee3" />
        <path
          d="M44 26c0 7.18-5.82 13-13 13a12.95 12.95 0 01-8.72-3.36L16 42l6.64-6.28A12.95 12.95 0 0116 26c0-7.18 5.82-13 13-13s13 5.82 13 13z"
          fill="#fff"
        />
        <circle cx="29" cy="26" r="4" fill="#009ee3" />
        <circle cx="37" cy="26" r="4" fill="#009ee3" />
      </svg>
    ),
    title: 'MercadoPago',
    badge: 'Online · Inmediato',
    badgeColor: 'hsl(200 90% 42%)',
    description:
      'Paga al instante con tarjeta de crédito, débito o desde tu billetera MercadoPago. Hasta 12 cuotas. Proceso 100% seguro.',
    steps: ['Elige tus productos', 'Selecciona MercadoPago en el carrito', 'Completa el pago en la pasarela oficial'],
    cta: null,
  },
  {
    id: 'transfer',
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <circle cx="30" cy="30" r="30" fill="hsl(142 72% 45%)" />
        <rect x="14" y="20" width="32" height="22" rx="4" fill="#fff" />
        <rect x="14" y="26" width="32" height="4" fill="hsl(142 72% 45%)" />
        <rect x="18" y="34" width="8" height="3" rx="1.5" fill="hsl(142 72% 45%)" />
      </svg>
    ),
    title: 'Transferencia bancaria',
    badge: 'Reserva · Manual',
    badgeColor: 'hsl(142 72% 35%)',
    description:
      'Reserva por WhatsApp, te enviamos los datos bancarios al instante y confirmas tu pedido con la transferencia.',
    steps: ['Agrega al carrito', 'Elige "Transferencia" en el carrito', 'Recibe los datos por WhatsApp y transfiere'],
    cta: { label: 'Consultar datos de transferencia', href: waLink('Hola! Quisiera los datos para transferencia 🐾') },
  },
  {
    id: 'presencial',
    icon: (
      <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
        <circle cx="30" cy="30" r="30" fill="hsl(340 84% 50%)" />
        <path d="M30 16a8 8 0 100 16 8 8 0 000-16z" fill="#fff" />
        <path d="M14 44c0-8.84 7.16-13 16-13s16 4.16 16 13" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    title: 'Pago presencial',
    badge: 'Retiro · Santiago',
    badgeColor: 'hsl(340 84% 40%)',
    description:
      'Coordina retiro en Santiago. Pagas en efectivo o con tarjeta al momento de recibir tu porta mascota.',
    steps: ['Reserva por WhatsApp', 'Acordamos lugar y horario en Santiago', 'Pagas y retiras en persona'],
    cta: { label: 'Coordinar retiro por WhatsApp', href: waLink('Hola! Me gustaría coordinar un retiro presencial 🐾') },
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const card = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export function PaymentMethods() {
  return (
    <section id="payment-methods" className="py-24 px-6 sm:px-10" style={{ background: 'hsl(220 25% 9%)' }}>
      <div className="container mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'hsl(340 84% 60%)' }}>
            Formas de pago
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Paga como te sea{' '}
            <span className="italic" style={{ color: 'hsl(340 84% 60%)' }}>más cómodo</span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-base">
            Elegimos los métodos más confiables y directos para que tu compra sea simple.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {methods.map((m) => (
            <motion.div
              key={m.id}
              variants={card}
              className="flex flex-col rounded-3xl p-7 border border-white/8 hover:border-white/16 transition-colors"
              style={{ background: 'hsl(220 25% 12%)' }}
            >
              {/* Icon + badge */}
              <div className="flex items-start justify-between mb-5">
                {m.icon}
                <span
                  className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full text-white"
                  style={{ background: `${m.badgeColor}33`, color: m.badgeColor, border: `1px solid ${m.badgeColor}55` }}
                >
                  {m.badge}
                </span>
              </div>

              {/* Title + description */}
              <h3 className="font-heading text-white text-xl font-bold mb-2">{m.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-6">{m.description}</p>

              {/* Steps */}
              <ol className="space-y-2 mb-7 flex-1">
                {m.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                    <span
                      className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                      style={{ background: m.badgeColor }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              {/* CTA */}
              {m.cta && (
                <a
                  href={m.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full text-sm font-semibold text-center transition-all hover:opacity-90 active:scale-95 text-white"
                  style={{ background: m.badgeColor }}
                >
                  {m.cta.label}
                </a>
              )}
              {!m.cta && (
                <div
                  className="w-full py-3 rounded-full text-sm font-semibold text-center"
                  style={{ background: 'hsl(200 90% 42% / 0.15)', color: 'hsl(200 90% 65%)' }}
                >
                  Disponible en el carrito →
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-3xl border border-white/8 p-6 sm:p-7"
          style={{ background: 'hsl(220 25% 12%)' }}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-300">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white">Despachos fuera de la VI Región</h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/50">
                  Enviamos a todo Chile. Elige el transportista al activar despacho en el carrito.
                  Las compras superiores a ${FREE_SHIPPING_THRESHOLD.toLocaleString('es-CL')} tienen despacho gratis.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-200">
              <MapPin className="h-4 w-4" />
              Todo Chile
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {SHIPPING_PROVIDERS.map((provider) => (
              <div
                key={provider.id}
                className="flex min-h-[76px] items-center justify-center rounded-2xl border border-white/10 bg-white px-4 py-3"
              >
                <img
                  src={provider.logo}
                  alt={`Logo de ${provider.name}`}
                  className={`${provider.logoClassName} w-auto object-contain`}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-white/30 text-xs mt-10"
        >
          🔒 Todos los pagos online se procesan por plataformas oficiales. Nunca solicitamos datos bancarios por WhatsApp.
        </motion.p>
      </div>
    </section>
  );
}
