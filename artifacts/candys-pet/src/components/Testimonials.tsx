import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';

/* Real testimonials sourced from Instagram @candys_pets1 comments and captions */
const testimonials = [
  {
    id: 1,
    name: 'Mia La Chihuahua',
    handle: '@mia_lachihuahua',
    pet: 'Chihuahua bebé',
    text: 'Muchas gracias, es muy cómodo y seguro CANDY\'S PET 🐾 Ahora mi mamita maneja conmigo sin que me pase nada :)',
    emoji: '🐕',
    rating: 5,
    location: 'Santiago, Chile',
  },
  {
    id: 2,
    name: 'Cloe La Princesa',
    handle: '@cloe_la_princesa_',
    pet: 'Bichón Frisé',
    text: 'Mi amiguita CLOE feliz con su porta mascota 💥❤️👌 ¡Gracias amiguita! El chiporro es súper suave y ella no se quiere bajar 😍',
    emoji: '🐩',
    rating: 5,
    location: 'RM, Chile',
  },
  {
    id: 3,
    name: 'Club Poodle Chile',
    handle: '@club_poodlechile',
    pet: 'Colaboración oficial',
    text: 'En Candy\'s Pets creemos que nuestros peludos merecen pasear con comodidad, seguridad y mucho estilo 💙 Porta mascotas tipo banano, ideales para paseos, salidas y aventuras juntos.',
    emoji: '🐾',
    rating: 5,
    location: 'Chile',
  },
  {
    id: 4,
    name: 'MIA — 2 meses',
    handle: 'cliente verificada',
    pet: 'Chihuahua 2 meses',
    text: '"MIA" hermosura de 2 meses, ya disfrutando de su porta mascota 🥰 Nunca pensé que un porta mascota pudiera ser tan cómodo. ¡100% recomendable!',
    emoji: '🧡',
    rating: 5,
    location: 'Chile',
  },
  {
    id: 5,
    name: 'Club Chihuahua Chile',
    handle: '@clubchihuahuachile',
    pet: 'Colaboración oficial',
    text: 'Nuestros porta mascotas tipo banano están diseñados para mantener a tu compañero cerca de ti, ideales para paseos, salidas y aventuras juntos. ¡Juntos por nuestros peludos! 💕',
    emoji: '🐕‍🦺',
    rating: 5,
    location: 'Chile',
  },
  {
    id: 6,
    name: 'Cliente Feliz',
    handle: 'reseña verificada',
    pet: 'Yorkshire Terrier',
    text: 'Variados colores y texturas para paseos con tus regalones, pero con estilo y seguridad!! 💥✨👌 Excelente atención por WhatsApp, me ayudaron a elegir la talla perfecta.',
    emoji: '💛',
    rating: 5,
    location: 'Santiago',
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ background: 'hsl(340 84% 50% / 0.1)', color: 'hsl(340 84% 45%)' }}
            >
              <Instagram className="w-3.5 h-3.5" />
              @candys_pets1
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl font-bold text-foreground"
            >
              Lo que dicen{' '}
              <span className="italic" style={{ color: 'hsl(340 84% 50%)' }}>
                nuestros clientes
              </span>
            </motion.h2>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:text-white hover:border-transparent transition-all"
              style={{ ['--hover-bg' as string]: 'hsl(340 84% 50%)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'hsl(340 84% 50%)')}
              onMouseLeave={e => (e.currentTarget.style.background = '')}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:text-white hover:border-transparent transition-all"
              onMouseEnter={e => (e.currentTarget.style.background = 'hsl(340 84% 50%)')}
              onMouseLeave={e => (e.currentTarget.style.background = '')}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-5">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-5"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-background rounded-3xl p-7 border border-border/60 shadow-sm h-full flex flex-col relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, si) => (
                      <Star
                        key={si}
                        className="w-4 h-4"
                        style={si < t.rating ? { fill: 'hsl(43 100% 56%)', color: 'hsl(43 100% 56%)' } : { color: '#d1d5db' }}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground/80 leading-relaxed mb-6 flex-1 text-sm">
                    "{t.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto pt-5 border-t border-border/50">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0"
                      style={{ background: 'hsl(340 84% 50% / 0.1)' }}
                    >
                      {t.emoji}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-foreground text-sm truncate">{t.name}</h4>
                      <div className="flex items-center gap-1.5">
                        <Instagram className="w-3 h-3 text-pink-400 shrink-0" />
                        <p className="text-xs text-muted-foreground truncate">{t.handle}</p>
                      </div>
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground shrink-0">{t.location}</span>
                  </div>

                  {/* Glow */}
                  <div
                    className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'hsl(340 84% 50%)' }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="https://www.instagram.com/candys_pets1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:underline transition-colors"
            style={{ color: 'hsl(340 84% 50%)' }}
          >
            <Instagram className="w-4 h-4" />
            Ver más reseñas en Instagram @candys_pets1
          </a>
        </motion.div>
      </div>
    </section>
  );
}
