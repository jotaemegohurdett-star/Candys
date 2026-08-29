import { motion } from 'framer-motion';
import { Check, MousePointer2 } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene2() {
  const points = ['Porta Mascota Clásico', 'Bomber Café', 'Unisex'];
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'circle(0% at 50% 24%)' }} animate={{ clipPath: 'circle(150% at 50% 24%)' }} exit={{ clipPath: 'circle(0% at 50% 78%)' }} transition={{ duration: .85, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--paper)' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, var(--rose-wash), var(--paper) 45%, var(--aqua-wash))' }} />
      <div className="absolute tiny-caps" style={{ left: '8cqw', top: '4.8cqh', color: 'var(--muted)', fontSize: '2.5cqw' }}>01 / El catálogo</div>
      <motion.div className="capture-frame" style={{ left: '7cqw', top: '15cqh', width: '86cqw', height: '36cqh', transform: 'rotate(-1.4deg)' }} initial={{ opacity: 0, y: 45, scale: 1.08 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: .2, duration: 1, ease: [0.16, 1, .3, 1] }}>
        <motion.img src={`${base}site-captures/catalog-real.jpg`} alt="Captura real del catálogo de Candy's Pet" animate={{ scale: [1.02, 1.06, 1.02], x: ['0%', '-2%', '0%'] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(17,19,29,.03), rgba(17,19,29,.18))' }} />
        <motion.div className="focus-ring absolute" style={{ left: '9%', top: '20%', width: '25%', height: '60%' }} animate={{ opacity: [0, 1, 1, 0], scale: [1.04, 1, 1, 1.03] }} transition={{ delay: .8, duration: 3.6, repeat: Infinity }} />
        <motion.div className="site-cursor absolute" style={{ left: '31%', top: '52%', color: 'var(--coral)', fontSize: '6cqw' }} animate={{ x: [0, 18, 18, 0], y: [0, 8, 8, 0], opacity: [0, 1, 1, 0] }} transition={{ delay: .9, duration: 3.6, repeat: Infinity }}><MousePointer2 fill="currentColor" /></motion.div>
      </motion.div>
      <div className="relative z-10 flex h-full flex-col justify-end" style={{ padding: '0 8cqw 10cqh' }}>
        <motion.p style={{ marginBottom: '2cqh', color: 'var(--coral)', fontSize: '3.4cqw', fontWeight: 700 }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}>Conoce Candy&apos;s Pet</motion.p>
        <motion.h2 className="font-display font-semibold leading-[.92] tracking-[-.05em]" style={{ color: 'var(--ink)', fontSize: '11.5cqw' }} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .34, duration: .7 }}>Tres modelos<br /><span style={{ color: 'var(--coral)' }}>para elegir.</span></motion.h2>
        <div className="space-y-[1.2cqh]" style={{ marginTop: '3.2cqh' }}>
          {points.map((point, index) => <motion.div key={point} className="flex items-center gap-[2cqw] font-semibold" style={{ color: 'var(--ink)', fontSize: '3.6cqw' }} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .75 + index * .18, duration: .42 }}><span className="flex items-center justify-center rounded-full" style={{ width: '6cqw', height: '6cqw', background: index === 1 ? 'var(--teal)' : 'var(--ink)', color: 'var(--paper)' }}><Check style={{ width: '3.2cqw' }} strokeWidth={3} /></span>{point}</motion.div>)}
        </div>
      </div>
    </motion.section>
  );
}