import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Beneficios', href: '#benefits' },
    { name: 'Catálogo', href: '#products' },
    { name: 'Guía de Tallas', href: '#size-guide' },
    { name: 'Reseñas', href: '#testimonials' },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button 
            onClick={() => scrollTo('#home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md transition-transform group-hover:scale-105">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <span className="font-heading text-2xl font-bold text-foreground">
              Candy's <span className="text-primary italic">Pet</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => document.getElementById('cart-drawer')?.click()} 
              className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 text-foreground/80"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col pt-24 px-6 pb-6 md:hidden"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-foreground/80 hover:text-primary"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="font-heading text-2xl text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
            <div className="mt-auto">
              <p className="text-center text-sm text-muted-foreground">
                Diseñado con amor en Chile 🇨🇱
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
