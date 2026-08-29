import { motion } from 'framer-motion';
import { Check, MousePointer2, Ruler } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene5() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} exit={{ clipPath: 'inset(0 0 0 100%)' }} transition={{ duration: .8, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--paper)' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, var(--paper), var(--aqua-wash))' }} />
      <div className="absolute left-[7vw] top-[6vh] text-[.85vw] tiny-caps" style={{ color: 'var(--muted)' }}>04 / Elige tu talla</div>
      <motion.div className="capture-frame absolute right-[6vw] top-[11vh] h-[78vh] w-[76vw] rotate-[1deg]" initial={{ opacity: 0, scale: 1.12, x: 42 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: .2, duration: 1, ease: [0.16, 1, .3, 1] }}>
        <motion.img src={`${base}site-captures/size-guide-real.jpg`} alt="Captura real de la guía de tallas de Candy's Pet" className="h-full w-full object-cover" animate={{ scale: [1.02, 1.07, 1.02], x: ['0%', '-1.2%', '0%'] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(250,248,244,.92), rgba(250,248,244,.38) 37%, rgba(250,248,244,.04) 78%)' }} />
        <motion.div className="focus-ring absolute left-[6%] top-[39%] h-[23%] w-[35%]" animate={{ opacity: [0, 1, 1, 0], scale: [1.04, 1, 1, 1.02] }} transition={{ delay: .85, duration: 4.3, repeat: Infinity }} />
        <motion.div className="site-cursor absolute left-[38%] top-[54%] text-[2vw]" style={{ color: 'var(--coral)' }} animate={{ opacity: [0, 1, 1, 0], x: [0, 15, 15, 0] }} transition={{ delay: 1, duration: 4.1, repeat: Infinity }}><MousePointer2 fill="currentColor" /></motion.div>
      </motion.div>
      <div className="relative z-10 flex h-full items-center px-[7vw]">
        <div className="w-[36vw] pt-[5vh]">
          <motion.p className="mb-[1.6vh] text-[1vw] font-semibold" style={{ color: 'var(--coral)' }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>La talla correcta importa</motion.p>
          <motion.h2 className="font-display text-[5vw] font-semibold leading-[.9] tracking-[-.055em]" style={{ color: 'var(--ink)' }} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .72 }}>Mide.<br /><span style={{ color: 'var(--coral)' }}>Elige.</span></motion.h2>
          <motion.div className="mt-[3.5vh] space-y-[1.1vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .88 }}><div className="flex items-center gap-[.7vw] rounded-[.9vw] border px-[1vw] py-[.8vw]" style={{ background: 'rgba(255,255,255,.68)', borderColor: 'var(--coral)' }}><Ruler style={{ width: '1.35vw', color: 'var(--coral)' }} /><span className="text-[.95vw] font-bold" style={{ color: 'var(--ink)' }}>Talla M</span><span className="text-[.8vw]" style={{ color: 'var(--muted)' }}>hasta 3,5 kg</span><Check className="ml-auto" style={{ width: '1vw', color: 'var(--coral)' }} /></div><div className="flex items-center gap-[.7vw] rounded-[.9vw] border px-[1vw] py-[.8vw]" style={{ background: 'rgba(255,255,255,.68)', borderColor: 'rgba(17,19,29,.14)' }}><Ruler style={{ width: '1.35vw', color: 'var(--teal)' }} /><span className="text-[.95vw] font-bold" style={{ color: 'var(--ink)' }}>Talla L</span><span className="text-[.8vw]" style={{ color: 'var(--muted)' }}>hasta 10 kg</span><Check className="ml-auto" style={{ width: '1vw', color: 'var(--teal)' }} /></div></motion.div>
          <motion.p className="mt-[2.5vh] text-[.9vw] leading-[1.35]" style={{ color: 'var(--muted)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35 }}>Puedes elegir entre distintos colores y tallas.</motion.p>
        </div>
      </div>
    </motion.section>
  );
}