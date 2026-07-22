import { motion } from 'framer-motion';
import {
  sceneTransitions,
  springs,
  staggerConfigs,
  charVariants,
} from '@/lib/video/animations';
import { PawPrint } from 'lucide-react';

export function Scene5() {
  const brand = "Candy's Pet";

  return (
    <motion.div
      key="scene5"
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-bg-light"
      {...sceneTransitions.fadeBlur}
    >
      {/* Background Video */}
      <video
        src={`${import.meta.env.BASE_URL}videos/cozy-puppy.mp4`}
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
      <div className="absolute inset-0 bg-bg-dark/40" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        <motion.div
          className="bg-white text-primary rounded-full p-6 shadow-2xl mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ ...springs.bouncy, delay: 0.2 }}
        >
          <PawPrint size={64} fill="currentColor" />
        </motion.div>

        <motion.h1
          className="text-7xl md:text-9xl font-display font-bold text-white tracking-tight drop-shadow-2xl mb-6"
          variants={staggerConfigs.charFast}
          initial="hidden"
          animate="visible"
        >
          {brand.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={charVariants}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className="bg-secondary text-white px-8 py-4 rounded-full font-body font-bold text-3xl shadow-xl"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...springs.poppy, delay: 1 }}
        >
          Siempre juntos, corazón a corazón
        </motion.div>

      </div>
    </motion.div>
  );
}
