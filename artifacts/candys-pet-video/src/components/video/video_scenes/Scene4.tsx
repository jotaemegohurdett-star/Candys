import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  sceneTransitions,
  springs,
  containerVariants,
} from '@/lib/video/animations';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1600),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      key="scene4"
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-bg-dark"
      {...sceneTransitions.splitHorizontal}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <img
          src={`${import.meta.env.BASE_URL}images/carrier-flatlay.jpg`}
          alt="Flatlay"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-bg-dark/80 backdrop-blur-md" />
      </div>

      <motion.h2
        className="relative z-10 font-display text-6xl md:text-7xl font-bold text-white mb-16 text-center drop-shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'backOut' }}
      >
        Encuentra su <span className="text-secondary">talla ideal</span>
      </motion.h2>

      <div className="relative z-10 flex gap-12 w-full max-w-5xl px-8">
        
        {/* Talla M */}
        <motion.div
          className="flex-1 bg-white rounded-[3rem] p-10 shadow-2xl relative"
          initial={{ opacity: 0, y: 100, rotate: -5 }}
          animate={phase >= 1 ? { opacity: 1, y: 0, rotate: -2 } : { opacity: 0, y: 100, rotate: -5 }}
          transition={springs.bouncy}
        >
          <div className="absolute -top-10 -left-6 bg-primary text-white w-24 h-24 rounded-full flex items-center justify-center font-display text-5xl font-bold shadow-xl rotate-[-10deg]">
            M
          </div>
          <div className="mt-8 flex flex-col items-center text-center">
            <h3 className="font-display text-4xl font-bold text-text-primary mb-4">Pequeños y <br/>Cachorros</h3>
            <div className="bg-primary/10 text-primary font-bold text-2xl px-6 py-2 rounded-full mb-6">
              Hasta 3.5 kg
            </div>
            <ul className="text-xl text-text-secondary space-y-4 font-body font-medium">
              <li className="flex items-center gap-2 justify-center">
                <span className="text-primary">✓</span> A partir de 2 meses
              </li>
              <li className="flex items-center gap-2 justify-center">
                <span className="text-primary">✓</span> Ideal para razas mini
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Talla L */}
        <motion.div
          className="flex-1 bg-white rounded-[3rem] p-10 shadow-2xl relative"
          initial={{ opacity: 0, y: 100, rotate: 5 }}
          animate={phase >= 2 ? { opacity: 1, y: 0, rotate: 2 } : { opacity: 0, y: 100, rotate: 5 }}
          transition={springs.bouncy}
        >
          <div className="absolute -top-10 -right-6 bg-secondary text-white w-24 h-24 rounded-full flex items-center justify-center font-display text-5xl font-bold shadow-xl rotate-[10deg]">
            L
          </div>
          <div className="mt-8 flex flex-col items-center text-center">
            <h3 className="font-display text-4xl font-bold text-text-primary mb-4">Medianos o <br/>Duplas</h3>
            <div className="bg-secondary/10 text-secondary font-bold text-2xl px-6 py-2 rounded-full mb-6">
              Hasta 10 kg
            </div>
            <ul className="text-xl text-text-secondary space-y-4 font-body font-medium">
              <li className="flex items-center gap-2 justify-center">
                <span className="text-secondary">✓</span> Máxima resistencia
              </li>
              <li className="flex items-center gap-2 justify-center">
                <span className="text-secondary">✓</span> ¡Caben 2 perritos!
              </li>
            </ul>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
