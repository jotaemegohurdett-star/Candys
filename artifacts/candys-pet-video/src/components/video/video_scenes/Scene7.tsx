import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, PawPrint } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene7() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'circle(0% at 50% 50%)' }} animate={{ clipPath: 'circle(150% at 50% 50%)' }} exit={{ clipPath: 'circle(0% at 50% 50%)' }} transition={{ duration: 1, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--ink)' }}>
      <motion.div className="capture-frame absolute inset-[7vh_6vw]" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: .72, scale: 1.03 }} transition={{ duration: 1.1, ease: [0.16, 1, .3, 1] }}>
        <motion.img src={`${base}site-captures/unisex-real.jpg`} alt="Captura real del producto Porta Mascota Tipo Banano Unisex" className="h-full w-full object-cover" animate={{ scale: [1.03, 1.08, 1.03], x: ['0%', '-1%', '0%'] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(17,19,29,.95), rgba(17,19,29,.7) 45%, rgba(17,19,29,.2))' }} />
      </motion.div>
      <div className="absolute left-[7vw] top-[6vh] text-[.85vw] tiny-caps" style={{ color: 'rgba(250,248,244,.72)' }}>06 / Siempre cerca</div>
      <div className="relative z-10 flex h-full items-center px-[10vw]">
        <div className="max-w-[54vw] pt-[3vh]">
          <motion.div className="mb-[2.4vh] flex items-center gap-[.7vw]" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24, duration: .45 }}><div className="flex h-[3vw] w-[3vw] items-center justify-center rounded-full" style={{ background: 'var(--coral)', color: 'var(--paper)' }}><PawPrint style={{ width: '1.5vw' }} fill="currentColor" /></div><span className="font-display text-[1.8vw] font-semibold" style={{ color: 'var(--paper)' }}>Candy&apos;s <i style={{ color: 'var(--coral)' }}>Pet</i></span></motion.div>
          <motion.h1 className="font-display text-[5.6vw] font-semibold leading-[.9] tracking-[-.06em]" style={{ color: 'var(--paper)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .78 }}>Lleva a tu<br /><span style={{ color: 'var(--coral)' }}>compañero</span><br />siempre cerca.</motion.h1>
          <motion.div className="mt-[3.2vh] flex items-center gap-[1.1vw]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: .55 }}><div className="flex items-center gap-[.5vw] text-[.92vw]" style={{ color: 'var(--paper)' }}><Heart style={{ width: '1.05vw', color: 'var(--coral)' }} fill="currentColor" /> Hecho a mano en Chile</div><span className="h-[1.4vw] w-px" style={{ background: 'rgba(250,248,244,.36)' }} /><div className="text-[.92vw]" style={{ color: 'var(--paper)' }}>Con cariño y dedicación</div></motion.div>
          <motion.div className="mt-[4vh] inline-flex items-center gap-[.6vw] rounded-full px-[1.3vw] py-[.8vw] text-[1vw] font-bold" style={{ background: 'var(--coral)', color: 'var(--paper)' }} initial={{ opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.42, type: 'spring', stiffness: 260, damping: 22 }}>Visita candyspet.cl <ArrowUpRight style={{ width: '1.1vw' }} /></motion.div>
        </div>
      </div>
      <motion.div className="absolute bottom-[6vh] right-[7vw] text-right" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}><div className="text-[.78vw] tiny-caps" style={{ color: 'rgba(250,248,244,.62)' }}>Porta mascotas · bandoleras · bolsos</div><div className="mt-[.7vh] font-display text-[1.28vw]" style={{ color: 'var(--paper)' }}>Para perros y gatos.</div></motion.div>
    </motion.section>
  );
}