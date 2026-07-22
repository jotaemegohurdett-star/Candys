import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface CartIcon3DProps {
  count: number;
  isScrolled: boolean;
  onClick: () => void;
}

/**
 * 3-D floating cart icon — spring-physics tilt on hover,
 * continuous float idle, glow pulse, and a pop badge for item count.
 */
export function CartIcon3D({ count, isScrolled, onClick }: CartIcon3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spring = { damping: 14, stiffness: 180, mass: 0.4 };

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [18, -18]),
    spring,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-18, 18]),
    spring,
  );
  const scaleSpring = useSpring(1, { damping: 18, stiffness: 300 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
      mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
      scaleSpring.set(1.18);
    },
    [mouseX, mouseY, scaleSpring],
  );

  const onMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    scaleSpring.set(1);
  }, [mouseX, mouseY, scaleSpring]);

  const glowColor = isScrolled
    ? 'hsl(340 84% 55% / 0.5)'
    : 'hsl(340 84% 70% / 0.65)';
  const cartColor = isScrolled ? 'hsl(340 84% 45%)' : 'hsl(0 0% 100%)';
  const cartColorDark = isScrolled ? 'hsl(340 84% 30%)' : 'hsl(340 84% 80%)';

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ width: 44, height: 44, perspective: 500 }}
      className="relative select-none cursor-pointer flex items-center justify-center"
    >
      {/* Glow pulse behind */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -4,
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 75%)`,
          filter: 'blur(8px)',
        }}
        animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ground shadow — shrinks when cart "lifts" */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          bottom: -2,
          left: '50%',
          translateX: '-50%',
          width: 22,
          height: 5,
          background: 'hsl(340 84% 40% / 0.25)',
          filter: 'blur(4px)',
        }}
        animate={{
          scaleX: [1, 0.65, 1],
          opacity: [0.5, 0.18, 0.5],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 3-D tiltable cart body */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: scaleSpring,
          transformStyle: 'preserve-3d',
          width: 32,
          height: 32,
          position: 'relative',
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{ y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' } }}
      >
        {/* Cart SVG with 3-D layers */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            filter: `drop-shadow(0 6px 12px hsl(340 84% 50% / 0.55)) drop-shadow(0 2px 4px hsl(0 0% 0% / 0.3))`,
            transform: 'translateZ(10px)',
          }}
        >
          {/* Cart body — side face (darker, bottom edge) for 3-D depth */}
          <path
            d="M6 12 L26 12 L24 22 L8 22 Z"
            fill={cartColorDark}
            opacity="0.45"
            transform="translate(0, 2) skewX(-2)"
          />

          {/* Cart handle */}
          <path
            d="M4 8 L7.5 8 L11 22 L21 22 L24.5 12 L7.5 12"
            stroke={cartColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Cart body fill */}
          <path
            d="M8.5 12 L23.5 12 L21.5 21 L10.5 21 Z"
            fill={cartColor}
            opacity="0.15"
          />

          {/* Cart body outline */}
          <path
            d="M8.5 12 L23.5 12 L21.5 21 L10.5 21 Z"
            stroke={cartColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Wheels */}
          <circle cx="12" cy="24.5" r="2" fill={cartColor} />
          <circle cx="20" cy="24.5" r="2" fill={cartColor} />

          {/* Specular shine — gives glossy 3-D feel */}
          <path
            d="M10 13 L20 13 L19 16 L11 16 Z"
            fill="white"
            opacity="0.18"
          />
        </svg>

        {/* Back face — extra depth layer */}
        <div
          style={{
            position: 'absolute',
            inset: 2,
            borderRadius: 8,
            background: `linear-gradient(135deg, hsl(340 84% 55% / 0.12), hsl(280 70% 55% / 0.08))`,
            transform: 'translateZ(-8px)',
          }}
        />
      </motion.div>

      {/* Badge */}
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.4, opacity: 0, y: -4 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          className="absolute top-0 right-0 text-[9px] font-black w-[18px] h-[18px] flex items-center justify-center rounded-full text-white pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, hsl(340 84% 55%), hsl(340 84% 40%))',
            boxShadow: '0 2px 8px hsl(340 84% 50% / 0.6)',
            transform: 'translate(30%, -30%)',
            zIndex: 10,
          }}
        >
          {count > 9 ? '9+' : count}
        </motion.span>
      )}
    </div>
  );
}
