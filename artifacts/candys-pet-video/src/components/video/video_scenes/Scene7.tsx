import { motion } from 'framer-motion';
import { Heart, MapPin, PawPrint } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene7() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'circle(0% at 50% 50%)' }} animate={{ clipPath: 'circle(150% at 50% 50%)' }} exit={{ clipPath: 'circle(0% at 50% 50%)' }} transition={{ duration: 1.1, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--coral)' }}>
      <img src={`${base}images/dog-in-sling.jpg`} alt="Compañero cerca en un porta mascota Candy's Pet" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(229,107,93,.98) 0%, rgba(229,107,93,.86) 42%, rgba(43,36,32,.48) 100%)' }} />
      <motion.div className="absolute -right-[16vw] -top-[22vw] h-[62vw] w-[62vw] rounded-full border-[.15vw]" style={{ borderColor: 'rgba(251,243,236,.4)' }} animate={{ rotate: [0, -10, 0], scale: [1, 1.04, 1] }} transition={{ duration: 8, repeat: Infinity }} />
      <div className="absolute left-[7vw] top-[6vh] text-[.95vw] tiny-caps" style={{ color: 'rgba(251,243,236,.78)' }}>06 / Siempre cerca</div>
      <div className="relative z-10 flex h-full items-center px-[10vw]">
        <div className="max-w-[60vw]">
          <motion.div className="mb-[2.6vh] flex items-center gap-[.8vw]" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .5 }}>
            <div className="flex h-[3.2vw] w-[3.2vw] items-center justify-center rounded-full" style={{ background: 'var(--paper)', color: 'var(--coral)' }}><PawPrint style={{ width: '1.7vw' }} fill="currentColor" /></div>
            <span className="font-display text-[2vw] font-semibold" style={{ color: 'var(--paper)' }}>Candy&apos;s <i style={{ color: 'var(--sun)' }}>Pet</i></span>
          </motion.div>
          <motion.h1 className="font-display text-[6.25vw] font-semibold leading-[.9] tracking-[-.06em]" style={{ color: 'var(--paper)' }} initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .42, duration: .85 }}>
            Lleva a tu<br /><span style={{ color: 'var(--sun)' }}>compañero</span><br />siempre cerca.
          </motion.h1>
          <motion.div className="mt-[4vh] flex items-center gap-[1.2vw]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25, duration: .6 }}>
            <div className="flex items-center gap-[.55vw] text-[1.05vw] font-semibold" style={{ color: 'var(--paper)' }}><MapPin style={{ width: '1.2vw', color: 'var(--sun)' }} /> Hecho a mano en Chile</div>
            <span className="h-[1.5vw] w-px" style={{ background: 'rgba(251,243,236,.4)' }} />
            <div className="flex items-center gap-[.55vw] text-[1.05vw] font-semibold" style={{ color: 'var(--paper)' }}><Heart style={{ width: '1.15vw', color: 'var(--sun)' }} fill="currentColor" /> Con cariño y dedicación</div>
          </motion.div>
          <motion.div className="mt-[5vh] inline-flex items-center gap-[.7vw] rounded-full px-[1.4vw] py-[.85vw] text-[1.05vw] font-bold" style={{ background: 'var(--paper)', color: 'var(--coral)' }} initial={{ opacity: 0, scale: .86 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.65, type: 'spring', stiffness: 280, damping: 22 }}>
            Visita candyspet.cl <span style={{ color: 'var(--ink)' }}>→</span>
          </motion.div>
        </div>
      </div>
      <motion.div className="absolute bottom-[5vh] right-[7vw] text-right" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>
        <div className="text-[.85vw] tiny-caps" style={{ color: 'rgba(251,243,236,.66)' }}>Porta mascotas · bandoleras · bolsos</div>
        <div className="mt-[.8vh] font-display text-[1.45vw]" style={{ color: 'var(--paper)' }}>Para perros y gatos.</div>
      </motion.div>
    </motion.section>
  );
}