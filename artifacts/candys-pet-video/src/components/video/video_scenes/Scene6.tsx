import { motion } from 'framer-motion';
import { Check, ChevronRight, Globe2, MessageCircle, MousePointer2, ShoppingBag } from 'lucide-react';

const base = import.meta.env.BASE_URL;

const catalog = [
  { name: 'Porta Mascota Clásico', image: 'dog-in-sling.jpg', price: '$29.990' },
  { name: 'Bomber Café', image: 'carrier-flatlay.jpg', price: '$32.990' },
  { name: 'Unisex', image: 'happy-tiny-dog.jpg', price: '$31.990' },
];

export function Scene6() {
  return (
    <motion.section className="absolute inset-0 overflow-hidden" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(100% 0 0 0)' }} transition={{ duration: .85, ease: [0.16, 1, .3, 1] }} style={{ background: 'var(--ink)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 75% 38%, rgba(78,141,134,.35), transparent 35%), radial-gradient(circle at 10% 100%, rgba(229,107,93,.24), transparent 32%)' }} />
      <div className="absolute left-[7vw] top-[6vh] text-[.95vw] tiny-caps" style={{ color: 'rgba(251,243,236,.6)' }}>05 / Compra fácil</div>
      <div className="relative z-10 flex h-full items-center justify-center">
        <motion.div className="relative h-[72vh] w-[78vw] overflow-hidden rounded-[1.6vw] browser-shadow" style={{ background: 'var(--paper)' }} initial={{ opacity: 0, scale: .86, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: .25, duration: .95, ease: [0.16, 1, .3, 1] }}>
          <div className="flex h-[5.3vh] items-center gap-[1vw] border-b px-[1.4vw]" style={{ borderColor: 'var(--line)', background: '#f7ece2' }}>
            <div className="flex gap-[.35vw]"><i className="h-[.65vw] w-[.65vw] rounded-full" style={{ background: 'var(--coral)' }} /><i className="h-[.65vw] w-[.65vw] rounded-full" style={{ background: 'var(--sun)' }} /><i className="h-[.65vw] w-[.65vw] rounded-full" style={{ background: 'var(--teal)' }} /></div>
            <div className="flex h-[2.3vw] flex-1 items-center gap-[.55vw] rounded-full px-[.8vw] text-[.76vw]" style={{ background: 'var(--paper)', color: 'var(--muted)' }}><Globe2 style={{ width: '1vw' }} /> candyspet.cl</div>
          </div>
          <div className="flex h-[66.7vh] flex-col">
            <div className="flex items-center justify-between px-[2.2vw] py-[1.7vh]">
              <div className="font-display text-[1.65vw] font-semibold">Candy&apos;s <i style={{ color: 'var(--coral)' }}>Pet</i></div>
              <div className="flex items-center gap-[1.6vw] text-[.8vw] font-semibold" style={{ color: 'var(--muted)' }}><span>Catálogo</span><span>Sobre nosotros</span><ShoppingBag style={{ width: '1.35vw', color: 'var(--coral)' }} /></div>
            </div>
            <div className="mx-[2.2vw] flex-1 rounded-[1vw] px-[2.4vw] py-[2.4vh]" style={{ background: '#f0dfd0' }}>
              <div className="flex items-center justify-between">
                <div><div className="text-[.72vw] tiny-caps" style={{ color: 'var(--coral)' }}>Catálogo / porta mascotas</div><h2 className="mt-[.8vh] font-display text-[2.75vw] font-semibold leading-[.95] tracking-[-.045em]" style={{ color: 'var(--ink)' }}>Elige tu forma<br />de ir juntos.</h2></div>
                <div className="flex h-[5.2vw] w-[5.2vw] items-center justify-center rounded-full text-center text-[.75vw] font-semibold" style={{ background: 'var(--sun)', color: 'var(--ink)' }}>Hecho<br />en Chile</div>
              </div>
              <div className="mt-[2.3vh] flex gap-[1vw]">
                {catalog.map((item, index) => (
                  <motion.div key={item.name} className="relative flex-1 overflow-hidden rounded-[.8vw]" style={{ background: 'var(--paper)' }} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .72 + index * .15 }}>
                    <img src={`${base}images/${item.image}`} alt={item.name} className="h-[22vh] w-full object-cover" />
                    <div className="p-[.8vw]"><div className="text-[.78vw] font-bold" style={{ color: 'var(--ink)' }}>{item.name}</div><div className="mt-[.5vh] text-[.75vw] font-semibold" style={{ color: 'var(--coral)' }}>{item.price}</div></div>
                  </motion.div>
                ))}
              </div>
              <motion.div className="mt-[2vh] flex items-center justify-between rounded-[.8vw] border px-[1vw] py-[.7vw]" style={{ background: 'var(--paper)', borderColor: 'rgba(229,107,93,.5)' }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35 }}>
                <div className="flex items-center gap-[.7vw]"><span className="flex h-[1.9vw] w-[1.9vw] items-center justify-center rounded-full" style={{ background: 'var(--coral)', color: 'var(--paper)' }}><Check style={{ width: '1vw' }} /></span><span className="text-[.85vw] font-semibold">Clásico · Talla M · Coral</span></div>
                <span className="flex items-center gap-[.35vw] text-[.75vw] font-bold" style={{ color: 'var(--coral)' }}>Agregar al carrito <ChevronRight style={{ width: '.9vw' }} /></span>
              </motion.div>
            </div>
          </div>
          <motion.div className="absolute bottom-[2.2vw] right-[2.2vw] flex items-center gap-[.65vw] rounded-full px-[1vw] py-[.7vw] text-[.76vw] font-bold soft-shadow" style={{ background: 'var(--teal)', color: 'var(--paper)' }} initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2, type: 'spring', stiffness: 300, damping: 20 }}>
            <MessageCircle style={{ width: '1.15vw' }} /> ¿Necesitas ayuda?
          </motion.div>
          <motion.div className="absolute left-[43%] top-[52%] z-20" initial={{ opacity: 0, x: -30, y: -20 }} animate={{ opacity: [0, 1, 1, 0], x: [-30, 0, 0, 18], y: [-20, 0, 0, 8] }} transition={{ delay: 2.5, duration: 2.1, times: [0, .2, .75, 1] }}>
            <MousePointer2 style={{ width: '2.1vw', color: 'var(--ink)' }} fill="var(--paper)" />
          </motion.div>
        </motion.div>
      </div>
      <motion.div className="absolute bottom-[4.5vh] right-[7vw] text-right text-[.9vw]" style={{ color: 'rgba(251,243,236,.7)' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        candyspet.cl <span style={{ color: 'var(--sun)' }}>·</span> revisa <span style={{ color: 'var(--sun)' }}>·</span> elige <span style={{ color: 'var(--sun)' }}>·</span> recibe ayuda
      </motion.div>
    </motion.section>
  );
}