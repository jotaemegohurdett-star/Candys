import React from 'react';
import { Instagram, Heart, ExternalLink, Mail } from 'lucide-react';
import { useLocation } from 'wouter';
import logoImg from '@assets/Screenshot_20260721-214654_Instagram_2-removebg-preview_1784688274639.png';
import { WhatsAppIcon } from './WhatsAppIcon';

const navColumns = [
  {
    heading: 'Catálogo',
    links: [
      { label: 'Porta Mascota Clásico',    href: '#products' },
      { label: 'Corderito Invierno',       href: '#products' },
      { label: 'Estampados Especiales',    href: '#products' },
      { label: 'Modelo Unisex',            href: '#products' },
    ],
  },
  {
    heading: 'Información',
    links: [
      { label: 'Guía de Tallas',  href: '#size-guide' },
      { label: 'Beneficios',      href: '#benefits' },
      { label: 'Reseñas',         href: '#testimonials' },
      { label: 'Contacto',        href: '#location' },
    ],
  },
];

const trustBadges = [
  { icon: '🔒', title: 'Pago Seguro',       desc: 'Transferencia o efectivo coordinado' },
  { icon: '📦', title: 'Envío a todo Chile', desc: 'Starken · Correos · Retiro en Santiago' },
  { icon: '🔄', title: 'Cambios sin costo', desc: 'Si la talla no queda perfecta' },
  { icon: '✂️', title: 'Hecho a pedido',   desc: 'Colores y telas personalizadas' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [, navigate] = useLocation();

  return (
    <footer
      className="text-white"
      style={{ background: 'hsl(220 25% 5%)' }}
    >
      {/* Top accent line */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(340 84% 50% / 0.6), hsl(186 96% 43% / 0.5), transparent)' }}
      />

      <div className="container mx-auto px-6 sm:px-10 pt-20 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="inline-flex items-center gap-3 mb-6 group">
              <img
                src={logoImg}
                alt="Candy's Pet logo"
                className="w-12 h-12 rounded-full object-cover group-hover:scale-105 transition-transform shadow-lg"
                style={{ boxShadow: '0 0 0 2px hsl(340 84% 50% / 0.3)' }}
              />
              <span className="font-heading text-2xl font-bold">
                Candy's{' '}
                <span className="italic" style={{ color: 'hsl(340 84% 62%)' }}>
                  Pet
                </span>
              </span>
            </a>

            <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: 'rgba(255,255,255,0.48)' }}>
              Porta mascotas tipo banano, hechos a mano con amor en Chile 🇨🇱. Para que lleves a tu perrito o gatito a todas partes con comodidad, seguridad y estilo.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/candys_pets1/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/12 text-white/50 hover:border-transparent hover:text-white transition-all group"
                style={{ '--hover-bg': 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' } as React.CSSProperties}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; }}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/56936693300"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/12 text-white/50 hover:border-transparent hover:text-white transition-all text-lg"
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'hsl(142 70% 42%)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; }}
              >
                💬
              </a>
              <a
                href="https://www.tiktok.com/@candys_pets1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/12 text-white/50 hover:bg-black hover:border-white/30 hover:text-white transition-all text-base"
              >
                ♪
              </a>
              <a
                href="mailto:contacto@candyspet.cl"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/12 text-white/50 hover:border-transparent hover:text-white transition-all"
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'hsl(220 70% 55%)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ''; }}
                title="contacto@candyspet.cl"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Email visible */}
            <a
              href="mailto:contacto@candyspet.cl"
              className="inline-flex items-center gap-2 mt-4 text-sm transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              <Mail className="w-3.5 h-3.5" />
              contacto@candyspet.cl
            </a>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-heading font-bold text-base mb-6 text-white tracking-wide">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-white flex items-center gap-1.5 group"
                      style={{ color: 'rgba(255,255,255,0.42)' }}
                    >
                      <span className="w-0 overflow-hidden group-hover:w-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        style={{ color: 'hsl(340 84% 60%)' }}>›</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {trustBadges.map((b) => (
            <div
              key={b.title}
              className="flex flex-col items-center text-center gap-2.5 p-5 rounded-2xl transition-colors hover:bg-white/5"
              style={{ background: 'hsl(220 25% 9%)', border: '1px solid hsl(220 25% 15%)' }}
            >
              <span className="text-2xl">{b.icon}</span>
              <p className="text-white font-semibold text-xs tracking-wide">{b.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.33)' }}>{b.desc}</p>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA strip */}
        <div
          className="rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10"
          style={{
            background: 'hsl(340 84% 50% / 0.1)',
            border: '1px solid hsl(340 84% 50% / 0.22)',
          }}
        >
          <p className="text-sm text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.72)' }}>
            ¿Quieres un color personalizado? Escríbenos y lo hacemos para ti 🎨
          </p>
          <a
            href="https://wa.me/56936693300?text=Hola!%20Quisiera%20un%20porta%20mascota%20personalizado%20%F0%9F%90%BE"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'hsl(340 84% 50%)', boxShadow: '0 4px 18px hsl(340 84% 50% / 0.38)' }}
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pedido personalizado
          </a>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid hsl(220 25% 12%)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            <button
              onClick={() => navigate('/admin')}
              className="cursor-default hover:cursor-default focus:outline-none"
              style={{ color: 'inherit', background: 'none', border: 'none', padding: 0 }}
              aria-hidden="true"
              tabIndex={-1}
            >©</button>
            {' '}{currentYear} Candy's Pet — Lorena Abarca. Todos los derechos reservados.
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Hecho con{' '}
            <Heart className="w-3 h-3 fill-pink-400 text-pink-400 mx-0.5" />
            en Santiago, Chile
          </p>
        </div>
      </div>
    </footer>
  );
}
