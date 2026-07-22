import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Mail } from 'lucide-react';

export function Location() {
  return (
    <section id="location" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl overflow-hidden shadow-xl border border-border/50">
          
          <div className="lg:w-1/3 p-8 lg:p-12 flex flex-col justify-center bg-primary/5">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6"
            >
              ¿Dónde <span className="text-primary italic">estamos</span>?
            </motion.h2>
            
            <p className="text-muted-foreground mb-8">
              Actualmente somos una tienda 100% online con envíos a todo Chile, pero puedes retirar tus pedidos directamente en nuestro taller previo aviso.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Taller (Solo Retiro)</h4>
                  <p className="text-sm text-muted-foreground">Providencia, Santiago, Chile.<br/>(Dirección exacta al confirmar tu compra)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-secondary shadow-sm shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Horario de Atención Online</h4>
                  <p className="text-sm text-muted-foreground">Lunes a Viernes: 10:00 - 19:00 hrs.<br/>Sábados: 10:00 - 14:00 hrs.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Contacto</h4>
                  <p className="text-sm text-muted-foreground">hola@candyspet.cl</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3 min-h-[400px]">
            {/* Google Maps iframe representation for Santiago, Providencia area */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26615.11197945081!2d-70.6276856!3d-33.428782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf6551b96a99%3A0xc48c412586745199!2sProvidencia%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '400px' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover"
              title="Mapa de ubicación Providencia"
            ></iframe>
          </div>
          
        </div>
      </div>
    </section>
  );
}
