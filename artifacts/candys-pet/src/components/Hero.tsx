import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Star, Instagram, Sparkles } from 'lucide-react';
import heroImg from '@assets/Screenshot_20260722-005838_Instagram~3_1784698640046.jpg';

const HEADLINE = [
  { text: 'El abrazo que', italic: false },
  { text: 'tu mascota', italic: true },
  { text: 'merece.', italic: false },
];

const stats = [
  { value: '+5.300', label: 'Seguidores Instagram' },
  { value: '+105',   label: 'Publicaciones' },
  { value: '100%',   label: 'Hecho a mano' },
];

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[hsl(220_25%_7%)]">

      {/* ── Animated gradient orbs ───────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="orb-a absolute -top-48 -left-48 w-[640px] h-[640px] rounded-full opacity-[0.18]"
          style={{ background: 'radial-gradient(circle at center, hsl(340 84% 55%), transparent 68%)' }}
        />
        <div
          className="orb-b absolute bottom-0 left-1/4 w-[480px] h-[480px] rounded-full opacity-[0.13]"
          style={{ background: 'radial-gradient(circle at center, hsl(186 96% 50%), transparent 68%)' }}
        />
        <div
          className="orb-c absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle at center, hsl(270 60% 60%), transparent 68%)' }}
        />
      </div>

      {/* ── Hero image — right two-thirds ───────────────── */}
      <div className="absolute right-0 top-0 w-full md:w-[62%] h-full">
        <img
          src={heroImg}
          alt="Porta mascota Candy's Pet — perrito en sling azul marino"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
          style={{ objectPosition: 'center 8%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220_25%_7%)] via-[hsl(220_25%_7%/0.78)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220_25%_7%/0.5)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_25%_7%/0.28)] via-transparent to-transparent" />
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-6 sm:px-10 pt-28 pb-20">
        <div className="max-w-xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/15 bg-white/[0.07] backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: 'hsl(38 72% 65%)' }} />
            <span className="text-white/80 text-sm font-medium tracking-wide">Hecho a mano en Chile 🇨🇱</span>
          </motion.div>

          {/* Headline — line-by-line reveal */}
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6">
            {HEADLINE.map((line, li) => (
              <div key={li}>
                <motion.span
                  initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: 0.15 + li * 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block ${line.italic ? 'italic' : ''}`}
                  style={line.italic ? { color: 'hsl(340 84% 65%)' } : { color: 'white' }}
                >
                  {line.text}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72 }}
            className="text-white/58 text-lg leading-relaxed mb-10 max-w-md"
            style={{ color: 'rgba(255,255,255,0.58)' }}
          >
            Porta mascotas tipo banano para perritos y gatitos. Cómodos, seguros y con mucho estilo. Diseñados por Lorena Abarca para que lleves a tu regalón a todas partes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.88 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-shimmer relative px-8 py-4 rounded-full font-semibold text-base text-white transition-all active:scale-95"
              style={{
                background: 'linear-gradient(135deg, hsl(340 84% 53%), hsl(340 84% 44%))',
                boxShadow: '0 8px 36px hsl(340 84% 50% / 0.45)',
              }}
            >
              Ver Catálogo
            </button>
            <a
              href="https://wa.me/56936693300?text=Hola%20Candy's%20Pet!%20Me%20gustar%C3%ADa%20consultar%20sobre%20sus%20porta%20mascotas%20%F0%9F%90%BE"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-semibold text-base text-white border border-white/25 hover:border-white/55 hover:bg-white/[0.07] transition-all active:scale-95 backdrop-blur-sm"
            >
              WhatsApp
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="flex gap-8 mt-14 pt-10 border-t border-white/10"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05 + i * 0.08 }}
              >
                <p className="text-white font-heading text-2xl font-bold">{stat.value}</p>
                <p className="text-xs mt-0.5 tracking-wide" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────── */}
      <motion.button
        onClick={() => document.querySelector('#benefits')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hover:text-white/70 transition-colors"
        style={{ color: 'rgba(255,255,255,0.32)' }}
        aria-label="Scroll hacia abajo"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.button>

      {/* ── Instagram floating badge ─────────────────────── */}
      <motion.a
        href="https://www.instagram.com/candys_pets1"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1 }}
        whileHover={{ scale: 1.04 }}
        className="absolute bottom-10 right-6 z-20 hidden md:flex items-center gap-3 glass rounded-2xl px-4 py-3 shadow-2xl"
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
        >
          <Instagram className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-gray-900">@candys_pets1</p>
          <div className="flex gap-0.5 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
      </motion.a>
    </section>
  );
}
