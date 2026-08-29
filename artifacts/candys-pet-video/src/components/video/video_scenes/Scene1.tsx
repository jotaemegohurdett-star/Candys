import { motion } from 'framer-motion';
import { ArrowDownRight, PawPrint } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene1() {
  return (
    <motion.section
      className="absolute inset-0 overflow-hidden"
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      exit={{ clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: 'var(--ink)' }}
    >
      <motion.div
        className="absolute -right-[12vw] -top-[20vw] h-[52vw] w-[52vw] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(237,23,107,.42), rgba(237,23,107,0) 67%)' }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 opacity-30" style={{ background: 'linear-gradient(105deg, rgba(17,19,29,.98) 0%, rgba(17,19,29,.76) 47%, rgba(17,19,29,.2) 100%)' }} />
      <div className="absolute left-[7vw] top-[6vh] z-20 flex items-center gap-[.7vw]">
        <div className="flex h-[3vw] w-[3vw] items-center justify-center rounded-full" style={{ background: 'var(--coral)', color: 'var(--paper)' }}>
          <PawPrint style={{ width: '1.45vw', height: '1.45vw' }} fill="currentColor" />
        </div>
        <span className="font-display text-[1.8vw] font-semibold" style={{ color: 'var(--paper)' }}>
          Candy&apos;s <i style={{ color: 'var(--coral)' }}>Pet</i>
        </span>
      </div>

      <motion.div
        className="capture-frame right-[7vw] top-[10vh] h-[80vh] w-[75vw] rotate-[1.2deg]"
        initial={{ opacity: 0, scale: 1.13, x: 5, y: 10 }}
        animate={{ opacity: 0.72, scale: 1.04, x: 0, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={`${base}site-captures/home-real.jpg`}
          alt="Captura real de la página de inicio de Candy's Pet"
          className="h-full w-full object-cover"
          animate={{ scale: [1.04, 1.09, 1.04], x: ['0%', '-1.5%', '0%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(17,19,29,.86), rgba(17,19,29,.18) 72%)' }} />
      </motion.div>

      <div className="relative z-10 flex h-full items-center px-[7vw]">
        <div className="w-[43vw] pt-[4vh]">
          <motion.p className="tiny-caps mb-[2.2vh] text-[.9vw]" style={{ color: 'var(--coral)' }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .4 }}>
            Una nueva forma de salir
          </motion.p>
          <motion.h1 className="font-display text-[5.4vw] font-semibold leading-[.93] tracking-[-.055em]" style={{ color: 'var(--paper)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .75, ease: [0.16, 1, .3, 1] }}>
            Tu mascota,<br /><span style={{ color: 'var(--coral)' }}>siempre cerca.</span>
          </motion.h1>
          <motion.p className="mt-[3vh] max-w-[28vw] text-[1.22vw] leading-[1.4]" style={{ color: 'rgba(250,248,244,.72)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .95, duration: .65 }}>
            Cómoda, segura y con estilo. Conoce Candy&apos;s Pet, una tienda chilena de porta mascotas tipo banano.
          </motion.p>
          <motion.div className="mt-[4.2vh] flex items-center gap-[.8vw] text-[.9vw] font-semibold" style={{ color: 'var(--paper)' }} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.35, duration: .5 }}>
            <span className="flex h-[2.5vw] w-[2.5vw] items-center justify-center rounded-full border" style={{ borderColor: 'rgba(250,248,244,.7)' }}><ArrowDownRight style={{ width: '1.1vw' }} /></span>
            Hecho a mano en Chile
          </motion.div>
        </div>
      </div>
      <motion.div className="caption-card absolute bottom-[6vh] right-[7vw] z-20 max-w-[28vw] px-[1.3vw] py-[.85vw]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: .55 }}>
        <div className="text-[.7vw] font-bold uppercase tracking-[.18em]" style={{ color: 'var(--coral)' }}>Candy&apos;s Pet</div>
        <div className="mt-[.35vh] text-[1vw] leading-tight" style={{ color: 'var(--paper)' }}>Porta mascotas para perros y gatos</div>
      </motion.div>
    </motion.section>
  );
}