import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions, springs } from '@/lib/video/animations';

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
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <img
          src={`${import.meta.env.BASE_URL}images/carrier-flatlay.jpg`}
          alt="Flatlay"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-bg-dark/80 backdrop-blur-md" />
      </div>

      <motion.h2
        className="relative z-10 font-display font-bold text-white text-center drop-shadow-lg mb-6 sm:mb-10 px-4"
        style={{ fontSize: 'clamp(1.4rem, 5vw, 3.5rem)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'backOut' }}
      >
        Encuentra su <span className="text-secondary">talla ideal</span>
      </motion.h2>

      <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-8 w-full max-w-5xl px-5 sm:px-8">
        <motion.div
          className="flex-1 bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl relative overflow-visible"
          style={{ padding: 'clamp(1rem, 3vw, 2.5rem)' }}
          initial={{ opacity: 0, y: 60, rotate: -5 }}
          animate={phase >= 1 ? { opacity: 1, y: 0, rotate: -2 } : { opacity: 0, y: 60, rotate: -5 }}
          transition={springs.bouncy}
        >
          <div className="absolute font-display font-bold text-white bg-primary rounded-full flex items-center justify-center shadow-xl"
            style={{
              width: 'clamp(44px,8vw,80px)',
              height: 'clamp(44px,8vw,80px)',
              fontSize: 'clamp(1.2rem,3.5vw,2.5rem)',
              top: 'clamp(-18px,-3vw,-32px)',
              left: 'clamp(-12px,-2vw,-20px)',
              transform: 'rotate(-10deg)',
            }}>
            M
          </div>
          <div className="flex flex-col items-center text-center" style={{ marginTop: 'clamp(0.8rem,2vw,2rem)' }}>
            <h3 className="font-display font-bold text-text-primary mb-2"
              style={{ fontSize: 'clamp(1rem, 3vw, 1.8rem)' }}>
              Pequeños y Cachorros
            </h3>
            <div className="bg-primary/10 text-primary font-bold rounded-full mb-3"
              style={{ fontSize: 'clamp(0.8rem,2.2vw,1.2rem)', padding: 'clamp(4px,1vw,8px) clamp(10px,2vw,20px)' }}>
              Hasta 3.5 kg
            </div>
            <ul className="text-text-secondary space-y-2 font-body font-medium"
              style={{ fontSize: 'clamp(0.7rem,2vw,1.1rem)' }}>
              <li className="flex items-center gap-1.5 justify-center">
                <span className="text-primary">✓</span> A partir de 2 meses
              </li>
              <li className="flex items-center gap-1.5 justify-center">
                <span className="text-primary">✓</span> Ideal para razas mini
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl relative overflow-visible"
          style={{ padding: 'clamp(1rem, 3vw, 2.5rem)' }}
          initial={{ opacity: 0, y: 60, rotate: 5 }}
          animate={phase >= 2 ? { opacity: 1, y: 0, rotate: 2 } : { opacity: 0, y: 60, rotate: 5 }}
          transition={springs.bouncy}
        >
          <div className="absolute font-display font-bold text-white bg-secondary rounded-full flex items-center justify-center shadow-xl"
            style={{
              width: 'clamp(44px,8vw,80px)',
              height: 'clamp(44px,8vw,80px)',
              fontSize: 'clamp(1.2rem,3.5vw,2.5rem)',
              top: 'clamp(-18px,-3vw,-32px)',
              right: 'clamp(-12px,-2vw,-20px)',
              transform: 'rotate(10deg)',
            }}>
            L
          </div>
          <div className="flex flex-col items-center text-center" style={{ marginTop: 'clamp(0.8rem,2vw,2rem)' }}>
            <h3 className="font-display font-bold text-text-primary mb-2"
              style={{ fontSize: 'clamp(1rem, 3vw, 1.8rem)' }}>
              Medianos o Duplas
            </h3>
            <div className="bg-secondary/10 text-secondary font-bold rounded-full mb-3"
              style={{ fontSize: 'clamp(0.8rem,2.2vw,1.2rem)', padding: 'clamp(4px,1vw,8px) clamp(10px,2vw,20px)' }}>
              Hasta 10 kg
            </div>
            <ul className="text-text-secondary space-y-2 font-body font-medium"
              style={{ fontSize: 'clamp(0.7rem,2vw,1.1rem)' }}>
              <li className="flex items-center gap-1.5 justify-center">
                <span className="text-secondary">✓</span> Máxima resistencia
              </li>
              <li className="flex items-center gap-1.5 justify-center">
                <span className="text-secondary">✓</span> ¡Caben 2 perritos!
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}