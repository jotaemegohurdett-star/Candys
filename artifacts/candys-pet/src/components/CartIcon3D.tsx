import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface CartIcon3DProps {
  count: number;
  isScrolled: boolean;
  onClick: () => void;
}

/** Tiny orbiting sparkle dot */
function Orb({
  angle,
  radius,
  size,
  color,
  duration,
  delay,
}: {
  angle: number;
  radius: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        top: '50%',
        left: '50%',
        marginTop: -size / 2,
        marginLeft: -size / 2,
      }}
      animate={{
        x: [
          Math.cos((angle * Math.PI) / 180) * radius,
          Math.cos(((angle + 120) * Math.PI) / 180) * radius,
          Math.cos(((angle + 240) * Math.PI) / 180) * radius,
          Math.cos((angle * Math.PI) / 180) * radius,
        ],
        y: [
          Math.sin((angle * Math.PI) / 180) * radius,
          Math.sin(((angle + 120) * Math.PI) / 180) * radius,
          Math.sin(((angle + 240) * Math.PI) / 180) * radius,
          Math.sin((angle * Math.PI) / 180) * radius,
        ],
        scale: [1, 1.6, 0.7, 1],
        opacity: [0.9, 1, 0.5, 0.9],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/** Floating star sparkle */
function Sparkle({ x, y, delay, size }: { x: number; y: number; delay: number; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        scale: [0, 1.2, 0],
        opacity: [0, 1, 0],
        rotate: [0, 180],
      }}
      transition={{
        duration: 1.8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg viewBox="0 0 10 10" fill="none" style={{ width: '100%', height: '100%' }}>
        <path
          d="M5 0 L5.8 3.5 L9.5 5 L5.8 6.5 L5 10 L4.2 6.5 L0.5 5 L4.2 3.5 Z"
          fill="white"
          opacity="0.9"
        />
      </svg>
    </motion.div>
  );
}

export function CartIcon3D({ count, isScrolled, onClick }: CartIcon3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spring = { damping: 12, stiffness: 160, mass: 0.35 };

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [22, -22]), spring);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-22, 22]), spring);
  const scaleSpring = useSpring(1, { damping: 16, stiffness: 280 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
      mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
      scaleSpring.set(1.22);
    },
    [mouseX, mouseY, scaleSpring],
  );

  const onMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    scaleSpring.set(1);
  }, [mouseX, mouseY, scaleSpring]);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ width: 62, height: 62, perspective: 600 }}
      className="relative select-none cursor-pointer flex items-center justify-center"
    >
      {/* ── Rainbow aurora glow ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -10,
          background: isScrolled
            ? 'conic-gradient(from 0deg, hsl(340 84% 60%), hsl(280 80% 65%), hsl(200 90% 60%), hsl(340 84% 60%))'
            : 'conic-gradient(from 0deg, hsl(340 84% 75%), hsl(280 80% 75%), hsl(200 90% 75%), hsl(50 90% 70%), hsl(340 84% 75%))',
          filter: 'blur(14px)',
          opacity: isScrolled ? 0.55 : 0.7,
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Secondary soft glow pulse ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -4,
          background: 'radial-gradient(circle, hsl(340 84% 65% / 0.6) 0%, hsl(280 80% 65% / 0.3) 50%, transparent 80%)',
          filter: 'blur(10px)',
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Ground shadow ── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          bottom: 0,
          left: '50%',
          translateX: '-50%',
          width: 28,
          height: 6,
          background: 'hsl(340 84% 40% / 0.35)',
          filter: 'blur(5px)',
        }}
        animate={{ scaleX: [1, 0.6, 1], opacity: [0.5, 0.15, 0.5] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Orbiting sparkle dots ── */}
      <Orb angle={0}   radius={28} size={5} color="hsl(340 90% 70%)" duration={3.2} delay={0}    />
      <Orb angle={120} radius={26} size={4} color="hsl(200 90% 70%)" duration={3.2} delay={0.4}  />
      <Orb angle={240} radius={30} size={3.5} color="hsl(50 95% 65%)"  duration={3.2} delay={0.8}  />
      <Orb angle={60}  radius={24} size={3} color="hsl(280 80% 75%)" duration={4.0} delay={0.2}  />
      <Orb angle={180} radius={28} size={2.5} color="hsl(140 70% 65%)" duration={4.0} delay={1.0}  />

      {/* ── Floating ✦ sparkles ── */}
      <Sparkle x={4}  y={2}  delay={0}    size={7} />
      <Sparkle x={44} y={0}  delay={0.7}  size={5} />
      <Sparkle x={2}  y={36} delay={1.4}  size={4} />
      <Sparkle x={48} y={40} delay={2.1}  size={6} />

      {/* ── 3-D tiltable cart body ── */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: scaleSpring,
          transformStyle: 'preserve-3d',
          width: 46,
          height: 46,
          position: 'relative',
        }}
        animate={{ y: [0, -7, 0] }}
        transition={{ y: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } }}
      >
        {/* Glassmorphism pill background */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: isScrolled
              ? 'linear-gradient(135deg, hsl(340 84% 55%), hsl(280 75% 55%), hsl(200 85% 55%))'
              : 'linear-gradient(135deg, hsl(340 84% 65% / 0.95), hsl(280 75% 65% / 0.9), hsl(200 90% 65% / 0.85))',
            boxShadow: `
              0 8px 32px hsl(340 84% 50% / 0.55),
              0 2px 8px hsl(280 80% 55% / 0.4),
              inset 0 1px 0 hsl(0 0% 100% / 0.35)
            `,
            transform: 'translateZ(8px)',
          }}
          animate={{
            background: [
              'linear-gradient(135deg, hsl(340 84% 60%), hsl(280 75% 60%), hsl(200 85% 60%))',
              'linear-gradient(135deg, hsl(280 75% 60%), hsl(200 85% 60%), hsl(50 90% 65%))',
              'linear-gradient(135deg, hsl(200 85% 60%), hsl(50 90% 65%), hsl(340 84% 60%))',
              'linear-gradient(135deg, hsl(340 84% 60%), hsl(280 75% 60%), hsl(200 85% 60%))',
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        {/* Specular gloss highlight */}
        <div
          className="absolute rounded-2xl pointer-events-none"
          style={{
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)',
            transform: 'translateZ(9px)',
          }}
        />

        {/* Cart SVG — bold, white, lifted in Z */}
        <svg
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            transform: 'translateZ(14px)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))',
          }}
        >
          {/* Handle pole */}
          <line x1="6" y1="12" x2="11" y2="12" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
          {/* Main cart outline */}
          <path
            d="M11 12 L15 30 L31 30 L35 17 L13 17"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Cart body fill — semi-transparent white */}
          <path
            d="M13 17 L35 17 L31 30 L15 30 Z"
            fill="white"
            opacity="0.2"
          />
          {/* Inner shine line */}
          <line x1="15" y1="21" x2="33" y2="21" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
          {/* Wheels */}
          <circle cx="18" cy="34.5" r="3" fill="white" />
          <circle cx="28" cy="34.5" r="3" fill="white" />
          {/* Wheel shine */}
          <circle cx="17.2" cy="33.7" r="1" fill="white" opacity="0.55" />
          <circle cx="27.2" cy="33.7" r="1" fill="white" opacity="0.55" />
          {/* Star inside cart — the fun detail */}
          <path
            d="M23 19.5 L23.7 21.8 L26 21.8 L24.1 23.2 L24.8 25.5 L23 24.1 L21.2 25.5 L21.9 23.2 L20 21.8 L22.3 21.8 Z"
            fill="white"
            opacity="0.9"
          />
        </svg>

        {/* Back depth face */}
        <div
          style={{
            position: 'absolute',
            inset: 4,
            borderRadius: 12,
            background: 'linear-gradient(135deg, hsl(340 84% 35% / 0.6), hsl(280 75% 35% / 0.4))',
            transform: 'translateZ(-10px)',
          }}
        />
      </motion.div>

      {/* ── Count Badge ── */}
      {count > 0 && (
        <motion.div
          key={count}
          initial={{ scale: 0, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 600, damping: 16 }}
          className="absolute pointer-events-none flex items-center justify-center"
          style={{
            top: 0,
            right: 0,
            minWidth: 22,
            height: 22,
            borderRadius: 11,
            padding: '0 5px',
            background: 'linear-gradient(135deg, hsl(50 95% 60%), hsl(30 95% 55%))',
            boxShadow: '0 2px 12px hsl(40 90% 55% / 0.7), 0 0 0 2px white',
            transform: 'translate(35%, -35%)',
            zIndex: 20,
          }}
        >
          <motion.span
            className="text-[10px] font-black text-gray-900 leading-none"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {count > 9 ? '9+' : count}
          </motion.span>
        </motion.div>
      )}
    </div>
  );
}
