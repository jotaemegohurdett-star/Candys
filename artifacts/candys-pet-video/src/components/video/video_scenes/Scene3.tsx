import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions, springs } from '@/lib/video/animations';
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
        className="absolute top-6 left-6 text-primary/10 hidden sm:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Star size={120} fill="currentColor" />
      </motion.div>

      {/* Responsive layout */}
      <div className="relative z-10 w-full max-w-6xl px-5 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-5">

        {/* Left: Features */}
        <div className="w-full sm:w-[52%] flex flex-col justify-center">
          <motion.div
            className="inline-block bg-white px-4 py-1.5 rounded-full font-display font-bold text-accent shadow-sm mb-3 self-start rotate-[-2deg]"
            style={{ fontSize: 'clamp(0.75rem, 2.2vw, 1.1rem)' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springs.bouncy, delay: 0.5 }}
          >
            Tranquilidad total 🕊️
          </motion.div>

          <motion.h2
            className="font-display font-bold text-text-primary mb-4 sm:mb-8 leading-tight"
            style={{ fontSize: 'clamp(1.4rem, 4.8vw, 3.2rem)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: 'circOut' }}
          >
            Paseos sin{' '}
            <span className="text-secondary block">preocupaciones</span>
          </motion.h2>

          <div className="space-y-3 sm:space-y-6 font-body">
            <FeatureItem
              icon={<ShieldCheck className="text-white" style={{ width: 'clamp(16px,2.8vw,26px)', height: 'clamp(16px,2.8vw,26px)' }} />}
              title="Gancho de seguridad"
              desc="Interior seguro para tu perrito"
              visible={phase >= 1}
              color="bg-primary"
            />
            <FeatureItem
              icon={<Smile className="text-white" style={{ width: 'clamp(16px,2.8vw,26px)', height: 'clamp(16px,2.8vw,26px)' }} />}
              title="Reduce el estrés"
              desc="Siente los latidos de tu corazón"
              visible={phase >= 2}
              color="bg-accent"
            />
            <FeatureItem
              icon={<Star className="text-white" style={{ width: 'clamp(16px,2.8vw,26px)', height: 'clamp(16px,2.8vw,26px)' }} />}
              title="Ideal para todos"
              desc="Senior o con discapacidad"
              visible={phase >= 3}
              color="bg-secondary"
            />
          </div>
        </div>

        {/* Right: Image */}
        <motion.div
          className="w-[55%] sm:w-[40%] relative flex justify-center shrink-0"
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-secondary/30 rounded-full scale-[1.1] blur-xl" />
          <motion.img
            src={`${import.meta.env.BASE_URL}images/happy-tiny-dog.jpg`}
            alt="Happy tiny dog"
            className="w-full aspect-square object-cover rounded-full shadow-2xl relative z-10 border-4 sm:border-8 border-bg-light"
            animate={{ y: [0, -8, 0] }}
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
      className="flex items-start gap-3 sm:gap-4"
      initial={{ opacity: 0, x: -50 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className={`shrink-0 rounded-full ${color} flex items-center justify-center shadow-md mt-0.5`}
        style={{ width: 'clamp(30px,5vw,48px)', height: 'clamp(30px,5vw,48px)', padding: 'clamp(5px,1vw,9px)' }}>
        {icon}
      </div>
      <div>
        <p className="font-bold text-text-primary" style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.4rem)' }}>
          {title}
        </p>
        <p className="text-text-secondary" style={{ fontSize: 'clamp(0.65rem, 2vw, 1.1rem)' }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
