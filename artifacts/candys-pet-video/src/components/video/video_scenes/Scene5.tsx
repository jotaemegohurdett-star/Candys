import { motion } from 'framer-motion';
import { Check, MousePointer2, Ruler } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene5() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} exit={{ clipPath: 'inset(0 0 0 100%)' }} transition={{ duration: .8, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--paper)' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, var(--paper), var(--aqua-wash))' }} />
      <div className="absolute tiny-caps" style={{ left: '8cqw', top: '4.8cqh', color: 'var(--muted)', fontSize: '2.5cqw' }}>04 / Elige tu talla</div>
      <motion.div className="capture-frame" style={{ left: '7cqw', top: '15cqh', width: '86cqw', height: '36cqh', transform: 'rotate(1deg)' }} initial={{ opacity: 0, scale: 1.12, y: 42 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: .2, duration: 1, ease: [0.16, 1, .3, 1] }}>
        <motion.img src={`${base}site-captures/size-guide-real.jpg`} alt="Captura real de la guía de tallas de Candy's Pet" animate={{ scale: [1.02, 1.07, 1.02], x: ['0%', '-1.2%', '0%'] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(250,248,244,.04), rgba(250,248,244,.24))' }} />
        <motion.div className="focus-ring absolute" style={{ left: '6%', top: '39%', width: '35%', height: '23%' }} animate={{ opacity: [0, 1, 1, 0], scale: [1.04, 1, 1, 1.02] }} transition={{ delay: .85, duration: 4.3, repeat: Infinity }} />
        <motion.div className="site-cursor absolute" style={{ left: '38%', top: '54%', color: 'var(--coral)', fontSize: '6cqw' }} animate={{ opacity: [0, 1, 1, 0], x: [0, 15, 15, 0] }} transition={{ delay: 1, duration: 4.1, repeat: Infinity }}><MousePointer2 fill="currentColor" /></motion.div>
      </motion.div>
      <div className="relative z-10 flex h-full flex-col justify-end" style={{ padding: '0 8cqw 10cqh' }}>
        <motion.p style={{ marginBottom: '1.6cqh', color: 'var(--coral)', fontSize: '3.5cqw', fontWeight: 700 }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>La talla correcta importa</motion.p>
        <motion.h2 className="font-display font-semibold leading-[.9] tracking-[-.055em]" style={{ color: 'var(--ink)', fontSize: '12cqw' }} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .72 }}>Mide.<br /><span style={{ color: 'var(--coral)' }}>Elige.</span></motion.h2>
        <motion.div className="space-y-[1.1cqh]" style={{ marginTop: '3cqh' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .88 }}>
          <div className="flex items-center gap-[2cqw] rounded-[2.2cqw] border px-[3cqw] py-[2.2cqw]" style={{ background: 'rgba(255,255,255,.68)', borderColor: 'var(--coral)' }}><Ruler style={{ width: '5cqw', color: 'var(--coral)' }} /><span className="font-bold" style={{ color: 'var(--ink)', fontSize: '3.5cqw' }}>Talla M</span><span style={{ color: 'var(--muted)', fontSize: '3cqw' }}>hasta 3,5 kg</span><Check className="ml-auto" style={{ width: '4cqw', color: 'var(--coral)' }} /></div>
          <div className="flex items-center gap-[2cqw] rounded-[2.2cqw] border px-[3cqw] py-[2.2cqw]" style={{ background: 'rgba(255,255,255,.68)', borderColor: 'rgba(17,19,29,.14)' }}><Ruler style={{ width: '5cqw', color: 'var(--teal)' }} /><span className="font-bold" style={{ color: 'var(--ink)', fontSize: '3.5cqw' }}>Talla L</span><span style={{ color: 'var(--muted)', fontSize: '3cqw' }}>hasta 10 kg</span><Check className="ml-auto" style={{ width: '4cqw', color: 'var(--teal)' }} /></div>
        </motion.div>
        <motion.p style={{ marginTop: '2.2cqh', color: 'var(--muted)', fontSize: '3.2cqw', lineHeight: 1.35 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35 }}>Puedes elegir entre distintos colores y tallas.</motion.p>
      </div>
    </motion.section>
  );
}