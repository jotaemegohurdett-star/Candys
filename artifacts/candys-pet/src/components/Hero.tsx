import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Star, Instagram } from 'lucide-react';
import heroImg from '@assets/Screenshot_20260722-005838_Instagram~3_1784698640046.jpg';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[hsl(220_25%_9%)]">
      {/* Background image — right two-thirds */}
      <div className="absolute right-0 top-0 w-full md:w-[60%] h-full">
        <img
          src={heroImg}
          alt="Porta mascota Candy's Pet — perrito en sling azul marino"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
          style={{ objectPosition: 'center 8%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220_25%_9%)] via-[hsl(220_25%_9%/0.7)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_25%_9%/0.5)] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 sm:px-10 pt-28 pb-20">
        <div className="max-w-xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[hsl(340_84%_60%)] animate-pulse" />
            <span className="text-white/80 text-sm font-medium tracking-wide">Hecho a mano en Chile 🇨🇱</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-white font-heading text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6"
          >
            El abrazo que
            <br />
            <span className="italic" style={{ color: 'hsl(340 84% 65%)' }}>
              tu mascota
            </span>
            <br />
            merece.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/65 text-lg leading-relaxed mb-10 max-w-md"
          >
            Porta mascotas tipo banano para perritos y gatitos. Cómodos, seguros y con mucho estilo. Diseñados por Lorena Abarca para que lleves a tu regalón a todas partes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full font-semibold text-base text-white transition-all active:scale-95 shadow-lg"
              style={{ background: 'hsl(340 84% 50%)', boxShadow: '0 8px 32px hsl(340 84% 50% / 0.35)' }}
            >
              Ver Catálogo
            </button>
            <a
              href="https://wa.me/56936693300?text=Hola%20Candy's%20Pet!%20Me%20gustar%C3%ADa%20consultar%20sobre%20sus%20porta%20mascotas%20%F0%9F%90%BE"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-semibold text-base text-white border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all active:scale-95"
            >
              WhatsApp
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex gap-8 mt-14 pt-10 border-t border-white/15"
          >
            {[
              { value: '+5.300', label: 'Seguidores Instagram' },
              { value: '+105', label: 'Publicaciones' },
              { value: '100%', label: 'Hecho a mano' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-white font-heading text-2xl font-bold">{stat.value}</p>
                <p className="text-white/45 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.querySelector('#benefits')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Scroll hacia abajo"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.button>

      {/* Instagram floating badge */}
      <motion.a
        href="https://www.instagram.com/candys_pets1"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-10 right-6 z-20 hidden md:flex items-center gap-3 glass rounded-2xl px-4 py-3 shadow-xl hover:scale-105 transition-transform"
      >
        <Instagram className="w-5 h-5 text-pink-500" />
        <div>
          <p className="text-xs font-bold text-gray-900">@candys_pets1</p>
          <div className="flex gap-0.5 mt-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
          </div>
        </div>
      </motion.a>
    </section>
  );
}
