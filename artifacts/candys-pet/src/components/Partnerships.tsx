import React from 'react';
import { motion } from 'framer-motion';
import { Truck, RotateCcw, HeadphonesIcon } from 'lucide-react';

export function Partnerships() {
  return (
    <section className="py-16 border-y border-border bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center p-6"
          >
            <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center text-primary mb-4 shadow-sm border border-border/50">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Envíos a todo Chile</h3>
            <p className="text-muted-foreground text-sm">
              Despachamos de Arica a Punta Arenas vía Starken o Chilexpress.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center text-center p-6"
          >
            <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center text-secondary mb-4 shadow-sm border border-border/50">
              <RotateCcw className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Cambios Fáciles</h3>
            <p className="text-muted-foreground text-sm">
              ¿No le quedó bien la talla? Tienes 15 días para solicitar un cambio.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center text-center p-6"
          >
            <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center text-primary mb-4 shadow-sm border border-border/50">
              <HeadphonesIcon className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Atención Personalizada</h3>
            <p className="text-muted-foreground text-sm">
              Asesoría directa por WhatsApp para elegir el producto perfecto.
            </p>
          </motion.div>

        </div>

        <div className="mt-16 text-center">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-6">Confían en nosotros</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using placeholder logos */}
            <div className="text-xl font-heading font-bold">Starken</div>
            <div className="text-xl font-heading font-bold">Chilexpress</div>
            <div className="text-xl font-heading font-bold">Webpay Plus</div>
            <div className="text-xl font-heading font-bold">MercadoPago</div>
          </div>
        </div>
      </div>
    </section>
  );
}
