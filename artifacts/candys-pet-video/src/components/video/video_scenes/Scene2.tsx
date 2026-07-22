import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  sceneTransitions,
  springs,
  containerVariants,
  itemVariants
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
        className="absolute w-[150vw] h-[150vw] bg-bg-muted rounded-full"
        initial={{ scale: 0, x: '-50%', y: '-50%' }}
        animate={{ scale: 1, x: '-20%', y: '-10%' }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 w-full max-w-6xl px-12 flex items-center justify-between">
        {/* Left Side: Product Image */}
        <motion.div
          className="w-[45%] relative"
          initial={{ opacity: 0, x: -100, rotate: -10 }}
          animate={{ opacity: 1, x: 0, rotate: -2 }}
          transition={{ ...springs.bouncy, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-primary/20 rounded-[3rem] -rotate-3 scale-105" />
          <motion.img
            src={`${import.meta.env.BASE_URL}images/dog-in-sling.jpg`}
            alt="Dog in sling"
            className="w-full h-auto aspect-[4/5] object-cover rounded-[3rem] shadow-2xl relative z-10 border-8 border-white"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-8 -right-8 bg-secondary text-white font-display font-bold text-3xl px-8 py-4 rounded-full shadow-xl z-20 rotate-6"
            initial={{ scale: 0 }}
            animate={{ scale: phase >= 1 ? 1 : 0 }}
            transition={springs.poppy}
          >
            ¡Hecho a mano! 🇨🇱
          </motion.div>
        </motion.div>

        {/* Right Side: Features */}
        <div className="w-[50%] flex flex-col justify-center pl-12">
          <motion.h2
            className="font-display text-5xl md:text-6xl font-bold text-text-primary mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'circOut' }}
          >
            Tu porta mascotas <span className="text-primary block mt-2">favorito</span>
          </motion.h2>

          <div className="space-y-8 font-body">
            <FeatureRow
              icon={<HeartHandshake size={32} className="text-white" />}
              title="Diseño ergonómico"
              visible={phase >= 1}
              color="bg-accent"
            />
            <FeatureRow
              icon={<Feather size={32} className="text-white" />}
              title="100% Algodón transpirable"
              visible={phase >= 2}
              color="bg-primary"
            />
            <FeatureRow
              icon={<Droplets size={32} className="text-white" />}
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
      className="flex items-center gap-6"
      initial={{ opacity: 0, x: 50 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={springs.snappy}
    >
      <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center shadow-lg rotate-3`}>
        {icon}
      </div>
      <p className="text-3xl font-bold text-text-secondary">{title}</p>
    </motion.div>
  );
}
