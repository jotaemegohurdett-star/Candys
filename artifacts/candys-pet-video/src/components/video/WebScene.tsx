import { motion } from 'framer-motion';
import { ArrowUpRight, PawPrint } from 'lucide-react';

const base = import.meta.env.BASE_URL;

const SCENES = [
  {
    eyebrow: 'Una nueva forma de salir',
    title: 'Tu mascota,',
    accent: 'siempre cerca.',
    detail: 'Cómoda, segura y con estilo. Porta mascotas hechos para salir.',
    image: 'home-real.jpg',
    background: 'var(--ink)',
    foreground: 'var(--paper)',
    muted: 'rgba(250,248,244,.7)',
    accentColor: 'var(--coral)',
  },
  {
    eyebrow: '01 / El catalogo',
    title: 'Tres modelos.',
    accent: 'Para elegir.',
    detail: 'Clásico, bomber y unisex. Encuentra tu forma de moverte.',
    image: 'catalog-real.jpg',
    background: 'var(--rose-wash)',
    foreground: 'var(--ink)',
    muted: 'rgba(17,19,29,.64)',
    accentColor: 'var(--coral)',
  },
  {
    eyebrow: '02 / El favorito',
    title: 'Cerca de ti.',
    accent: 'Cada día.',
    detail: 'Un abrazo cómodo para las pequeñas aventuras de todos los días.',
    image: 'classic-real.jpg',
    background: 'var(--ink)',
    foreground: 'var(--paper)',
    muted: 'rgba(250,248,244,.7)',
    accentColor: 'var(--sun)',
  },
  {
    eyebrow: '03 / Distintos estilos',
    title: 'Tu estilo.',
    accent: 'Tu color.',
    detail: 'Diseños pensados para acompañarte, sin dejar tu personalidad atrás.',
    image: 'bomber-real.jpg',
    background: 'var(--aqua-wash)',
    foreground: 'var(--ink)',
    muted: 'rgba(17,19,29,.64)',
    accentColor: 'var(--coral)',
  },
  {
    eyebrow: '04 / Elige tu talla',
    title: 'Mide.',
    accent: 'Elige.',
    detail: 'La guía de tallas te ayuda a encontrar el ajuste que se siente bien.',
    image: 'size-guide-real.jpg',
    background: '#c8e6e4',
    foreground: 'var(--ink)',
    muted: 'rgba(17,19,29,.64)',
    accentColor: 'var(--teal)',
  },
  {
    eyebrow: '05 / Compra fácil',
    title: 'Elige.',
    accent: 'Consulta.',
    detail: 'Te acompañamos antes de comprar. Escribe y resolvemos tus dudas.',
    image: 'contact-real.jpg',
    background: '#25222e',
    foreground: 'var(--paper)',
    muted: 'rgba(250,248,244,.68)',
    accentColor: 'var(--sun)',
  },
  {
    eyebrow: 'Candy’s Pet',
    title: 'Lleva a tu',
    accent: 'compañero.',
    detail: 'Hecho a mano en Chile para perros y gatos.',
    image: 'unisex-real.jpg',
    background: 'var(--ink)',
    foreground: 'var(--paper)',
    muted: 'rgba(250,248,244,.7)',
    accentColor: 'var(--coral)',
  },
] as const;

export function WebScene({ sceneIndex }: { sceneIndex: number }) {
  const scene = SCENES[sceneIndex] ?? SCENES[0];

  return (
    <motion.section
      className="absolute inset-0 overflow-hidden"
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      exit={{ clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: scene.background, color: scene.foreground }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          right: '-13cqw',
          top: '-35cqh',
          width: '54cqw',
          height: '90cqh',
          background: `radial-gradient(circle, color-mix(in srgb, ${scene.accentColor} 40%, transparent), transparent 68%)`,
        }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            sceneIndex % 2 === 0
              ? 'linear-gradient(112deg, rgba(17,19,29,.06), transparent 50%, rgba(17,19,29,.2))'
              : 'linear-gradient(112deg, rgba(255,255,255,.18), transparent 55%, rgba(17,19,29,.08))',
        }}
      />

      <div className="absolute z-20 flex items-center gap-[1.2cqw]" style={{ left: '5.5cqw', top: '7cqh' }}>
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: '4.6cqw', height: '4.6cqw', background: scene.accentColor, color: 'var(--paper)' }}
        >
          <PawPrint style={{ width: '2.3cqw', height: '2.3cqw' }} fill="currentColor" />
        </div>
        <span className="font-display font-semibold" style={{ fontSize: '2.9cqw' }}>
          Candy&apos;s <i style={{ color: scene.accentColor }}>Pet</i>
        </span>
      </div>

      <motion.div
        className="capture-frame"
        style={{
          left: '49cqw',
          top: '15cqh',
          width: '45cqw',
          height: '67cqh',
          transform: 'rotate(-1deg)',
          borderRadius: '1.2cqw',
          borderColor: 'rgba(255,255,255,.76)',
        }}
        initial={{ opacity: 0, scale: 1.08, x: 18 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={`${base}site-captures/${scene.image}`}
          alt="Captura real del sitio de Candy's Pet"
          animate={{ scale: [1.015, 1.045, 1.015], x: ['0%', '-1%', '0%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(17,19,29,.04), rgba(17,19,29,.13))' }} />
      </motion.div>

      <div
        className="relative z-10 flex h-full flex-col justify-end"
        style={{ width: '45cqw', padding: '0 0 10cqh 5.5cqw' }}
      >
        <motion.p
          className="tiny-caps"
          style={{ marginBottom: '2.2cqh', color: scene.accentColor, fontSize: '1.45cqw' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
        >
          {scene.eyebrow}
        </motion.p>
        <motion.h1
          className="font-display font-semibold leading-[.91] tracking-[-.055em]"
          style={{ maxWidth: '39cqw', fontSize: '7.2cqw' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          {scene.title}
          <br />
          <span style={{ color: scene.accentColor }}>{scene.accent}</span>
        </motion.h1>
        <motion.p
          style={{ maxWidth: '35cqw', marginTop: '2.4cqh', color: scene.muted, fontSize: '1.7cqw', lineHeight: 1.3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.88, duration: 0.6 }}
        >
          {scene.detail}
        </motion.p>
        <motion.div
          className="flex items-center gap-[1cqw] font-semibold"
          style={{ marginTop: '3cqh', color: scene.foreground, fontSize: '1.45cqw' }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.45 }}
        >
          <span
            className="flex items-center justify-center rounded-full border"
            style={{
              width: '3.4cqw',
              height: '3.4cqw',
              borderColor: `color-mix(in srgb, ${scene.accentColor} 68%, transparent)`,
              color: scene.accentColor,
            }}
          >
            <ArrowUpRight style={{ width: '1.7cqw', height: '1.7cqw' }} />
          </span>
          Hecho a mano en Chile
        </motion.div>
      </div>

      <div
        className="absolute bottom-[6.8cqh] right-[5.5cqw] z-20 flex items-center gap-[1.1cqw]"
        style={{ color: scene.muted, fontSize: '1.2cqw' }}
      >
        <span className="h-px w-[4cqw]" style={{ background: scene.accentColor }} />
        <span>Porta mascotas · bandoleras · bolsos</span>
        <span className="font-display" style={{ color: scene.foreground, fontSize: '1.7cqw' }}>
          {String(sceneIndex + 1).padStart(2, '0')} / 07
        </span>
      </div>
    </motion.section>
  );
}