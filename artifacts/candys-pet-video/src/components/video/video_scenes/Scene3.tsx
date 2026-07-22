import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  sceneTransitions,
  springs,
} from '@/lib/video/animations';
import { ShieldCheck, Smile, Star } from 'lucide-react';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      key="scene3"
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-bg-muted"
      {...sceneTransitions.slideLeft}
    >
      {/* Background shapes */}
      <motion.div
        className="absolute -right-32 top-0 bottom-0 w-1/2 bg-white skew-x-[-12deg] shadow-2xl"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute top-10 left-10 text-primary/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Star size={200} fill="currentColor" />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl px-12 flex items-center justify-between">
        
        {/* Left Side: Emotional Features */}
        <div className="w-[50%] flex flex-col justify-center pr-12">
          <motion.div
            className="inline-block bg-white px-6 py-2 rounded-full font-display font-bold text-accent text-xl shadow-sm mb-6 self-start rotate-[-2deg]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springs.bouncy, delay: 0.5 }}
          >
            Tranquilidad total 🕊️
          </motion.div>
          
          <motion.h2
            className="font-display text-6xl font-bold text-text-primary mb-12 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: 'circOut' }}
          >
            Paseos sin <span className="text-secondary block">preocupaciones</span>
          </motion.h2>

          <div className="space-y-8 font-body">
            <FeatureItem
              icon={<ShieldCheck size={32} className="text-white" />}
              title="Gancho de seguridad"
              desc="Interior seguro para tu perrito"
              visible={phase >= 1}
              color="bg-primary"
            />
            <FeatureItem
              icon={<Smile size={32} className="text-white" />}
              title="Reduce el estrés"
              desc="Siente los latidos de tu corazón"
              visible={phase >= 2}
              color="bg-accent"
            />
            <FeatureItem
              icon={<Star size={32} className="text-white" />}
              title="Ideal para todos"
              desc="Perfecto para perritos senior o con discapacidad"
              visible={phase >= 3}
              color="bg-secondary"
            />
          </div>
        </div>

        {/* Right Side: Emotional Image */}
        <motion.div
          className="w-[45%] relative flex justify-center"
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-secondary/30 rounded-full scale-[1.1] blur-xl" />
          <motion.img
            src={`${import.meta.env.BASE_URL}images/happy-tiny-dog.jpg`}
            alt="Happy tiny dog"
            className="w-[90%] aspect-square object-cover rounded-full shadow-2xl relative z-10 border-8 border-bg-light"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          />
        </motion.div>

      </div>
    </motion.div>
  );
}

function FeatureItem({ icon, title, desc, visible, color }: { icon: React.ReactNode, title: string, desc: string, visible: boolean, color: string }) {
  return (
    <motion.div
      className="flex items-start gap-5"
      initial={{ opacity: 0, x: -50 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={springs.snappy}
    >
      <div className={`w-14 h-14 shrink-0 rounded-full ${color} flex items-center justify-center shadow-md mt-1`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-text-primary">{title}</p>
        <p className="text-xl text-text-secondary mt-1">{desc}</p>
      </div>
    </motion.div>
  );
}
