import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Feather, Sparkles } from 'lucide-react';
import lifestyleImg from '@assets/Screenshot_20260721-205728_Instagram_1784688486972.jpg';

const benefits = [
  {
    icon: <Heart className="w-6 h-6" />,
    color: 'hsl(340 84% 50%)',
    bg: 'hsl(340 84% 50% / 0.1)',
    title: 'Vínculo Cercano',
    description: 'Mantiene a tu mascota junto a tu pecho, calmando su ansiedad y fortaleciendo su lazo contigo en cada paseo.',
  },
  {
    icon: <Feather className="w-6 h-6" />,
    color: 'hsl(186 96% 43%)',
    bg: 'hsl(186 96% 43% / 0.1)',
    title: 'Liviano y Cómodo',
    description: 'Distribuye el peso uniformemente. Manos 100% libres para el metro, el mall o cualquier aventura.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    color: 'hsl(340 84% 50%)',
    bg: 'hsl(340 84% 50% / 0.1)',
    title: 'Seguro y Resistente',
    description: 'Materiales de alta durabilidad, costuras reforzadas y gancho de seguridad interior homologado.',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    color: 'hsl(186 96% 43%)',
    bg: 'hsl(186 96% 43% / 0.1)',
    title: 'Calidad Premium',
    description: 'Diseños exclusivos, telas suaves seleccionadas. Hecho con mucho amor 💕, pensado para ellos.',
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="container mx-auto px-6 sm:px-10">

        {/* Top row: label + heading + image */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <div className="lg:w-1/2">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ background: 'hsl(340 84% 50% / 0.1)', color: 'hsl(340 84% 45%)' }}
            >
              ¿Por qué un sling?
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6"
            >
              Más que un accesorio,{' '}
              <span className="italic" style={{ color: 'hsl(340 84% 50%)' }}>
                una forma de vida.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              Nuestros porta mascotas tipo banano están diseñados para mantener a tu compañero cerca de ti. Ideales para paseos, salidas al mall, viajes en metro y aventuras juntos. Para perros y gatos de hasta 10 kg.
            </motion.p>
          </div>
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img
                src={lifestyleImg}
                alt="Clientes felices usando sus porta mascotas Candy's Pet"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="glass rounded-xl px-4 py-3">
                  <p className="text-xs font-bold text-gray-900">Nuestros clientes en Chile 🇨🇱</p>
                  <p className="text-xs text-gray-500 mt-0.5">Paseos, salidas y aventuras juntos</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-8 rounded-3xl border border-border/60 bg-background hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ background: b.bg, color: b.color }}
              >
                {b.icon}
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">{b.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>

              {/* Decorative glow */}
              <div
                className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ background: b.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
