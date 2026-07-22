import React from 'react';

const items = [
  { icon: '⭐', label: '+5.300 Seguidores' },
  { icon: '🇨🇱', label: 'Hecho a mano en Chile' },
  { icon: '🐾', label: 'Cientos de mascotas felices' },
  { icon: '📦', label: 'Envíos a todo Chile' },
  { icon: '✂️', label: 'Fabricación a pedido' },
  { icon: '💕', label: '100% Artesanal' },
  { icon: '🔄', label: 'Cambios sin costo' },
  { icon: '⚡', label: 'Atención 24 horas' },
  { icon: '🧡', label: 'Apto para mascotas con discapacidad' },
];

const track = [...items, ...items];

export function TrustBar() {
  return (
    <div
      className="relative overflow-hidden border-y"
      style={{
        background: 'hsl(220 25% 7%)',
        borderColor: 'hsl(220 25% 14%)',
      }}
      aria-hidden="true"
    >
      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(340 84% 50% / 0.6), hsl(186 96% 43% / 0.6), transparent)' }}
      />

      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, hsl(220 25% 7%), transparent)' }}
      />
      <div
        className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, hsl(220 25% 7%), transparent)' }}
      />

      <div className="flex trust-bar-track whitespace-nowrap py-3">
        {track.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 px-7 text-sm font-medium shrink-0">
            <span className="text-base">{item.icon}</span>
            <span style={{ color: 'rgba(255,255,255,0.62)' }}>{item.label}</span>
            <span
              className="ml-5 w-1 h-1 rounded-full shrink-0"
              style={{ background: 'hsl(340 84% 55% / 0.5)' }}
            />
          </span>
        ))}
      </div>

      {/* Bottom shimmer line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(186 96% 43% / 0.4), hsl(340 84% 50% / 0.4), transparent)' }}
      />
    </div>
  );
}
