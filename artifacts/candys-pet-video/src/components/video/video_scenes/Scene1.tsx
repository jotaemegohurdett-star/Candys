import { motion } from 'framer-motion';
import {
  charVariants,
  containerVariants,
  sceneTransitions,
  springs,
  staggerConfigs
} from '@/lib/video/animations';
import { PawPrint, Heart } from 'lucide-react';

export function Scene1() {
  const text1 = "Tu perrito,";
  const text2 = "siempre cerca.";

  return (
    <motion.div
      key="scene1"
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-bg-light"
      {...sceneTransitions.zoomThrough}
    >
      {/* Background Video Layer */}
      <video
        src={`${import.meta.env.BASE_URL}videos/cozy-puppy.mp4`}
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 to-transparent" />

      {/* Midground Drifting Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute top-[20%] left-[15%] text-white/50"
        >
          <PawPrint size={80} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="absolute bottom-[30%] right-[15%] text-accent/50"
        >
          <Heart size={100} fill="currentColor" />
        </motion.div>
      </motion.div>

      {/* Foreground Typography */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center text-center font-display drop-shadow-2xl"
      >
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white tracking-tight"
            variants={staggerConfigs.charFast}
            initial="hidden"
            animate="visible"
          >
            {text1.split('').map((char, i) => (
              <motion.span
                key={`t1-${i}`}
                className="inline-block"
                variants={charVariants}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
        </div>
        
        <div className="overflow-hidden mt-4">
          <motion.h2
            className="text-5xl md:text-7xl font-bold text-bg-muted"
            variants={staggerConfigs.charFast}
            initial="hidden"
            animate="visible"
          >
            {text2.split('').map((char, i) => (
              <motion.span
                key={`t2-${i}`}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 50, rotateZ: 10 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    rotateZ: 0,
                    // @ts-ignore
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  }
                }}
                style={{ originX: 0.5, originY: 1 }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h2>
        </div>
      </motion.div>
    </motion.div>
  );
}
