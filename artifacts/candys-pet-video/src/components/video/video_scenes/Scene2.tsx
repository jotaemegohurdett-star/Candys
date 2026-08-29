import { motion } from 'framer-motion';
import { Check, MousePointer2 } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene2() {
  const points = ['Porta Mascota Clásico', 'Bomber Café', 'Unisex'];
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'circle(0% at 87% 50%)' }} animate={{ clipPath: 'circle(150% at 87% 50%)' }} exit={{ clipPath: 'circle(0% at 8% 50%)' }} transition={{ duration: .85, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--paper)' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(115deg, var(--rose-wash), var(--paper) 48%, var(--aqua-wash))' }} />
      <div className="absolute left-[7vw] top-[6vh] text-[.85vw] tiny-caps" style={{ color: 'var(--muted)' }}>01 / El catálogo</div>
      <motion.div className="capture-frame absolute right-[7vw] top-[11vh] h-[78vh] w-[76vw] rotate-[-1.4deg]" initial={{ opacity: 0, x: 60, scale: 1.08 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: .2, duration: 1, ease: [0.16, 1, .3, 1] }}>
        <motion.img src={`${base}site-captures/catalog-real.jpg`} alt="Captura real del catálogo de Candy's Pet" className="h-full w-full object-cover" animate={{ scale: [1.02, 1.07, 1.02], x: ['0%', '-2%', '0%'] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(17,19,29,.95) 0%, rgba(17,19,29,.67) 32%, rgba(17,19,29,.04) 78%)' }} />
        <motion.div className="focus-ring absolute left-[5%] top-[35%] h-[57%] w-[20%]" animate={{ opacity: [0, 1, 1, 0], scale: [1.04, 1, 1, 1.03] }} transition={{ delay: .8, duration: 3.6, repeat: Infinity }} />
        <motion.div className="site-cursor absolute left-[25%] top-[51%] text-[2.1vw]" style={{ color: 'var(--coral)' }} animate={{ x: [0, 18, 18, 0], y: [0, 8, 8, 0], opacity: [0, 1, 1, 0] }} transition={{ delay: .9, duration: 3.6, repeat: Infinity }}><MousePointer2 fill="currentColor" /></motion.div>
      </motion.div>
      <div className="relative z-10 flex h-full items-center px-[7vw]">
        <div className="w-[37vw]">
          <motion.p className="mb-[2vh] text-[1.05vw] font-semibold" style={{ color: 'var(--coral)' }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}>Conoce Candy&apos;s Pet</motion.p>
          <motion.h2 className="font-display text-[4.7vw] font-semibold leading-[.94] tracking-[-.05em]" style={{ color: 'var(--ink)' }} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .34, duration: .7 }}>Tres modelos<br /><span style={{ color: 'var(--coral)' }}>para elegir.</span></motion.h2>
          <div className="mt-[4vh] space-y-[1.5vh]">
            {points.map((point, index) => <motion.div key={point} className="flex items-center gap-[.8vw] text-[1.08vw]" style={{ color: 'var(--ink)' }} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .75 + index * .18, duration: .42 }}><span className="flex h-[1.8vw] w-[1.8vw] items-center justify-center rounded-full" style={{ background: index === 1 ? 'var(--teal)' : 'var(--ink)', color: 'var(--paper)' }}><Check style={{ width: '1vw' }} strokeWidth={3} /></span>{point}</motion.div>)}
          </div>
        </div>
      </div>
    </motion.section>
  );
}