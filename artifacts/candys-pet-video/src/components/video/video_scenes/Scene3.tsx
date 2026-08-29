import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene3() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(100% 0 0 0)' }} transition={{ duration: .8, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--ink)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 80% 18%, rgba(57,199,189,.26), transparent 35%), radial-gradient(circle at 12% 95%, rgba(237,23,107,.24), transparent 32%)' }} />
      <div className="absolute left-[7vw] top-[6vh] text-[.85vw] tiny-caps" style={{ color: 'rgba(250,248,244,.72)' }}>02 / El favorito</div>
      <motion.div className="capture-frame absolute right-[7vw] top-[10vh] h-[80vh] w-[75vw] rotate-[1deg]" initial={{ opacity: 0, scale: 1.1, x: 42 }} animate={{ opacity: .94, scale: 1, x: 0 }} transition={{ delay: .2, duration: 1, ease: [0.16, 1, .3, 1] }}>
        <motion.img src={`${base}site-captures/classic-real.jpg`} alt="Captura real del Porta Mascota Tipo Banano Clásico" className="h-full w-full object-cover" animate={{ scale: [1.02, 1.075, 1.02], x: ['0%', '-1%', '0%'] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(17,19,29,.93), rgba(17,19,29,.42) 38%, rgba(17,19,29,.05) 77%)' }} />
        <motion.div className="focus-ring absolute left-[51%] top-[25%] h-[64%] w-[32%]" animate={{ opacity: [0, 1, 1, 0] }} transition={{ delay: .75, duration: 4, repeat: Infinity }} />
      </motion.div>
      <div className="relative z-10 flex h-full items-center px-[7vw]">
        <div className="w-[37vw] pt-[4vh]">
          <motion.p className="mb-[1.6vh] text-[1.02vw] font-semibold" style={{ color: 'var(--sun)' }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>Porta Mascota Clásico</motion.p>
          <motion.h2 className="font-display text-[5vw] font-semibold leading-[.91] tracking-[-.055em]" style={{ color: 'var(--paper)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .72 }}>Cerca de ti,<br /><span style={{ color: 'var(--coral)' }}>cada día.</span></motion.h2>
          <motion.div className="caption-card mt-[4vh] w-[22vw] px-[1.2vw] py-[1vw]" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .9, duration: .5 }}><div className="flex items-center gap-[.6vw] text-[.86vw] font-bold" style={{ color: 'var(--paper)' }}><ShieldCheck style={{ width: '1.25vw', color: 'var(--teal)' }} /> Manos libres y seguro</div><div className="mt-[.65vh] text-[.78vw] leading-[1.3]" style={{ color: 'rgba(250,248,244,.64)' }}>Cómodo y práctico para paseos y viajes.</div></motion.div>
          <motion.div className="mt-[2.5vh] inline-flex items-center gap-[.5vw] rounded-full px-[1vw] py-[.6vw] text-[.85vw] font-bold" style={{ background: 'var(--coral)', color: 'var(--paper)' }} initial={{ opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.25, type: 'spring', stiffness: 260, damping: 22 }}>Ver el modelo <ArrowUpRight style={{ width: '1vw' }} /></motion.div>
        </div>
      </div>
    </motion.section>
  );
}