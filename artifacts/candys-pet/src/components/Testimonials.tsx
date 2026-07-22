import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Valentina M.",
    pet: "Dueña de 'Luna' (Poodle Toy)",
    text: "Compré el sling rosado y ha sido la mejor inversión. Luna va súper cómoda y yo tengo las manos libres para llevar mis bolsas. La calidad de la tela es increíble, se nota que está hecho con cariño.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    id: 2,
    name: "Camila F.",
    pet: "Dueña de 'Max' (Salchicha)",
    text: "Tenía dudas por lo largo que es Max, pero seguí la recomendación de la talla L y le quedó perfecto. Ahora los paseos en metro son súper fáciles y a él le encanta ir mirando todo.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    id: 3,
    name: "Daniela R.",
    pet: "Dueña de 'Milo' (Gato)",
    text: "Mi gato odiaba las jaulas tradicionales. Con el sling de chiporro va calientito al veterinario y va mucho más tranquilo pegado a mi pecho. 10/10 totalmente recomendado.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  {
    id: 4,
    name: "Sofía T.",
    pet: "Dueña de 'Kira' (Pug)",
    text: "El diseño sport malla es la vida para el verano en Santiago. Kira no se acalora nada y yo no transpiro. Excelente atención por WhatsApp para elegir la talla.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 4
  }
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="testimonials" className="py-24 bg-[#FFF8F5] relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
             <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4"
            >
              Historias de <span className="text-primary italic">Amor</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Descubre por qué cientos de familias en Chile confían en Candy's Pet para llevar a sus mejores amigos.
            </motion.p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors bg-white shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors bg-white shadow-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-4">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 border border-border/50 shadow-sm h-full flex flex-col relative"
                >
                  <Quote className="absolute top-8 right-8 w-10 h-10 text-primary/10" />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'fill-secondary text-secondary' : 'text-muted'}`} />
                    ))}
                  </div>
                  
                  <p className="text-foreground/80 leading-relaxed mb-8 flex-1 italic">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div>
                      <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.pet}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
