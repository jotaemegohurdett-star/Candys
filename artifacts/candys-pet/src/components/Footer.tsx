import React from 'react';
import { Instagram, Heart } from 'lucide-react';
import logoImg from '@assets/Screenshot_20260721-214654_Instagram_2-removebg-preview_1784688274639.png';

const navColumns = [
  {
    heading: 'Catálogo',
    links: [
      { label: 'Porta Mascota Clásico', href: '#products' },
      { label: 'Corderito Invierno', href: '#products' },
      { label: 'Estampados Especiales', href: '#products' },
      { label: 'Modelo Unisex', href: '#products' },
    ],
  },
  {
    heading: 'Información',
    links: [
      { label: 'Guía de Tallas', href: '#size-guide' },
      { label: 'Beneficios', href: '#benefits' },
      { label: 'Reseñas', href: '#testimonials' },
      { label: 'Contacto', href: '#location' },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: 'hsl(220 25% 6%)' }} className="text-white pt-20 pb-10">
      <div className="container mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="inline-flex items-center gap-3 mb-6 group">
              <img
                src={logoImg}
                alt="Candy's Pet logo"
                className="w-12 h-12 rounded-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="font-heading text-2xl font-bold">
                Candy's{' '}
                <span className="italic" style={{ color: 'hsl(340 84% 60%)' }}>
                  Pet
                </span>
              </span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
              Porta mascotas tipo banano, hechos a mano con amor en Chile 🇨🇱. Para que lleves a tu perrito o gatito a todas partes con comodidad, seguridad y estilo.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/candys_pets1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/15 text-white/60 hover:border-pink-400 hover:text-pink-400 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/56936693300"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/15 text-white/60 hover:border-green-400 hover:text-green-400 transition-all text-lg"
              >
                💬
              </a>
              <a
                href="https://www.tiktok.com/@candys_pets1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-white/15 text-white/60 hover:border-white hover:text-white transition-all text-lg"
              >
                ♪
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-heading font-bold text-base mb-6 text-white">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/45 hover:text-white text-sm transition-colors"
                    >
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
          {[
            { icon: '🔒', title: 'Pago Seguro', desc: 'Transferencia o efectivo coordinado' },
            { icon: '📦', title: 'Envío a todo Chile', desc: 'Starken · Correos · Retiro en Santiago' },
            { icon: '🔄', title: 'Cambios sin costo', desc: 'Si la talla no queda perfecta' },
            { icon: '✂️', title: 'Hecho a pedido', desc: 'Colores y telas personalizadas' },
          ].map((b) => (
            <div
              key={b.title}
              className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl"
              style={{ background: 'hsl(220 25% 12%)', border: '1px solid hsl(220 25% 18%)' }}
            >
              <span className="text-2xl">{b.icon}</span>
              <p className="text-white font-semibold text-xs">{b.title}</p>
              <p className="text-white/35 text-xs leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA strip */}
        <div
          className="rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10"
          style={{ background: 'hsl(340 84% 50% / 0.12)', border: '1px solid hsl(340 84% 50% / 0.25)' }}
        >
          <p className="text-white/80 text-sm text-center sm:text-left">
            ¿Quieres un color personalizado? Escríbenos y lo hacemos para ti 🎨
          </p>
          <a
            href="https://wa.me/56936693300?text=Hola!%20Quisiera%20un%20porta%20mascota%20personalizado%20%F0%9F%90%BE"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'hsl(340 84% 50%)' }}
          >
            Pedido personalizado
          </a>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {currentYear} Candy's Pet — Lorena Abarca. Todos los derechos reservados.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1">
            Hecho con <Heart className="w-3 h-3 fill-pink-400 text-pink-400" /> en Santiago, Chile
          </p>
        </div>
      </div>
    </footer>
  );
}
