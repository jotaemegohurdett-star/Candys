import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const base = import.meta.env.BASE_URL;
const products = [
  { name: 'Clásico', image: 'dog-in-sling.jpg', color: '#E56B5D', note: 'El favorito' },
  { name: 'Bomber Café', image: 'carrier-flatlay.jpg', color: '#4E8D86', note: 'Todas las temporadas' },
  { name: 'Unisex', image: 'happy-tiny-dog.jpg', color: '#F3B562', note: 'Para todos' },
];

export function Scene3() {
  return (
    <motion.section
      className="absolute inset-0 overflow-hidden"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(100% 0 0 0)' }}
      transition={{ duration: .85, ease: [0.16, 1, .3, 1] }}
      style={{ background: 'var(--paper-deep)' }}
    >
      <div className="absolute inset-0 paper-grid opacity-45" />
      <div className="absolute left-[7vw] top-[6vh] flex items-center gap-[.7vw] text-[.95vw] tiny-caps" style={{ color: 'var(--muted)' }}>
        <Sparkles style={{ width: '1.2vw', color: 'var(--coral)' }} /> 02 / Elige tu estilo
      </div>
      <div className="relative z-10 px-[7vw] pt-[15vh]">
        <motion.div className="flex items-end justify-between" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .55 }}>
          <div>
            <p className="mb-[1.3vh] text-[1.1vw] font-semibold" style={{ color: 'var(--coral)' }}>Tres formas de llevarlos contigo</p>
            <h2 className="font-display text-[4.5vw] font-semibold leading-[.95] tracking-[-.05em]" style={{ color: 'var(--ink)' }}>Elige tu <i style={{ color: 'var(--teal)' }}>favorito.</i></h2>
          </div>
          <div className="max-w-[15vw] pb-[.5vh] text-right text-[.95vw] leading-[1.3]" style={{ color: 'var(--muted)' }}>Porta mascotas tipo banano para perros y gatos.</div>
        </motion.div>

        <div className="mt-[5vh] flex gap-[1.5vw]">
          {products.map((product, index) => (
            <motion.div key={product.name} className="relative h-[48vh] flex-1 overflow-hidden rounded-[1.5vw] soft-shadow" style={{ background: product.color }} initial={{ opacity: 0, y: 50, rotate: index === 0 ? -3 : index === 2 ? 3 : 0 }} animate={{ opacity: 1, y: 0, rotate: index === 0 ? -3 : index === 2 ? 3 : 0 }} transition={{ delay: .48 + index * .15, duration: .7, ease: [0.16, 1, .3, 1] }}>
              <img src={`${base}images/${product.image}`} alt={product.name} className="h-full w-full object-cover opacity-90" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 40%, ${product.color} 100%)` }} />
              <div className="absolute bottom-[2vw] left-[1.7vw] right-[1.7vw]">
                <div className="mb-[1vh] text-[.8vw] tiny-caps" style={{ color: 'rgba(251,243,236,.8)' }}>{product.note}</div>
                <div className="flex items-end justify-between">
                  <h3 className="font-display text-[2.35vw] font-semibold leading-none" style={{ color: 'var(--paper)' }}>{product.name}</h3>
                  <span className="flex h-[2.4vw] w-[2.4vw] items-center justify-center rounded-full" style={{ background: 'var(--paper)', color: product.color }}><ArrowUpRight style={{ width: '1.2vw' }} /></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div className="absolute bottom-[4.5vh] left-[7vw] text-[.9vw] font-medium" style={{ color: 'var(--muted)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.45 }}>
        Diseños cómodos, prácticos y con personalidad.
      </motion.div>
    </motion.section>
  );
}