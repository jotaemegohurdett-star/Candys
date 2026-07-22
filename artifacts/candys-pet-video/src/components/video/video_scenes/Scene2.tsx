import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  sceneTransitions,
  springs,
} from '@/lib/video/animations';
import { HeartHandshake, Feather, Droplets } from 'lucide-react';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1500),
      setTimeout(() => setPhase(2), 2500),
      setTimeout(() => setPhase(3), 3500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      key="scene2"
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-bg-light"
      {...sceneTransitions.wipe}
    >
      {/* Background Graphic */}
      <motion.div
        className="absolute w-[200vw] h-[200vw] bg-bg-muted rounded-full"
        initial={{ scale: 0, x: '-50%', y: '-50%' }}
        animate={{ scale: 1, x: '-20%', y: '-10%' }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Responsive layout: column on mobile, row on wider */}
      <div className="relative z-10 w-full max-w-6xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Product Image */}
        <motion.div
          className="w-full sm:w-[42%] relative shrink-0"
          initial={{ opacity: 0, x: -60, rotate: -10 }}
          animate={{ opacity: 1, x: 0, rotate: -2 }}
          transition={{ ...springs.bouncy, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-primary/20 rounded-[2rem] -rotate-3 scale-105" />
          <motion.img
            src={`${import.meta.env.BASE_URL}images/dog-in-sling.jpg`}
            alt="Dog in sling"
            className="w-full h-auto aspect-[4/5] object-cover rounded-[2rem] shadow-2xl relative z-10 border-4 sm:border-8 border-white"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 bg-secondary text-white font-display font-bold px-4 py-2 sm:px-8 sm:py-4 rounded-full shadow-xl z-20 rotate-6"
            style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.4rem)' }}
            initial={{ scale: 0 }}
            animate={{ scale: phase >= 1 ? 1 : 0 }}
            transition={springs.poppy}
          >
            ¡Hecho a mano! 🇨🇱
          </motion.div>
        </motion.div>

        {/* Features */}
        <div className="w-full sm:w-[54%] flex flex-col justify-center sm:pl-6">
          <motion.h2
            className="font-display font-bold text-text-primary mb-4 sm:mb-8"
            style={{ fontSize: 'clamp(1.3rem, 4.5vw, 3rem)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'circOut' }}
          >
            Tu porta mascotas{' '}
            <span className="text-primary block mt-1">favorito</span>
          </motion.h2>

          <div className="space-y-4 sm:space-y-6 font-body">
            <FeatureRow
              icon={<HeartHandshake className="text-white" style={{ width: 'clamp(18px,3vw,28px)', height: 'clamp(18px,3vw,28px)' }} />}
              title="Diseño ergonómico"
              visible={phase >= 1}
              color="bg-accent"
            />
            <FeatureRow
              icon={<Feather className="text-white" style={{ width: 'clamp(18px,3vw,28px)', height: 'clamp(18px,3vw,28px)' }} />}
              title="100% Algodón transpirable"
              visible={phase >= 2}
              color="bg-primary"
            />
            <FeatureRow
              icon={<Droplets className="text-white" style={{ width: 'clamp(18px,3vw,28px)', height: 'clamp(18px,3vw,28px)' }} />}
              title="Lavable a máquina a 30°"
              visible={phase >= 3}
              color="bg-secondary"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureRow({ icon, title, visible, color }: { icon: React.ReactNode, title: string, visible: boolean, color: string }) {
  return (
    <motion.div
      className="flex items-center gap-3 sm:gap-5"
      initial={{ opacity: 0, x: 50 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className={`shrink-0 rounded-xl ${color} flex items-center justify-center shadow-lg rotate-3`}
        style={{ width: 'clamp(36px,6vw,56px)', height: 'clamp(36px,6vw,56px)', padding: 'clamp(6px,1.2vw,10px)' }}>
        {icon}
      </div>
      <p className="font-bold text-text-secondary" style={{ fontSize: 'clamp(0.85rem, 2.8vw, 1.6rem)' }}>
        {title}
      </p>
    </motion.div>
  );
}
