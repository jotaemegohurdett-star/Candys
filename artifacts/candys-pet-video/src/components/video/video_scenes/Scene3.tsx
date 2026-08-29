import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene3() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(100% 0 0 0)' }} transition={{ duration: .8, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--ink)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 80% 18%, rgba(57,199,189,.3), transparent 36%), radial-gradient(circle at 12% 95%, rgba(237,23,107,.28), transparent 34%)' }} />
      <div className="absolute tiny-caps" style={{ left: '8cqw', top: '4.8cqh', color: 'rgba(250,248,244,.72)', fontSize: '2.5cqw' }}>02 / El favorito</div>
      <motion.div className="capture-frame" style={{ left: '7cqw', top: '15cqh', width: '86cqw', height: '36cqh', transform: 'rotate(1deg)' }} initial={{ opacity: 0, scale: 1.1, y: 42 }} animate={{ opacity: .94, scale: 1, y: 0 }} transition={{ delay: .2, duration: 1, ease: [0.16, 1, .3, 1] }}>
        <motion.img src={`${base}site-captures/classic-real.jpg`} alt="Captura real del Porta Mascota Tipo Banano Clásico" animate={{ scale: [1.02, 1.07, 1.02], x: ['0%', '-1%', '0%'] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(17,19,29,.04), rgba(17,19,29,.3))' }} />
        <motion.div className="focus-ring absolute" style={{ left: '51%', top: '23%', width: '32%', height: '64%' }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ delay: .75, duration: 4, repeat: Infinity }} />
      </motion.div>
      <div className="relative z-10 flex h-full flex-col justify-end" style={{ padding: '0 8cqw 10cqh' }}>
        <motion.p style={{ marginBottom: '1.6cqh', color: 'var(--sun)', fontSize: '3.5cqw', fontWeight: 700 }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>Porta Mascota Clásico</motion.p>
        <motion.h2 className="font-display font-semibold leading-[.91] tracking-[-.055em]" style={{ color: 'var(--paper)', fontSize: '12cqw' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .72 }}>Cerca de ti,<br /><span style={{ color: 'var(--coral)' }}>cada día.</span></motion.h2>
        <motion.div className="caption-card" style={{ marginTop: '3cqh', width: '84cqw', padding: '3cqw' }} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .9, duration: .5 }}>
          <div className="flex items-center gap-[2cqw] font-bold" style={{ color: 'var(--paper)', fontSize: '3.5cqw' }}><ShieldCheck style={{ width: '5cqw', color: 'var(--teal)' }} /> Manos libres y seguro</div>
          <div style={{ marginTop: '.8cqh', color: 'rgba(250,248,244,.64)', fontSize: '3cqw', lineHeight: 1.3 }}>Cómodo y práctico para paseos y viajes.</div>
        </motion.div>
        <motion.div className="inline-flex items-center gap-[1.4cqw] self-start rounded-full font-bold" style={{ marginTop: '2.4cqh', padding: '2.2cqw 3.2cqw', background: 'var(--coral)', color: 'var(--paper)', fontSize: '3.2cqw' }} initial={{ opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.25, type: 'spring', stiffness: 260, damping: 22 }}>Ver el modelo <ArrowUpRight style={{ width: '4cqw' }} /></motion.div>
      </div>
    </motion.section>
  );
}