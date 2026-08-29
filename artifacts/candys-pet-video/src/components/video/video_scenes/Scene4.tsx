import { motion } from 'framer-motion';
import { Check, Palette } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene4() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'polygon(100% 0,100% 0,100% 100%,100% 100%)' }} animate={{ clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)' }} exit={{ clipPath: 'polygon(0 0,0 0,0 100%,0 100%)' }} transition={{ duration: .8, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--paper)' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, var(--aqua-wash), var(--paper) 48%, var(--rose-wash))' }} />
      <div className="absolute tiny-caps" style={{ left: '8cqw', top: '4.8cqh', color: 'var(--muted)', fontSize: '2.5cqw' }}>03 / Distintos estilos</div>
      <motion.div className="capture-frame" style={{ left: '7cqw', top: '15cqh', width: '86cqw', height: '36cqh', transform: 'rotate(1.1deg)' }} initial={{ opacity: 0, scale: 1.1, y: 42 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: .2, duration: 1, ease: [0.16, 1, .3, 1] }}>
        <motion.img src={`${base}site-captures/bomber-real.jpg`} alt="Captura real del producto Bomber Café" animate={{ scale: [1.02, 1.07, 1.02], x: ['0%', '-1%', '0%'] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(17,19,29,.03), rgba(17,19,29,.2))' }} />
        <motion.div className="focus-ring absolute" style={{ left: '51%', top: '23%', width: '32%', height: '64%' }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ delay: .8, duration: 4, repeat: Infinity }} />
      </motion.div>
      <motion.div className="capture-frame z-20" style={{ left: '60cqw', top: '46cqh', width: '32cqw', height: '12cqh', transform: 'rotate(-3deg)' }} initial={{ opacity: 0, y: 24, scale: .88 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.05, duration: .7 }}>
        <motion.img src={`${base}site-captures/unisex-real.jpg`} alt="Captura real del producto Unisex" animate={{ scale: [1.03, 1.08, 1.03] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-x-0 bottom-0 px-[2cqw] py-[1cqh] font-bold" style={{ background: 'rgba(17,19,29,.84)', color: 'var(--paper)', fontSize: '2.3cqw' }}>También: Unisex</div>
      </motion.div>
      <div className="relative z-10 flex h-full flex-col justify-end" style={{ padding: '0 8cqw 9cqh' }}>
        <motion.p style={{ marginBottom: '1.6cqh', color: 'var(--coral)', fontSize: '3.5cqw', fontWeight: 700 }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>Bomber Café</motion.p>
        <motion.h2 className="font-display font-semibold leading-[.91] tracking-[-.055em]" style={{ color: 'var(--ink)', fontSize: '11.8cqw' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .72 }}>Tu estilo,<br /><span style={{ color: 'var(--coral)' }}>tu color.</span></motion.h2>
        <motion.p className="max-w-[82cqw] leading-[1.35]" style={{ marginTop: '2.5cqh', color: 'var(--muted)', fontSize: '3.5cqw' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9, duration: .55 }}>Distintos colores y tallas para salir cómodo y con las manos libres.</motion.p>
        <motion.div className="space-y-[1cqh]" style={{ marginTop: '2.4cqh', color: 'var(--ink)', fontSize: '3.2cqw' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}>
          <div className="flex items-center gap-[2cqw]"><span className="flex items-center justify-center rounded-full" style={{ width: '6cqw', height: '6cqw', background: 'var(--coral)', color: 'var(--paper)' }}><Check style={{ width: '3cqw' }} /></span>Talla M · hasta 3,5 kilos</div>
          <div className="flex items-center gap-[2cqw]"><span className="flex items-center justify-center rounded-full" style={{ width: '6cqw', height: '6cqw', background: 'var(--teal)', color: 'var(--ink)' }}><Check style={{ width: '3cqw' }} /></span>Talla L · hasta 10 kilos</div>
        </motion.div>
        <motion.div className="flex items-center gap-[1.5cqw]" style={{ marginTop: '2cqh', color: 'var(--muted)', fontSize: '3cqw' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.45 }}><Palette style={{ width: '4cqw', color: 'var(--coral)' }} /> Para perros y gatos</motion.div>
      </div>
    </motion.section>
  );
}