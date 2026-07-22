import React from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  const scrollToProducts = () => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[90svh] flex items-center justify-center pt-20 overflow-hidden bg-[#FFF8F5]">
      {/* Decorative floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: Math.random() * 100 + 50 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              y: [Math.random() * 100 + 50, -100],
              x: Math.random() * 200 - 100
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-10%',
              width: Math.random() * 15 + 5 + 'px',
              height: Math.random() * 15 + 5 + 'px',
              backgroundColor: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)',
              filter: 'blur(2px)'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
                Lujo y comodidad para tu mejor amigo
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-[1.1] mb-6">
                El abrazo que <br/>
                <span className="text-primary italic">tu mascota</span> merece.
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
                Slings premium diseñados en Chile. Porque llevarlos contigo siempre debería ser cómodo, seguro y con mucho estilo.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <button 
                  onClick={scrollToProducts}
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-medium text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 active:scale-95"
                >
                  Ver Catálogo
                </button>
                <button 
                  onClick={() => document.querySelector('#size-guide')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-foreground rounded-full font-medium text-lg border border-border hover:border-primary hover:text-primary transition-all active:scale-95"
                >
                  Guía de Tallas
                </button>
              </div>
            </motion.div>
          </div>
          <div className="flex-1 w-full max-w-md md:max-w-none relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80" 
                alt="Perro feliz en un sling" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xl">
                  ✨
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Hecho a mano</p>
                  <p className="text-xs text-muted-foreground">Calidad premium</p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Background decorative blob */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
