import React from 'react';
import { Heart, Instagram, Facebook, Ticket } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-white pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="font-heading text-2xl font-bold">
                Candy's <span className="text-primary italic">Pet</span>
              </span>
            </a>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Creamos slings y accesorios premium para que lleves a tu mascota a todas partes con el estilo y la comodidad que ambos merecen.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors">
                <Ticket className="w-5 h-5" /> {/* TikTok placeholder */}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-white/70 hover:text-primary transition-colors text-sm">Inicio</a></li>
              <li><a href="#benefits" className="text-white/70 hover:text-primary transition-colors text-sm">Beneficios</a></li>
              <li><a href="#products" className="text-white/70 hover:text-primary transition-colors text-sm">Catálogo</a></li>
              <li><a href="#size-guide" className="text-white/70 hover:text-primary transition-colors text-sm">Guía de Tallas</a></li>
              <li><a href="#testimonials" className="text-white/70 hover:text-primary transition-colors text-sm">Testimonios</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Soporte</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors text-sm">Preguntas Frecuentes</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors text-sm">Políticas de Envío</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors text-sm">Cambios y Devoluciones</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors text-sm">Términos y Condiciones</a></li>
              <li><a href="#" className="text-white/70 hover:text-primary transition-colors text-sm">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-white/70 text-sm mb-4">
              Suscríbete para recibir novedades y descuentos exclusivos.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
              />
              <button 
                type="submit"
                className="bg-primary text-white rounded-lg px-4 py-3 text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                Suscribirme
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Candy's Pet. Todos los derechos reservados.
          </p>
          <p className="text-white/50 text-sm">
            Diseñado en Chile 🇨🇱
          </p>
        </div>
      </div>
    </footer>
  );
}
