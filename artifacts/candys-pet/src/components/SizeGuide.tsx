import React from 'react';
import { motion } from 'framer-motion';
import { Ruler } from 'lucide-react';

export function SizeGuide() {
  return (
    <section id="size-guide" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-background rounded-l-[100px] -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-6 border border-secondary/20">
                <Ruler className="w-4 h-4" />
                <span>Encuentra la medida perfecta</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Guía de <span className="text-secondary italic">Tallas</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Elegir la talla correcta es fundamental para la comodidad de tu mascota y la tuya. Mide a tu peludo desde la base del cuello hasta la base de la cola.
              </p>

              <div className="space-y-6">
                <div className="bg-background rounded-2xl p-6 border border-border shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center shrink-0">
                    S
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Pequeño (S)</h4>
                    <p className="text-sm text-muted-foreground mb-2">Para mascotas de hasta 4 kg.</p>
                    <p className="text-xs font-medium text-foreground">Razas típicas: Chihuahua, Yorkshire Terrier, Gatos pequeños.</p>
                  </div>
                </div>

                <div className="bg-background rounded-2xl p-6 border border-border shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center shrink-0">
                    M
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Mediano (M)</h4>
                    <p className="text-sm text-muted-foreground mb-2">Para mascotas de 4 a 7 kg.</p>
                    <p className="text-xs font-medium text-foreground">Razas típicas: Poodle Toy, Pug, Gatos adultos medianos.</p>
                  </div>
                </div>

                <div className="bg-background rounded-2xl p-6 border border-border shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl flex items-center justify-center shrink-0">
                    L
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Grande (L)</h4>
                    <p className="text-sm text-muted-foreground mb-2">Para mascotas de 7 a 10 kg.</p>
                    <p className="text-xs font-medium text-foreground">Razas típicas: Bulldog Francés pequeño, Schnauzer miniatura.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-secondary/5 rounded-xl border border-secondary/20">
                <p className="text-sm text-foreground/80 font-medium">
                  💡 <span className="font-bold">Tip:</span> Si tu mascota es muy larga (como un Salchicha), te recomendamos subir una talla, independientemente del peso.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-border/50 p-4"
            >
              {/* Note: In a real app we'd use the generated illustration. 
                  Assuming it might not exist yet, we use a placeholder that looks nice. */}
              <div className="aspect-[4/3] bg-muted rounded-2xl overflow-hidden relative flex items-center justify-center">
                 <img 
                  src="/attached_assets/generated_images/size_guide_illustration.png" 
                  alt="Ilustración de cómo medir a tu mascota"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if generated image isn't available yet
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
