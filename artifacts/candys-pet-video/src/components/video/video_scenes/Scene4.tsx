import { motion } from 'framer-motion';
import { Check, Palette } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene4() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'polygon(100% 0,100% 0,100% 100%,100% 100%)' }} animate={{ clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)' }} exit={{ clipPath: 'polygon(0 0,0 0,0 100%,0 100%)' }} transition={{ duration: .8, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--paper)' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, var(--aqua-wash), var(--paper) 53%, var(--rose-wash))' }} />
      <div className="absolute left-[7vw] top-[6vh] text-[.85vw] tiny-caps" style={{ color: 'var(--muted)' }}>03 / Distintos estilos</div>
      <motion.div className="capture-frame absolute right-[7vw] top-[10vh] h-[80vh] w-[75vw] rotate-[1.1deg]" initial={{ opacity: 0, scale: 1.1, x: 42 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: .2, duration: 1, ease: [0.16, 1, .3, 1] }}>
        <motion.img src={`${base}site-captures/bomber-real.jpg`} alt="Captura real del producto Bomber Café" className="h-full w-full object-cover" animate={{ scale: [1.02, 1.075, 1.02], x: ['0%', '-1%', '0%'] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(17,19,29,.92), rgba(17,19,29,.38) 40%, rgba(17,19,29,.05) 76%)' }} />
        <motion.div className="focus-ring absolute left-[51%] top-[25%] h-[64%] w-[32%]" animate={{ opacity: [0, 1, 1, 0] }} transition={{ delay: .8, duration: 4, repeat: Infinity }} />
      </motion.div>
      <motion.div className="capture-frame absolute right-[10vw] bottom-[8vh] z-20 h-[23vh] w-[22vw] rotate-[-3deg]" initial={{ opacity: 0, y: 24, scale: .88 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.05, duration: .7 }}>
        <motion.img src={`${base}site-captures/unisex-real.jpg`} alt="Captura real del producto Unisex" className="h-full w-full object-cover" animate={{ scale: [1.03, 1.08, 1.03] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-x-0 bottom-0 px-[.7vw] py-[.55vw] text-[.72vw] font-bold" style={{ background: 'rgba(17,19,29,.84)', color: 'var(--paper)' }}>También: Unisex</div>
      </motion.div>
      <div className="relative z-10 flex h-full items-center px-[7vw]">
        <div className="w-[37vw] pt-[4vh]">
          <motion.p className="mb-[1.5vh] text-[1.02vw] font-semibold" style={{ color: 'var(--coral)' }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>Bomber Café</motion.p>
          <motion.h2 className="font-display text-[4.9vw] font-semibold leading-[.91] tracking-[-.055em]" style={{ color: 'var(--ink)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .72 }}>Tu estilo,<br /><span style={{ color: 'var(--coral)' }}>tu color.</span></motion.h2>
          <motion.p className="mt-[2.5vh] max-w-[21vw] text-[1vw] leading-[1.4]" style={{ color: 'var(--muted)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9, duration: .55 }}>Distintos colores y tallas para salir cómodo, seguro y con las manos libres.</motion.p>
          <motion.div className="mt-[2.8vh] space-y-[1vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}><div className="flex items-center gap-[.7vw] text-[.9vw]" style={{ color: 'var(--ink)' }}><span className="flex h-[1.7vw] w-[1.7vw] items-center justify-center rounded-full" style={{ background: 'var(--coral)', color: 'var(--paper)' }}><Check style={{ width: '1vw' }} /></span>Talla M · hasta 3,5 kilos</div><div className="flex items-center gap-[.7vw] text-[.9vw]" style={{ color: 'var(--ink)' }}><span className="flex h-[1.7vw] w-[1.7vw] items-center justify-center rounded-full" style={{ background: 'var(--teal)', color: 'var(--ink)' }}><Check style={{ width: '1vw' }} /></span>Talla L · hasta 10 kilos</div></motion.div>
          <motion.div className="mt-[2.2vh] flex items-center gap-[.55vw] text-[.82vw]" style={{ color: 'var(--muted)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.45 }}><Palette style={{ width: '1.1vw', color: 'var(--coral)' }} /> Para perros y gatos</motion.div>
        </div>
      </div>
    </motion.section>
  );
}