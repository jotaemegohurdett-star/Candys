import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Instagram, Package, Mail } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

const contactItems = [
  {
    icon: <WhatsAppIcon className="w-5 h-5" />,
    color: 'hsl(340 84% 50%)',
    bg: 'hsl(340 84% 50% / 0.1)',
    title: 'WhatsApp',
    value: '+56 9 3669 3300',
    link: "https://wa.me/56936693300?text=Hola%20Candy's%20Pet!%20Me%20gustar%C3%ADa%20consultar%20sobre%20sus%20porta%20mascotas%20%F0%9F%90%BE",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    color: 'hsl(220 70% 55%)',
    bg: 'hsl(220 70% 55% / 0.1)',
    title: 'Correo',
    value: 'contacto@candyspet.cl',
    link: 'mailto:contacto@candyspet.cl',
  },
  {
    icon: <Instagram className="w-5 h-5" />,
    color: 'hsl(186 96% 38%)',
    bg: 'hsl(186 96% 43% / 0.1)',
    title: 'Instagram',
    value: '@candys_pets1',
    link: 'https://www.instagram.com/candys_pets1/',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    color: 'hsl(340 84% 50%)',
    bg: 'hsl(340 84% 50% / 0.1)',
    title: 'Ubicación',
    value: 'Santiago, Chile 🇨🇱',
    link: null,
  },
  {
    icon: <Clock className="w-5 h-5" />,
    color: 'hsl(186 96% 38%)',
    bg: 'hsl(186 96% 43% / 0.1)',
    title: 'Atención',
    value: 'Abierto las 24 horas, todos los días',
    link: null,
  },
  {
    icon: <Package className="w-5 h-5" />,
    color: 'hsl(340 84% 50%)',
    bg: 'hsl(340 84% 50% / 0.1)',
    title: 'Retiro / Envíos',
    value: 'Retiro Santiago, comuna San Joaquín · Datos de entrega por WhatsApp',
    link: null,
  },
];

export function Location() {
  return (
    <section id="location" className="py-24 bg-white">
      <div className="container mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Left — text + contact */}
          <div className="lg:w-1/2">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ background: 'hsl(340 84% 50% / 0.1)', color: 'hsl(340 84% 45%)' }}
            >
              Contacto
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
            >
              ¿Hablamos{' '}
              <span className="italic" style={{ color: 'hsl(340 84% 50%)' }}>
                hoy?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-muted-foreground text-base leading-relaxed mb-10"
            >
              Tienda online con envíos a todo Chile. Retiro presencial en Santiago, comuna San Joaquín — los datos exactos de entrega se coordinan por WhatsApp. Te atendemos para consultas de tallas, colores y pedidos personalizados.
            </motion.p>

            {/* Contact items */}
            <div className="space-y-3">
              {contactItems.map((item, i) => {
                const Inner = (
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-200"
                      style={{ background: item.bg, color: item.color }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">
                        {item.title}
                      </p>
                      <p className="font-semibold text-foreground">{item.value}</p>
                    </div>
                    {item.link && (
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                          style={{ background: item.color }}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                );

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block p-4 rounded-2xl border border-border/60 bg-background hover:shadow-lg hover:border-transparent transition-all duration-250"
                        style={{ '--hover-border': item.color } as React.CSSProperties}
                      >
                        {Inner}
                      </a>
                    ) : (
                      <div className="group p-4 rounded-2xl border border-border/60 bg-background">
                        {Inner}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right — CTA card */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(145deg, hsl(220 25% 11%), hsl(220 25% 8%))',
                }}
              />
              {/* Decorative orbs */}
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle, hsl(340 84% 55%), transparent 70%)' }}
              />
              <div
                className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-15 pointer-events-none"
                style={{ background: 'radial-gradient(circle, hsl(186 96% 50%), transparent 70%)' }}
              />

              <div className="relative p-10 md:p-12">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8"
                  style={{ background: 'hsl(340 84% 50% / 0.15)' }}
                >
                  🐾
                </div>

                <h3 className="font-heading text-3xl font-bold text-white mb-4 leading-tight">
                  ¿Lista para llevar a tu regalón a todas partes?
                </h3>
                <p className="leading-relaxed mb-8 text-base" style={{ color: 'rgba(255,255,255,0.58)' }}>
                  Escríbenos por WhatsApp y te ayudamos a elegir el porta mascota perfecto para tu peludo. Atención personalizada, envíos a todo Chile.
                </p>

                <div className="space-y-3">
                  <a
                    href="https://wa.me/56936693300?text=Hola%20Candy's%20Pet!%20Me%20gustar%C3%ADa%20pedir%20un%20porta%20mascota%20%F0%9F%90%BE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer flex items-center justify-center gap-2 w-full py-4 rounded-full font-bold text-base text-white transition-all hover:opacity-90 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, hsl(340 84% 52%), hsl(340 84% 42%))',
                      boxShadow: '0 8px 32px hsl(340 84% 50% / 0.45)',
                    }}
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Escribir por WhatsApp
                  </a>
                  <a
                    href="https://www.instagram.com/candys_pets1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-semibold text-sm text-white border border-white/20 hover:bg-white/8 transition-all active:scale-95"
                  >
                    <Instagram className="w-4 h-4" />
                    Seguir en Instagram
                  </a>
                </div>

                <p className="text-xs text-center mt-6" style={{ color: 'rgba(255,255,255,0.28)' }}>
                  Lorena Abarca · Candy's Pet · Santiago, Chile 🇨🇱
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
