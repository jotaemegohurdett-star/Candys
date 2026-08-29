import { motion } from 'framer-motion';
import { Check, MapPin, ShieldCheck, Wind } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene2() {
  const points = ['Hechos a mano', 'Tela suave y transpirable', 'Seguridad para salir'];
  return (
    <motion.section
      className="absolute inset-0 overflow-hidden"
      initial={{ clipPath: 'circle(0% at 87% 50%)' }}
      animate={{ clipPath: 'circle(150% at 87% 50%)' }}
      exit={{ clipPath: 'circle(0% at 8% 50%)' }}
      transition={{ duration: 1, ease: [0.16, 1, .3, 1] }}
      style={{ background: 'var(--coral)' }}
    >
      <div className="absolute inset-y-0 right-0 w-[47%]" style={{ background: 'var(--paper)' }} />
      <motion.div className="absolute -left-[8vw] -bottom-[15vw] h-[38vw] w-[38vw] rounded-full border-[.15vw]" style={{ borderColor: 'rgba(251,243,236,.35)' }} animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} />
      <div className="absolute left-[7vw] top-[6vh] text-[.95vw] tiny-caps" style={{ color: 'rgba(251,243,236,.7)' }}>01 / La marca</div>

      <div className="relative z-10 flex h-full items-center px-[7vw]">
        <div className="w-[48%]">
          <motion.p className="mb-[2vh] text-[1.15vw] font-semibold" style={{ color: 'var(--paper)' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}>
            Conoce Candy&apos;s Pet
          </motion.p>
          <motion.h2 className="font-display text-[5.3vw] font-semibold leading-[.96] tracking-[-.05em]" style={{ color: 'var(--paper)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .7 }}>
            Cerca se<br /><span style={{ color: 'var(--sun)' }}>siente mejor.</span>
          </motion.h2>
          <div className="mt-[4vh] space-y-[1.7vh]">
            {points.map((point, index) => (
              <motion.div key={point} className="flex items-center gap-[.8vw] text-[1.15vw]" style={{ color: 'var(--paper)' }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .85 + index * .22, duration: .45 }}>
                <span className="flex h-[1.9vw] w-[1.9vw] items-center justify-center rounded-full" style={{ background: index === 1 ? 'var(--sun)' : 'rgba(251,243,236,.2)' }}><Check style={{ width: '1.05vw', color: index === 1 ? 'var(--ink)' : 'var(--paper)' }} strokeWidth={3} /></span>
                {point}
              </motion.div>
            ))}
          </div>
          <motion.div className="mt-[5vh] flex items-center gap-[1vw] text-[.95vw]" style={{ color: 'rgba(251,243,236,.78)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.65 }}>
            <MapPin style={{ width: '1.3vw' }} /> Chile, con dedicación
          </motion.div>
        </div>

        <motion.div className="absolute right-[8vw] top-[13vh] h-[67vh] w-[34vw] overflow-hidden rounded-[1.8vw] browser-shadow" initial={{ opacity: 0, x: 80, rotate: 3 }} animate={{ opacity: 1, x: 0, rotate: -3 }} transition={{ delay: .3, duration: 1, ease: [0.16, 1, .3, 1] }}>
          <img src={`${base}images/carrier-flatlay.jpg`} alt="Porta mascotas Candy's Pet hecho a mano" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(43,36,32,.02), rgba(43,36,32,.28))' }} />
          <div className="absolute left-[1.5vw] top-[1.5vw] rounded-full px-[.9vw] py-[.55vw] text-[.8vw] font-bold" style={{ background: 'var(--paper)', color: 'var(--coral)' }}>CANDY&apos;S PET / 2024</div>
          <motion.div className="absolute bottom-[2vw] right-[1.5vw] flex items-center gap-[.6vw] rounded-[.8vw] px-[1vw] py-[.8vw] text-[.85vw] font-semibold" style={{ background: 'var(--ink)', color: 'var(--paper)' }} animate={{ y: [0, -5, 0] }} transition={{ duration: 2.8, repeat: Infinity }}>
            <ShieldCheck style={{ width: '1.25vw', color: 'var(--sun)' }} /> Pensado para tu mascota
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}