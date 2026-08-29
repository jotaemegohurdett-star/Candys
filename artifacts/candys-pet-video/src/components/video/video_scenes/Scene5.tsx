import { motion } from 'framer-motion';
import { Check, Palette, Ruler } from 'lucide-react';

const base = import.meta.env.BASE_URL;

export function Scene5() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} exit={{ clipPath: 'inset(0 0 0 100%)' }} transition={{ duration: .8, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--paper)' }}>
      <div className="absolute inset-0 paper-grid opacity-55" />
      <motion.img src={`${base}images/carrier-flatlay.jpg`} alt="" className="absolute -right-[5vw] -top-[8vw] h-[50vw] w-[50vw] rounded-full object-cover opacity-[.16]" animate={{ rotate: [0, 4, 0], scale: [1, 1.03, 1] }} transition={{ duration: 8, repeat: Infinity }} />
      <div className="absolute left-[7vw] top-[6vh] text-[.95vw] tiny-caps" style={{ color: 'var(--muted)' }}>04 / Ajuste perfecto</div>
      <div className="relative z-10 flex h-full items-center px-[7vw]">
        <div className="w-[43%]">
          <motion.p className="mb-[1.5vh] text-[1.1vw] font-semibold" style={{ color: 'var(--coral)' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>Tu talla, tu color</motion.p>
          <motion.h2 className="font-display text-[5vw] font-semibold leading-[.93] tracking-[-.05em]" style={{ color: 'var(--ink)' }} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4, duration: .7 }}>Elige cómo<br /><span style={{ color: 'var(--coral)' }}>llevarlo.</span></motion.h2>
          <motion.div className="mt-[4vh] flex gap-[.8vw]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }}>
            {['#E56B5D', '#4E8D86', '#F3B562', '#2B2420', '#B59B91'].map((color, index) => <span key={color} className="h-[2.1vw] w-[2.1vw] rounded-full border-[.18vw]" style={{ background: color, borderColor: index === 0 ? 'var(--ink)' : 'transparent', boxShadow: index === 0 ? '0 0 0 .25vw var(--paper), 0 0 0 .35vw var(--ink)' : undefined }} />)}
            <span className="ml-[.5vw] self-center text-[.85vw] font-semibold" style={{ color: 'var(--muted)' }}>colores disponibles</span>
          </motion.div>
          <div className="mt-[4vh] space-y-[1vh]">
            {[{ icon: Ruler, title: 'Talla M', text: 'Hasta 3,5 kilos' }, { icon: Ruler, title: 'Talla L', text: 'Hasta 10 kilos' }].map(({ icon: Icon, title, text }, index) => (
              <motion.div key={title} className="flex items-center gap-[1vw] rounded-[1vw] border px-[1.1vw] py-[1vw]" style={{ borderColor: index === 0 ? 'var(--coral)' : 'var(--line)', background: index === 0 ? 'rgba(229,107,93,.1)' : 'rgba(251,243,236,.72)' }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.05 + index * .2 }}>
                <Icon style={{ width: '1.35vw', color: index === 0 ? 'var(--coral)' : 'var(--teal)' }} />
                <div className="flex-1"><span className="text-[1.05vw] font-bold">{title}</span><span className="ml-[.7vw] text-[.85vw]" style={{ color: 'var(--muted)' }}>{text}</span></div>
                <Check style={{ width: '1.15vw', color: index === 0 ? 'var(--coral)' : 'var(--teal)' }} strokeWidth={3} />
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div className="absolute right-[10vw] top-[19vh] h-[56vh] w-[31vw] rotate-[-5deg] overflow-hidden rounded-[1.8vw] soft-shadow" initial={{ opacity: 0, x: 70, rotate: 2 }} animate={{ opacity: 1, x: 0, rotate: -5 }} transition={{ delay: .35, duration: 1, ease: [0.16, 1, .3, 1] }}>
          <img src={`${base}images/dog-in-sling.jpg`} alt="Porta mascota con perro pequeño" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(43,36,32,0), rgba(43,36,32,.38))' }} />
          <div className="absolute bottom-[2vw] left-[1.6vw] rounded-[.8vw] px-[1vw] py-[.8vw]" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
            <div className="flex items-center gap-[.55vw] text-[.78vw] tiny-caps" style={{ color: 'var(--coral)' }}><Palette style={{ width: '1vw' }} /> Personalízalo</div>
            <div className="mt-[.4vh] text-[.95vw] font-semibold">Talla + color a tu medida</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}