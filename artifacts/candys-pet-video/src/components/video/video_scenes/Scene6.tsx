import { motion } from 'framer-motion';
import { ArrowRight, Check, MousePointer2 } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene6() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(100% 0 0 0)' }} transition={{ duration: .8, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--ink)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 78% 18%, rgba(237,23,107,.3), transparent 35%), linear-gradient(120deg, #11131d, #25222e)' }} />
      <div className="absolute left-[7vw] top-[6vh] text-[.85vw] tiny-caps" style={{ color: 'rgba(250,248,244,.66)' }}>05 / Compra fácil</div>
      <motion.div className="capture-frame absolute right-[7vw] top-[10vh] h-[80vh] w-[75vw] rotate-[-1deg]" initial={{ opacity: 0, scale: 1.1, x: 42 }} animate={{ opacity: .86, scale: 1, x: 0 }} transition={{ delay: .2, duration: 1, ease: [0.16, 1, .3, 1] }}>
        <motion.img src={`${base}site-captures/contact-real.jpg`} alt="Captura real de la sección de contacto de Candy's Pet" className="h-full w-full object-cover" animate={{ scale: [1.02, 1.07, 1.02], x: ['0%', '-1%', '0%'] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(17,19,29,.95), rgba(17,19,29,.57) 42%, rgba(17,19,29,.12) 79%)' }} />
        <motion.div className="focus-ring absolute left-[52%] top-[58%] h-[12%] w-[37%]" animate={{ opacity: [0, 1, 1, 0], scale: [1.04, 1, 1, 1.02] }} transition={{ delay: .7, duration: 4.1, repeat: Infinity }} />
        <motion.div className="site-cursor absolute left-[70%] top-[66%] text-[2vw]" style={{ color: 'var(--coral)' }} animate={{ opacity: [0, 1, 1, 0], x: [0, 12, 12, 0] }} transition={{ delay: .95, duration: 4, repeat: Infinity }}><MousePointer2 fill="currentColor" /></motion.div>
      </motion.div>
      <div className="relative z-10 flex h-full items-center px-[7vw]">
        <div className="w-[37vw] pt-[4vh]">
          <motion.p className="mb-[1.5vh] text-[1.02vw] font-semibold" style={{ color: 'var(--sun)' }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>Comprar es muy fácil</motion.p>
          <motion.h2 className="font-display text-[4.9vw] font-semibold leading-[.91] tracking-[-.055em]" style={{ color: 'var(--paper)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .72 }}>Elige.<br /><span style={{ color: 'var(--coral)' }}>Consulta.</span></motion.h2>
          <motion.div className="caption-card mt-[3.6vh] w-[24vw] space-y-[1.1vh] px-[1.2vw] py-[1vw]" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .88, duration: .5 }}><div className="flex items-center gap-[.65vw] text-[.86vw] font-semibold" style={{ color: 'var(--paper)' }}><Check style={{ width: '1.1vw', color: 'var(--teal)' }} />Entra a candyspet.cl</div><div className="flex items-center gap-[.65vw] text-[.86vw] font-semibold" style={{ color: 'var(--paper)' }}><Check style={{ width: '1.1vw', color: 'var(--teal)' }} />Elige modelo, talla y color</div><div className="flex items-center gap-[.65vw] text-[.86vw] font-semibold" style={{ color: 'var(--paper)' }}><Check style={{ width: '1.1vw', color: 'var(--teal)' }} />Pregunta por WhatsApp si necesitas ayuda</div></motion.div>
          <motion.div className="mt-[2.4vh] inline-flex items-center gap-[.5vw] text-[.85vw] font-semibold" style={{ color: 'var(--paper)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>Te ayudamos a elegir <ArrowRight style={{ width: '1vw', color: 'var(--coral)' }} /></motion.div>
        </div>
      </div>
    </motion.section>
  );
}