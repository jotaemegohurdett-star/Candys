import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Feather, Sparkles } from 'lucide-react';

const benefits = [
  {
    icon: <Heart className="w-6 h-6 text-primary" />,
    title: "Vínculo Cercano",
    description: "Mantiene a tu mascota junto a tu pecho, calmando su ansiedad y fortaleciendo su conexión."
  },
  {
    icon: <Feather className="w-6 h-6 text-secondary" />,
    title: "Ergonomía Total",
    description: "Distribuye el peso de manera uniforme, cuidando tu espalda incluso en paseos largos."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "Seguro y Resistente",
    description: "Materiales de alta durabilidad con costuras reforzadas y gancho de seguridad interior."
  },
  {
    icon: <Sparkles className="w-6 h-6 text-secondary" />,
    title: "Estilo Único",
    description: "Diseños exclusivos y telas suaves que combinan con tu outfit diario."
  }
];

export function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4"
          >
            ¿Por qué elegir un <span className="text-primary italic">Sling</span>?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Más que un accesorio de transporte, es una forma de mantener a tu mascota segura y cómoda mientras tienes las manos libres.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-3xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
              
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
