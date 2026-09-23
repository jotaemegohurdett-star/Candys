import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Logo3D } from './Logo3D';
import { CartIcon3D } from './CartIcon3D';
import { WhatsAppIcon } from './WhatsAppIcon';
import logoImg from '@assets/Screenshot_20260721-214654_Instagram_2-removebg-preview_1784688274639.png';

const navLinks = [
  { name: 'Inicio', href: '#home' },
  { name: 'Beneficios', href: '#benefits' },
  { name: 'Catálogo', href: '#products' },
  { name: 'Personalizados', href: '#carnet-veterinario' },
  { name: 'Tazones', href: '#tazones-personalizados' },
  { name: 'Guía de Tallas', href: '#size-guide' },
  { name: 'Reseñas', href: '#testimonials' },
  { name: 'Contacto', href: '#location' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 sm:px-10 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => scrollTo('#home')} className="flex items-center gap-3">
            <Logo3D src={logoImg} alt="Candy's Pet logo" size={isScrolled ? 64 : 80} />
            <span
              className={`font-heading text-xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              Candy's{' '}
              <span className="italic" style={{ color: 'hsl(340 84% 55%)' }}>
                Pet
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium transition-colors duration-200 hover:opacity-100 ${
                  isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Cart 3D */}
            <CartIcon3D count={totalItems} isScrolled={isScrolled} onClick={openCart} />

            {/* WhatsApp pill — desktop */}
            <a
              href="https://wa.me/56936693300?text=Hola%20Candy's%20Pet!%20Me%20gustar%C3%ADa%20consultar%20sobre%20sus%20porta%20mascotas%20%F0%9F%90%BE"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'hsl(340 84% 50%)' }}
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>

            {/* Hamburger */}
            <button
              className={`md:hidden p-2 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-0 z-50 flex flex-col bg-[hsl(220_25%_9%)] px-8 py-10 md:hidden"
          >
            {/* Close */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white"
              aria-label="Cerrar menú"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <Logo3D src={logoImg} alt="Candy's Pet" size={72} />
              <span className="font-heading text-white text-xl font-bold">
                Candy's <span className="italic" style={{ color: 'hsl(340 84% 60%)' }}>Pet</span>
              </span>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left font-heading text-3xl font-bold text-white/80 hover:text-white py-2 transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}
            </nav>

            {/* Bottom */}
            <div className="mt-auto space-y-4">
              <a
                href="https://wa.me/56936693300"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-semibold text-white"
                style={{ background: 'hsl(340 84% 50%)' }}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Escribir por WhatsApp
              </a>
              <p className="text-center text-sm text-white/30">
                Diseñado con amor en Chile 🇨🇱
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
