import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Feather, Sparkles, Brain, Wind } from 'lucide-react';
import lifestyleImg from '@assets/Screenshot_20260722-051400_WhatsApp~2_1784713749406.jpg';

const benefits = [
  {
    icon: <Heart className="w-6 h-6" />,
    color: 'hsl(340 84% 50%)',
    bg: 'hsl(340 84% 50% / 0.1)',
    hoverBg: 'hsl(340 84% 50% / 0.18)',
    title: 'Vínculo Cercano',
    description:
      'Mantiene a tu mascota junto a tu pecho, fortaleciendo el lazo afectivo en cada paseo, viaje o salida al mall.',
  },
  {
    icon: <Wind className="w-6 h-6" />,
    color: 'hsl(186 96% 38%)',
    bg: 'hsl(186 96% 43% / 0.1)',
    hoverBg: 'hsl(186 96% 43% / 0.18)',
    title: 'Reduce el Estrés',
    description:
      'El contacto constante con tu cuerpo calma la ansiedad de tu regalón. Menos ladridos, más tranquilidad — probado por cientos de familias. 🌿',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    color: 'hsl(270 70% 60%)',
    bg: 'hsl(270 70% 60% / 0.1)',
    hoverBg: 'hsl(270 70% 60% / 0.18)',
    title: 'Uso Terapéutico 🧡',
    description:
      'Ideal para perritos senior o con alguna discapacidad. El calor y el movimiento del portador los ayuda a sentirse seguros, protegidos y amados.',
  },
  {
    icon: <Feather className="w-6 h-6" />,
    color: 'hsl(186 96% 38%)',
    bg: 'hsl(186 96% 43% / 0.1)',
    hoverBg: 'hsl(186 96% 43% / 0.18)',
    title: 'Liviano y Cómodo',
    description:
      'Distribuye el peso uniformemente. Manos 100% libres para el metro, el mall o cualquier aventura. ¡En talla L caben 2 perritos pequeños!',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    color: 'hsl(340 84% 50%)',
    bg: 'hsl(340 84% 50% / 0.1)',
    hoverBg: 'hsl(340 84% 50% / 0.18)',
    title: 'Seguro y Resistente',
    description:
      'Materiales de alta durabilidad, costuras reforzadas y gancho de seguridad interior. Fabricado con amor en Chile 🇨🇱',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    color: 'hsl(42 90% 55%)',
    bg: 'hsl(42 90% 55% / 0.1)',
    hoverBg: 'hsl(42 90% 55% / 0.18)',
    title: 'Calidad Premium',
    description:
      'Tela suave, segura y transpirable. Forrado con algodón. Hecho a mano con amor 💕, apto desde los 2 meses de vida.',
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 sm:px-10">

        {/* Top row: text + image */}
        <div className="flex flex-col lg:flex-row gap-14 items-center mb-20">

          {/* Text side */}
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
              className="text-muted-foreground text-lg leading-relaxed mb-8"
            >
              Nuestros porta mascotas tipo sling están diseñados para perros de raza pequeña a mediana.
              Ideales para el día a día, viajes en metro y aventuras juntos. También perfectos para
              perritos <strong>senior o con discapacidad</strong> — su uso terapéutico los hace sentir
              seguros y amados. Disponibles en talla <strong>M</strong> (desde los 2 meses hasta 3,5 kg)
              y talla <strong>L</strong> (hasta 10 kg, ¡caben 2 perritos pequeños!).
            </motion.p>

            {/* Quick stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22 }}
              className="flex gap-6 flex-wrap"
            >
              {[
                { n: '4', u: 'modelos', label: 'disponibles' },
                { n: '8+', u: 'colores', label: 'por modelo' },
                { n: '2', u: 'tallas', label: 'M · L' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-heading text-2xl font-bold text-foreground">
                    {s.n}{' '}
                    <span className="text-base font-semibold" style={{ color: 'hsl(340 84% 50%)' }}>
                      {s.u}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image side */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img
                src={lifestyleImg}
                alt="Clientes felices usando sus porta mascotas Candy's Pet"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                style={{ objectPosition: 'center 45%' }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

              {/* Caption */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="glass rounded-xl px-4 py-3 flex items-center gap-3">
                  <span className="text-xl">🇨🇱</span>
                  <div>
                    <p className="text-xs font-bold text-gray-900">La familia Candy's Pet en Chile</p>
                    <p className="text-xs text-gray-500 mt-0.5">Paseos, salidas y aventuras juntos</p>
                  </div>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div
                className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg"
                style={{ background: 'hsl(340 84% 50%)' }}
              >
                🐾
              </div>
            </motion.div>
          </div>
        </div>

        {/* Size pricing strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14"
        >
          {[
            {
              talla: 'M',
              precio: '$18.990',
              desc: 'Desde los 2 meses hasta 3,5 kg',
              detail: 'Talla única para razas toy y mini. Perfecta para cachorros.',
              color: 'hsl(340 84% 50%)',
              bg: 'hsl(340 84% 50% / 0.07)',
              border: 'hsl(340 84% 50% / 0.25)',
            },
            {
              talla: 'L',
              precio: '$20.990',
              desc: 'Hasta 10 kg — ¡caben 2 perritos!',
              detail: 'Ideal para razas medianas, perritos senior o para llevar a tus 2 regalones juntos.',
              color: 'hsl(270 70% 60%)',
              bg: 'hsl(270 70% 60% / 0.07)',
              border: 'hsl(270 70% 60% / 0.25)',
            },
          ].map((s) => (
            <div
              key={s.talla}
              className="flex items-start gap-5 p-6 rounded-2xl border"
              style={{ background: s.bg, borderColor: s.border }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-heading text-2xl font-black text-white shrink-0 shadow-md"
                style={{ background: s.color }}
              >
                {s.talla}
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-foreground">{s.precio}</p>
                <p className="text-sm font-semibold mt-0.5" style={{ color: s.color }}>{s.desc}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.detail}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="gradient-border-card group p-8 rounded-3xl border border-border/50 bg-white hover:shadow-2xl transition-all duration-400 relative overflow-hidden cursor-default"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.12, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300"
                style={{ background: b.bg, color: b.color }}
              >
                {b.icon}
              </motion.div>

              <h3 className="font-heading text-xl font-bold mb-3 text-foreground">{b.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>

              {/* Glow on hover */}
              <div
                className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                style={{ background: b.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
