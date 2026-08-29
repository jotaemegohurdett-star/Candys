import { motion } from 'framer-motion';
import { ArrowDownRight, Heart, PawPrint } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene1() {
  return (
    <motion.section
      className="absolute inset-0 overflow-hidden"
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      exit={{ clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: 'var(--paper)' }}
    >
      <div className="absolute inset-0 paper-grid opacity-70" />
      <motion.div className="absolute -right-[11vw] -top-[15vw] h-[48vw] w-[48vw] rounded-full" style={{ background: 'var(--sun)' }} animate={{ rotate: [0, 8, 0], scale: [1, 1.05, 1] }} transition={{ duration: 7, repeat: Infinity }} />
      <motion.div className="absolute -bottom-[21vw] -left-[11vw] h-[40vw] w-[40vw] rounded-full" style={{ background: 'var(--teal)', opacity: .18 }} animate={{ x: [0, 20, 0], y: [0, -16, 0] }} transition={{ duration: 6, repeat: Infinity }} />

      <div className="absolute left-[7vw] top-[6vh] z-20 flex items-center gap-[.8vw]">
        <div className="flex h-[3.2vw] w-[3.2vw] items-center justify-center rounded-full" style={{ background: 'var(--coral)', color: 'var(--paper)' }}>
          <PawPrint style={{ width: '1.6vw', height: '1.6vw' }} fill="currentColor" />
        </div>
        <span className="font-display text-[2vw] font-semibold" style={{ color: 'var(--ink)' }}>Candy&apos;s <i style={{ color: 'var(--coral)' }}>Pet</i></span>
      </div>

      <div className="relative z-10 flex h-full items-center px-[7vw]">
        <div className="w-[48%] pt-[3vh]">
          <motion.p className="tiny-caps mb-[2.5vh] text-[1vw]" style={{ color: 'var(--coral)' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .45 }}>
            Una nueva forma de salir
          </motion.p>
          <motion.h1 className="font-display text-[6.3vw] font-semibold leading-[.93] tracking-[-.055em]" style={{ color: 'var(--ink)' }} initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .48, duration: .8, ease: [0.16, 1, .3, 1] }}>
            ¿Tu mascota<br /><span style={{ color: 'var(--coral)' }}>siempre cerca?</span>
          </motion.h1>
          <motion.p className="mt-[3.5vh] max-w-[29vw] text-[1.45vw] leading-[1.35]" style={{ color: 'var(--muted)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15, duration: .7 }}>
            Cómoda, segura y con estilo.
          </motion.p>
          <motion.div className="mt-[5vh] flex items-center gap-[1vw] text-[1vw] font-semibold" style={{ color: 'var(--ink)' }} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.55, duration: .55 }}>
            <span className="flex h-[2.8vw] w-[2.8vw] items-center justify-center rounded-full border" style={{ borderColor: 'var(--ink)' }}><ArrowDownRight style={{ width: '1.2vw' }} /></span>
            Descubre la diferencia
          </motion.div>
        </div>

        <motion.div className="absolute right-[9vw] top-[16vh] h-[62vh] w-[34vw] rotate-[4deg] overflow-hidden rounded-[2.2vw] soft-shadow" initial={{ opacity: 0, scale: .84, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 4 }} transition={{ delay: .3, duration: 1.1, ease: [0.16, 1, .3, 1] }}>
          <img src={`${base}images/dog-in-sling.jpg`} alt="Perro pequeño en porta mascota Candy's Pet" className="h-full w-full object-cover" style={{ objectPosition: 'center' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(155deg, rgba(43,36,32,.04), rgba(43,36,32,.42))' }} />
          <motion.div className="absolute bottom-[3vh] left-[2vw] flex items-center gap-[.7vw] rounded-full px-[1vw] py-[.7vw] text-[.95vw] font-semibold" style={{ background: 'var(--paper)', color: 'var(--ink)' }} animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
            <Heart style={{ width: '1.2vw', color: 'var(--coral)' }} fill="currentColor" /> Manos libres
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-[5vh] right-[6vw] z-20 text-right">
        <div className="font-display text-[1.5vw] font-semibold" style={{ color: 'var(--ink)' }}>PASEOS · VIAJES · CARIÑO</div>
        <div className="mt-[.7vh] text-[.85vw] tiny-caps" style={{ color: 'var(--muted)' }}>Hecho a mano en Chile</div>
      </div>
    </motion.section>
  );
}