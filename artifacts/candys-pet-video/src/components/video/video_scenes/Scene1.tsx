import { motion } from 'framer-motion';
import { ArrowDownRight, PawPrint } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene1() {
  return (
    <motion.section
      className="absolute inset-0 overflow-hidden"
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      exit={{ clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: 'var(--ink)' }}
    >
      <motion.div
        className="absolute rounded-full"
        style={{ right: '-30cqw', top: '-18cqh', width: '105cqw', height: '64cqh', background: 'radial-gradient(circle, rgba(237,23,107,.48), rgba(237,23,107,0) 67%)' }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(17,19,29,.1), rgba(17,19,29,.72) 55%, rgba(17,19,29,.98))' }} />
      <div className="absolute z-20 flex items-center gap-[1.8cqw]" style={{ left: '7cqw', top: '4.5cqh' }}>
        <div className="flex items-center justify-center rounded-full" style={{ width: '8cqw', height: '8cqw', background: 'var(--coral)', color: 'var(--paper)' }}>
          <PawPrint style={{ width: '4cqw', height: '4cqw' }} fill="currentColor" />
        </div>
        <span className="font-display font-semibold" style={{ color: 'var(--paper)', fontSize: '4.6cqw' }}>
          Candy&apos;s <i style={{ color: 'var(--coral)' }}>Pet</i>
        </span>
      </div>

      <motion.div
        className="capture-frame"
        style={{ left: '7cqw', top: '16cqh', width: '86cqw', height: '35cqh', transform: 'rotate(1.2deg)' }}
        initial={{ opacity: 0, scale: 1.13, y: 10 }}
        animate={{ opacity: 0.8, scale: 1.04, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={`${base}site-captures/home-real.jpg`}
          alt="Captura real de la página de inicio de Candy's Pet"
          animate={{ scale: [1.02, 1.06, 1.02], x: ['0%', '-1.5%', '0%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(17,19,29,.05), rgba(17,19,29,.25))' }} />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col justify-end" style={{ padding: '0 8cqw 12cqh' }}>
        <motion.p className="tiny-caps" style={{ marginBottom: '2.5cqh', color: 'var(--coral)', fontSize: '2.6cqw' }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .4 }}>
          Una nueva forma de salir
        </motion.p>
        <motion.h1 className="font-display font-semibold leading-[.9] tracking-[-.055em]" style={{ color: 'var(--paper)', fontSize: '12.2cqw' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .75, ease: [0.16, 1, .3, 1] }}>
          Tu mascota,<br /><span style={{ color: 'var(--coral)' }}>siempre cerca.</span>
        </motion.h1>
        <motion.p className="max-w-[80cqw] leading-[1.35]" style={{ marginTop: '3cqh', color: 'rgba(250,248,244,.76)', fontSize: '4cqw' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .95, duration: .65 }}>
          Cómoda, segura y con estilo. Una tienda chilena de porta mascotas tipo banano.
        </motion.p>
        <motion.div className="flex items-center gap-[2cqw] font-semibold" style={{ marginTop: '3.5cqh', color: 'var(--paper)', fontSize: '3cqw' }} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.35, duration: .5 }}>
          <span className="flex items-center justify-center rounded-full border" style={{ width: '8cqw', height: '8cqw', borderColor: 'rgba(250,248,244,.7)' }}><ArrowDownRight style={{ width: '3.5cqw' }} /></span>
          Hecho a mano en Chile
        </motion.div>
      </div>
      <motion.div className="caption-card absolute z-20" style={{ left: '8cqw', right: '8cqw', bottom: '4.5cqh', padding: '2.4cqw 3cqw' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: .55 }}>
        <div className="font-bold uppercase tracking-[.18em]" style={{ color: 'var(--coral)', fontSize: '2.2cqw' }}>Candy&apos;s Pet</div>
        <div className="leading-tight" style={{ marginTop: '.8cqh', color: 'var(--paper)', fontSize: '3.4cqw' }}>Porta mascotas para perros y gatos</div>
      </motion.div>
    </motion.section>
  );
}