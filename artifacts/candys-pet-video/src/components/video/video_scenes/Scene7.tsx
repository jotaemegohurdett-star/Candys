import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, PawPrint } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene7() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'circle(0% at 50% 50%)' }} animate={{ clipPath: 'circle(150% at 50% 50%)' }} exit={{ clipPath: 'circle(0% at 50% 50%)' }} transition={{ duration: 1, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--ink)' }}>
      <motion.div className="capture-frame" style={{ left: '7cqw', top: '15cqh', width: '86cqw', height: '36cqh', transform: 'rotate(-1deg)' }} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: .75, scale: 1.03 }} transition={{ duration: 1.1, ease: [0.16, 1, .3, 1] }}>
        <motion.img src={`${base}site-captures/unisex-real.jpg`} alt="Captura real del producto Porta Mascota Tipo Banano Unisex" animate={{ scale: [1.03, 1.08, 1.03], x: ['0%', '-1%', '0%'] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(17,19,29,.12), rgba(17,19,29,.78))' }} />
      </motion.div>
      <div className="absolute tiny-caps" style={{ left: '8cqw', top: '4.8cqh', color: 'rgba(250,248,244,.72)', fontSize: '2.5cqw' }}>06 / Siempre cerca</div>
      <div className="relative z-10 flex h-full flex-col justify-end" style={{ padding: '0 8cqw 10cqh' }}>
        <motion.div className="mb-[2.4cqh] flex items-center gap-[2cqw]" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24, duration: .45 }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: '8cqw', height: '8cqw', background: 'var(--coral)', color: 'var(--paper)' }}><PawPrint style={{ width: '4cqw' }} fill="currentColor" /></div>
          <span className="font-display font-semibold" style={{ color: 'var(--paper)', fontSize: '4.6cqw' }}>Candy&apos;s <i style={{ color: 'var(--coral)' }}>Pet</i></span>
        </motion.div>
        <motion.h1 className="font-display font-semibold leading-[.9] tracking-[-.06em]" style={{ color: 'var(--paper)', fontSize: '12.2cqw' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .78 }}>Lleva a tu<br /><span style={{ color: 'var(--coral)' }}>compañero</span><br />siempre cerca.</motion.h1>
        <motion.div className="flex items-center gap-[1.6cqw]" style={{ marginTop: '3cqh', color: 'var(--paper)', fontSize: '3.2cqw' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: .55 }}><Heart style={{ width: '4cqw', color: 'var(--coral)' }} fill="currentColor" /> Hecho a mano en Chile</motion.div>
        <motion.div className="inline-flex items-center gap-[1.5cqw] self-start rounded-full font-bold" style={{ marginTop: '3.2cqh', padding: '2.4cqw 3.4cqw', background: 'var(--coral)', color: 'var(--paper)', fontSize: '3.5cqw' }} initial={{ opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.42, type: 'spring', stiffness: 260, damping: 22 }}>Visita candyspet.cl <ArrowUpRight style={{ width: '4cqw' }} /></motion.div>
        <motion.div className="text-right" style={{ marginTop: '4cqh', color: 'rgba(250,248,244,.62)', fontSize: '2.5cqw' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>Porta mascotas · bandoleras · bolsos<br /><span className="font-display" style={{ color: 'var(--paper)', fontSize: '4cqw' }}>Para perros y gatos.</span></motion.div>
      </div>
    </motion.section>
  );
}