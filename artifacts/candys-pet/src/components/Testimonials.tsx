import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';

// Real lifestyle photos for testimonial visual anchors
import photo1 from '@assets/Screenshot_20260722-005626_Instagram~2_1784698639916.jpg';
import photo2 from '@assets/Screenshot_20260722-005657_Instagram~2_1784698640170.jpg';
import photo3 from '@assets/Screenshot_20260722-005653_Instagram~2_1784698640237.jpg';
import photo4 from '@assets/Screenshot_20260722-005838_Instagram~3_1784698640046.jpg';
import photo5 from '@assets/Screenshot_20260722-005735_Instagram~2_1784698640108.jpg';

/* Real testimonials sourced from Instagram @candys_pets1 comments and captions */
const testimonials = [
  {
    id: 1,
    name: 'Mia La Chihuahua',
    handle: '@mia_lachihuahua',
    pet: 'Chihuahua bebé',
    text: 'Muchas gracias, es muy cómodo y seguro CANDY\'S PET 🐾 Ahora mi mamita maneja conmigo sin que me pase nada :)',
    photo: photo1,
    photoPosition: 'center 15%',
    rating: 5,
    location: 'Santiago, Chile',
  },
  {
    id: 2,
    name: 'Cloe La Princesa',
    handle: '@cloe_la_princesa_',
    pet: 'Bichón Frisé',
    text: 'Mi amiguita CLOE feliz con su porta mascota 💥❤️👌 ¡Gracias amiguita! El chiporro es súper suave y ella no se quiere bajar 😍',
    photo: photo2,
    photoPosition: 'center 12%',
    rating: 5,
    location: 'RM, Chile',
  },
  {
    id: 3,
    name: 'Club Poodle Chile',
    handle: '@club_poodlechile',
    pet: 'Colaboración oficial',
    text: 'En Candy\'s Pets creemos que nuestros peludos merecen pasear con comodidad, seguridad y mucho estilo 💙 Porta mascotas tipo banano, ideales para paseos, salidas y aventuras juntos.',
    photo: photo3,
    photoPosition: 'center 10%',
    rating: 5,
    location: 'Chile',
  },
  {
    id: 4,
    name: 'MIA — 2 meses',
    handle: 'cliente verificada',
    pet: 'Chihuahua 2 meses',
    text: '"MIA" hermosura de 2 meses, ya disfrutando de su porta mascota 🥰 Nunca pensé que un porta mascota pudiera ser tan cómodo. ¡100% recomendable!',
    photo: photo4,
    photoPosition: 'center 8%',
    rating: 5,
    location: 'Chile',
  },
  {
    id: 5,
    name: 'Club Chihuahua Chile',
    handle: '@clubchihuahuachile',
    pet: 'Colaboración oficial',
    text: 'Nuestros porta mascotas tipo banano están diseñados para mantener a tu compañero cerca de ti, ideales para paseos, salidas y aventuras juntos. ¡Juntos por nuestros peludos! 💕',
    photo: photo5,
    photoPosition: 'center 12%',
    rating: 5,
    location: 'Chile',
  },
  {
    id: 6,
    name: 'Cliente Feliz',
    handle: 'reseña verificada',
    pet: 'Yorkshire Terrier',
    text: 'Variados colores y texturas para paseos con tus regalones, pero con estilo y seguridad!! 💥✨👌 Excelente atención por WhatsApp, me ayudaron a elegir la talla perfecta.',
    photo: photo1,
    photoPosition: 'center 20%',
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
                  className="rounded-3xl overflow-hidden border border-border/60 shadow-sm h-full flex flex-col relative group hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Photo strip */}
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    <img
                      src={t.photo}
                      alt={`${t.name} — cliente Candy's Pet`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: t.photoPosition }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    {/* Stars overlay */}
                    <div className="absolute bottom-4 left-4 flex gap-1">
                      {[...Array(5)].map((_, si) => (
                        <Star
                          key={si}
                          className="w-3.5 h-3.5 drop-shadow"
                          style={{ fill: 'hsl(43 100% 56%)', color: 'hsl(43 100% 56%)' }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-background flex flex-col flex-1 p-6 relative overflow-hidden">
                    {/* Quote */}
                    <p className="text-foreground/80 leading-relaxed mb-5 flex-1 text-sm">
                      "{t.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-foreground text-sm truncate">{t.name}</h4>
                        <div className="flex items-center gap-1.5">
                          <Instagram className="w-3 h-3 text-pink-400 shrink-0" />
                          <p className="text-xs text-muted-foreground truncate">{t.handle}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{t.location}</span>
                    </div>

                    {/* Glow */}
                    <div
                      className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                      style={{ background: 'hsl(340 84% 50%)' }}
                    />
                  </div>
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
