import { motion } from 'framer-motion';
import { ArrowRight, Check, MousePointer2 } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene6() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(100% 0 0 0)' }} transition={{ duration: .8, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--ink)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 78% 18%, rgba(237,23,107,.3), transparent 35%), linear-gradient(145deg, #11131d, #25222e)' }} />
      <div className="absolute tiny-caps" style={{ left: '8cqw', top: '4.8cqh', color: 'rgba(250,248,244,.66)', fontSize: '2.5cqw' }}>05 / Compra fácil</div>
      <motion.div className="capture-frame" style={{ left: '7cqw', top: '15cqh', width: '86cqw', height: '36cqh', transform: 'rotate(-1deg)' }} initial={{ opacity: 0, scale: 1.1, y: 42 }} animate={{ opacity: .88, scale: 1, y: 0 }} transition={{ delay: .2, duration: 1, ease: [0.16, 1, .3, 1] }}>
        <motion.img src={`${base}site-captures/contact-real.jpg`} alt="Captura real de la sección de contacto de Candy's Pet" animate={{ scale: [1.02, 1.07, 1.02], x: ['0%', '-1%', '0%'] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(17,19,29,.03), rgba(17,19,29,.28))' }} />
        <motion.div className="focus-ring absolute" style={{ left: '52%', top: '58%', width: '37%', height: '12%' }} animate={{ opacity: [0, 1, 1, 0], scale: [1.04, 1, 1, 1.02] }} transition={{ delay: .7, duration: 4.1, repeat: Infinity }} />
        <motion.div className="site-cursor absolute" style={{ left: '70%', top: '66%', color: 'var(--coral)', fontSize: '6cqw' }} animate={{ opacity: [0, 1, 1, 0], x: [0, 12, 12, 0] }} transition={{ delay: .95, duration: 4, repeat: Infinity }}><MousePointer2 fill="currentColor" /></motion.div>
      </motion.div>
      <div className="relative z-10 flex h-full flex-col justify-end" style={{ padding: '0 8cqw 9cqh' }}>
        <motion.p style={{ marginBottom: '1.5cqh', color: 'var(--sun)', fontSize: '3.5cqw', fontWeight: 700 }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>Comprar es muy fácil</motion.p>
        <motion.h2 className="font-display font-semibold leading-[.91] tracking-[-.055em]" style={{ color: 'var(--paper)', fontSize: '11.8cqw' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .38, duration: .72 }}>Elige.<br /><span style={{ color: 'var(--coral)' }}>Consulta.</span></motion.h2>
        <motion.div className="caption-card space-y-[1.1cqh]" style={{ marginTop: '3cqh', width: '84cqw', padding: '3cqw' }} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .88, duration: .5 }}>
          <div className="flex items-center gap-[2cqw] font-semibold" style={{ color: 'var(--paper)', fontSize: '3.4cqw' }}><Check style={{ width: '4cqw', color: 'var(--teal)' }} />Entra a candyspet.cl</div>
          <div className="flex items-center gap-[2cqw] font-semibold" style={{ color: 'var(--paper)', fontSize: '3.4cqw' }}><Check style={{ width: '4cqw', color: 'var(--teal)' }} />Elige modelo, talla y color</div>
          <div className="flex items-center gap-[2cqw] font-semibold" style={{ color: 'var(--paper)', fontSize: '3.4cqw' }}><Check style={{ width: '4cqw', color: 'var(--teal)' }} />Pregunta por WhatsApp si necesitas ayuda</div>
        </motion.div>
        <motion.div className="flex items-center gap-[1.5cqw] font-semibold" style={{ marginTop: '2cqh', color: 'var(--paper)', fontSize: '3.2cqw' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>Te ayudamos a elegir <ArrowRight style={{ width: '4cqw', color: 'var(--coral)' }} /></motion.div>
      </div>
    </motion.section>
  );
}