import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Logo3DProps {
  src: string;
  alt: string;
  size?: number;
}

/**
 * Magnetic 3D logo — tracks the mouse with spring-physics tilt,
 * two counter-rotating orbital rings, a pulse glow, and a float idle.
 * Zero friction: all transitions are spring-driven or CSS-animated.
 */
export function Logo3D({ src, alt, size = 80 }: Logo3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Normalised mouse offset [-0.5 … 0.5]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spring = { damping: 16, stiffness: 160, mass: 0.5 };

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [22, -22]),
    spring,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-22, 22]),
    spring,
  );
  const scaleSpring = useSpring(1, { damping: 18, stiffness: 280 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
      mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
      scaleSpring.set(1.1);
    },
    [mouseX, mouseY, scaleSpring],
  );

  const onMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    scaleSpring.set(1);
  }, [mouseX, mouseY, scaleSpring]);

  const ring = (color: string, delay: string, direction: 'normal' | 'reverse') => ({
    position: 'absolute' as const,
    inset: -6,
    borderRadius: '50%',
    border: `1.5px solid ${color}`,
    boxShadow: `0 0 10px ${color}`,
    animation: `logo-ring-y 3.6s linear ${delay} infinite ${direction}`,
  });

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ width: size, height: size, perspective: 700 }}
      className="relative select-none"
    >
      {/* Pulse glow behind */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: -12,
          background:
            'radial-gradient(circle, hsl(340 84% 60% / 0.55) 0%, hsl(280 70% 55% / 0.28) 55%, transparent 80%)',
          filter: 'blur(10px)',
        }}
        animate={{ scale: [1, 1.28, 1], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 3-D tiltable group — preserve-3d so children get real depth */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: scaleSpring,
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }}
      >
        {/* Ring 1 — rose, spins around Y */}
        <div style={ring('hsl(340 84% 65% / 0.85)', '0s', 'normal')} />

        {/* Ring 2 — sky, counter-rotates around Y (different tilt via rotateX offset) */}
        <div
          style={{
            ...ring('hsl(200 90% 65% / 0.65)', '-1.2s', 'reverse'),
            transform: 'rotateX(38deg)',
            animation: `logo-ring-y 4.8s linear -1.2s infinite reverse`,
          }}
        />

        {/* Ring 3 — gold accent, slow tilt */}
        <div
          style={{
            ...ring('hsl(42 90% 60% / 0.5)', '-2.4s', 'normal'),
            inset: -2,
            transform: 'rotateX(-55deg)',
            animation: `logo-ring-y 6s linear -2.4s infinite normal`,
          }}
        />

        {/* Logo image — lifted in Z so rings orbit around it */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="absolute inset-0 w-full h-full rounded-full object-cover"
          style={{
            transform: 'translateZ(14px)',
            boxShadow:
              '0 16px 48px hsl(340 84% 50% / 0.45), 0 4px 16px hsl(0 0% 0% / 0.35)',
          }}
        />

        {/* Specular highlight overlay — gives it a glassy 3-D sphere feel */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            transform: 'translateZ(16px)',
            background:
              'linear-gradient(135deg, hsl(0 0% 100% / 0.22) 0%, transparent 45%, hsl(340 84% 75% / 0.1) 100%)',
          }}
        />
      </motion.div>
    </div>
  );
}
