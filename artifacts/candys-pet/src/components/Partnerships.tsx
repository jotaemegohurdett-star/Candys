import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import colabImg from '@assets/Screenshot_20260722-005655_Instagram_1784696503278.jpg';
import poodleImg from '@assets/Screenshot_20260722-005650_Instagram_1784696503395.jpg';

const partners = [
  {
    name: 'Club Chihuahua Chile',
    handle: '@clubchihuahuachile',
    url: 'https://www.instagram.com/clubchihuahuachile',
    emoji: '🐕',
    desc: 'La comunidad más grande de amantes del Chihuahua en Chile.',
  },
  {
    name: 'Club Poodle Chile',
    handle: '@club_poodlechile',
    url: 'https://www.instagram.com/club_poodlechile',
    emoji: '🐩',
    desc: 'Comunidad de poodleros apasionados por sus mascotas.',
  },
];

export function Partnerships() {
  return (
    <section id="partnerships" className="py-24 bg-[hsl(220_25%_9%)]">
      <div className="container mx-auto px-6 sm:px-10">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ background: 'hsl(340 84% 50% / 0.15)', color: 'hsl(340 84% 65%)' }}
          >
            Colaboraciones
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Juntos por{' '}
            <span className="italic" style={{ color: 'hsl(340 84% 65%)' }}>
              nuestros peludos
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-white/50 text-base leading-relaxed"
          >
            Orgullosos de colaborar con las mejores comunidades de amantes de mascotas en Chile.
          </motion.p>
        </div>

        {/* Content: image + partners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Images side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden">
              <img src={colabImg} alt="Colaboración Candy's Pet x Club Chihuahua Chile" className="w-full h-full object-cover" style={{ objectPosition: 'right 48%' }} />
            </div>
            <div className="aspect-[3/4] rounded-3xl overflow-hidden mt-8">
              <img src={poodleImg} alt="Colaboración Candy's Pet x Club Poodle Chile" className="w-full h-full object-cover" style={{ objectPosition: 'right 64%' }} />
            </div>
          </motion.div>

          {/* Partners side */}
          <div className="space-y-5">
            {partners.map((p, i) => (
              <motion.a
                key={p.handle}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-5 p-6 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: 'hsl(340 84% 50% / 0.15)' }}
                >
                  {p.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading font-bold text-white text-xl mb-1">{p.name}</h3>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    <span className="text-sm text-white/50">{p.handle}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'hsl(340 84% 50%)' }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.a>
            ))}

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-3xl border border-white/10 bg-white/5"
            >
              <p className="text-white/70 text-base leading-relaxed italic mb-4">
                "En Candy's Pets creemos que nuestros peludos merecen pasear con comodidad, seguridad y mucho estilo. Nuestros porta mascotas tipo banano están diseñados para mantener a tu compañero cerca de ti."
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Lorena Abarca</span>
                <span className="text-white/30 text-sm">·</span>
                <span className="text-sm text-white/40">Fundadora, Candy's Pet</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
