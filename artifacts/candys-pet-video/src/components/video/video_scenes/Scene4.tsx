import { motion } from 'framer-motion';
import { BusFront, HeartPulse, Plane, ShieldCheck } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene4() {
  const uses = [
    { icon: BusFront, title: 'Transporte público', text: 'Manos libres, sin apuros.' },
    { icon: Plane, title: 'Paseos y viajes', text: 'Tu compañero va contigo.' },
    { icon: HeartPulse, title: 'Mascotas senior', text: 'Más cerca, más tranquilos.' },
  ];
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'polygon(100% 0,100% 0,100% 100%,100% 100%)' }} animate={{ clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)' }} exit={{ clipPath: 'polygon(0 0,0 0,0 100%,0 100%)' }} transition={{ duration: .9, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--teal)' }}>
      <motion.div className="absolute -right-[9vw] -top-[11vw] h-[45vw] w-[45vw] rounded-full border-[.15vw]" style={{ borderColor: 'rgba(251,243,236,.35)' }} animate={{ rotate: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity }} />
      <div className="absolute left-[7vw] top-[6vh] text-[.95vw] tiny-caps" style={{ color: 'rgba(251,243,236,.72)' }}>03 / El día a día</div>
      <div className="relative z-10 flex h-full items-center px-[7vw]">
        <div className="w-[46%]">
          <motion.p className="mb-[1.5vh] text-[1.1vw] font-semibold" style={{ color: 'var(--sun)' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .28 }}>Libertad para ambos</motion.p>
          <motion.h2 className="font-display text-[5.25vw] font-semibold leading-[.92] tracking-[-.05em]" style={{ color: 'var(--paper)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .42, duration: .75 }}>Paseos sin<br /><span style={{ color: 'var(--sun)' }}>complicaciones.</span></motion.h2>
          <div className="mt-[4.5vh] space-y-[1.35vh]">
            {uses.map(({ icon: Icon, title, text }, index) => (
              <motion.div key={title} className="flex items-center gap-[1vw] rounded-[.9vw] px-[1vw] py-[1.1vw]" style={{ background: index === 1 ? 'rgba(251,243,236,.15)' : 'rgba(251,243,236,.08)' }} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .85 + index * .2, duration: .5 }}>
                <div className="flex h-[2.8vw] w-[2.8vw] items-center justify-center rounded-[.7vw]" style={{ background: index === 1 ? 'var(--sun)' : 'rgba(251,243,236,.2)', color: index === 1 ? 'var(--ink)' : 'var(--paper)' }}><Icon style={{ width: '1.4vw' }} /></div>
                <div><div className="text-[1.05vw] font-semibold" style={{ color: 'var(--paper)' }}>{title}</div><div className="mt-[.25vh] text-[.8vw]" style={{ color: 'rgba(251,243,236,.64)' }}>{text}</div></div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div className="absolute right-[9vw] top-[16vh] h-[59vh] w-[33vw] rotate-[3deg] overflow-hidden rounded-[1.7vw] browser-shadow" initial={{ opacity: 0, scale: .84, rotate: 10 }} animate={{ opacity: 1, scale: 1, rotate: 3 }} transition={{ delay: .3, duration: 1.1, ease: [0.16, 1, .3, 1] }}>
          <img src={`${base}images/happy-tiny-dog.jpg`} alt="Perro feliz en Candy's Pet" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(43,36,32,0), rgba(43,36,32,.35))' }} />
          <motion.div className="absolute bottom-[2vw] left-[1.5vw] flex items-center gap-[.65vw] rounded-full px-[1vw] py-[.65vw] text-[.85vw] font-semibold" style={{ background: 'var(--paper)', color: 'var(--ink)' }} animate={{ y: [0, -7, 0] }} transition={{ duration: 3.1, repeat: Infinity }}><ShieldCheck style={{ width: '1.2vw', color: 'var(--teal)' }} /> Cómodo y seguro</motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}