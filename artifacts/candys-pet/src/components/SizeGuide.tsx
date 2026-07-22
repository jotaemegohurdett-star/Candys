import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ruler } from 'lucide-react';
import sizeImg from '@assets/Screenshot_20260721-205723_Instagram_1784688486916.jpg';

const sizes = [
  {
    label: 'S',
    name: 'Pequeño',
    weight: 'hasta 4 kg',
    length: '20 – 30 cm',
    breeds: 'Chihuahua, Yorkshire Terrier, Gatos pequeños',
    color: 'hsl(340 84% 50%)',
    bg: 'hsl(340 84% 50% / 0.08)',
  },
  {
    label: 'M',
    name: 'Mediano',
    weight: '4 – 7 kg',
    length: '30 – 40 cm',
    breeds: 'Poodle Toy, Maltés, Pug, Gatos adultos',
    color: 'hsl(186 96% 43%)',
    bg: 'hsl(186 96% 43% / 0.08)',
  },
  {
    label: 'L',
    name: 'Grande',
    weight: '7 – 10 kg',
    length: '40 – 50 cm',
    breeds: 'Bulldog Francés, Schnauzer mini, Bichón Frisé',
    color: 'hsl(340 84% 50%)',
    bg: 'hsl(340 84% 50% / 0.08)',
  },
];

export function SizeGuide() {
  const [active, setActive] = useState(0);

  return (
    <section id="size-guide" className="py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Left — content */}
          <div className="lg:w-1/2">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ background: 'hsl(186 96% 43% / 0.1)', color: 'hsl(186 96% 35%)' }}
            >
              <Ruler className="w-3.5 h-3.5" />
              Medidas exactas
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
            >
              Guía de{' '}
              <span className="italic" style={{ color: 'hsl(186 96% 38%)' }}>
                Tallas
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-muted-foreground text-base leading-relaxed mb-8"
            >
              Mide a tu mascota desde la base del cuello hasta donde comienza la cola. Esa medida determina la talla ideal. Si tu peludo está en el límite, te recomendamos subir una talla para mayor comodidad.
            </motion.p>

            {/* Size tabs */}
            <div className="flex gap-3 mb-6">
              {sizes.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setActive(i)}
                  className="w-14 h-14 rounded-full font-heading font-bold text-xl flex items-center justify-center border-2 transition-all duration-200"
                  style={
                    active === i
                      ? { background: s.color, borderColor: s.color, color: '#fff', boxShadow: `0 8px 20px ${s.color}55` }
                      : { borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }
                  }
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Active size detail */}
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl p-7 border border-border/60"
              style={{ background: sizes[active].bg }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-full font-heading font-bold text-2xl flex items-center justify-center text-white"
                  style={{ background: sizes[active].color }}
                >
                  {sizes[active].label}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-foreground">{sizes[active].name}</h3>
                  <p className="text-sm text-muted-foreground">Talla {sizes[active].label}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/70 rounded-2xl p-4">
                  <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">Peso</p>
                  <p className="font-bold text-foreground">{sizes[active].weight}</p>
                </div>
                <div className="bg-white/70 rounded-2xl p-4">
                  <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">Largo</p>
                  <p className="font-bold text-foreground">{sizes[active].length}</p>
                </div>
              </div>

              <div className="bg-white/70 rounded-2xl p-4">
                <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">Razas típicas</p>
                <p className="text-sm text-foreground font-medium">{sizes[active].breeds}</p>
              </div>
            </motion.div>

            {/* Tip */}
            <div className="mt-5 flex items-start gap-3 p-4 rounded-2xl bg-white border border-border/60">
              <span className="text-xl shrink-0">💡</span>
              <p className="text-sm text-foreground/80">
                <span className="font-bold">Tip:</span> Si tu mascota es muy larga (como un Salchicha), sube una talla independientemente del peso. Para razas braquicéfalas como Pug, elige la talla por ancho de pecho.
              </p>
            </div>
          </div>

          {/* Right — real size guide image from Instagram */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50"
            >
              <img
                src={sizeImg}
                alt="Guía de cómo medir a tu mascota — Candy's Pet"
                className="w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="glass rounded-2xl px-4 py-3 text-center">
                  <p className="text-xs font-bold text-gray-900">📏 Cómo medir a tu mascota</p>
                  <p className="text-xs text-gray-500 mt-0.5">Desde el cuello hasta donde comienza la cola</p>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp help */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-5 p-5 rounded-2xl text-center"
              style={{ background: 'hsl(340 84% 50% / 0.08)', border: '1px solid hsl(340 84% 50% / 0.2)' }}
            >
              <p className="text-sm font-semibold text-foreground mb-3">
                ¿Dudas con la talla? ¡Te ayudamos por WhatsApp! 🐾
              </p>
              <a
                href="https://wa.me/56936693300?text=Hola!%20Necesito%20ayuda%20para%20elegir%20la%20talla%20correcta%20para%20mi%20mascota%20%F0%9F%90%BE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{ background: 'hsl(340 84% 50%)' }}
              >
                Consultar talla gratis
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
