import React from 'react';

const items = [
  { icon: '⭐', label: '+5.300 Seguidores' },
  { icon: '🇨🇱', label: 'Hecho a mano en Chile' },
  { icon: '🐾', label: 'Cientos de mascotas felices' },
  { icon: '📦', label: 'Envíos a todo Chile' },
  { icon: '✂️', label: 'Fabricación a pedido' },
  { icon: '💕', label: '100% Artesanal' },
  { icon: '🔄', label: 'Cambios sin costo' },
  { icon: '⚡', label: 'Respuesta inmediata por WhatsApp' },
];

// Duplicate for seamless loop
const track = [...items, ...items];

export function TrustBar() {
  return (
    <div
      className="relative overflow-hidden py-3.5 border-y border-white/10"
      style={{ background: 'hsl(220 25% 9%)' }}
      aria-hidden="true"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, hsl(220 25% 9%), transparent)' }} />
      <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, hsl(220 25% 9%), transparent)' }} />

      <div className="flex trust-bar-track whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-8 text-sm font-medium shrink-0"
            style={{ color: 'hsl(340 84% 70%)' }}
          >
            <span>{item.icon}</span>
            <span className="text-white/60">{item.label}</span>
            <span className="ml-6 text-white/15">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
