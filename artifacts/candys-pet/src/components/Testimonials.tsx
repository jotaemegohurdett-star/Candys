import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Instagram, Heart } from 'lucide-react';

import photo1 from '@assets/Screenshot_20260722-051201_WhatsApp~2_1784713749256.jpg';
import photo2 from '@assets/Screenshot_20260722-051400_WhatsApp~2_1784713749406.jpg';
import photo3 from '@assets/Screenshot_20260722-051510_WhatsApp_1784713749468.jpg';
import photo4 from '@assets/Screenshot_20260722-051518_WhatsApp_1784713749524.jpg';
import photo5 from '@assets/Screenshot_20260722-051400_WhatsApp~2_1784713749406.jpg';

const testimonials = [
  {
    id: 1,
    name: 'Mia La Chihuahua',
    handle: '@mia_lachihuahua',
    pet: 'Chihuahua 2 meses · Talla M',
    text: 'Muchas gracias, es muy cómodo y seguro CANDY\'S PET 🐾 Ahora mi mamita maneja conmigo sin que me pase nada. Desde que tengo el sling ya no lloro de ansiedad 🥺💕',
    photo: photo1,
    photoPosition: 'center 28%',
    rating: 5,
    location: 'Santiago',
    tag: '❤️ Reduce ansiedad',
  },
  {
    id: 2,
    name: 'Mamá de Lola',
    handle: 'cliente verificada',
    pet: 'Maltés 3 kg · Talla M',
    text: 'Mi Lola es senior, tiene 14 años y le cuesta caminar. Con el porta mascota sale a pasear todos los días y está feliz 🧡 Es terapéutico de verdad, se relaja completamente dentro. ¡Gracias Candy\'s Pet!',
    photo: photo2,
    photoPosition: 'center 18%',
    rating: 5,
    location: 'Providencia',
    tag: '🧡 Uso terapéutico',
  },
  {
    id: 3,
    name: 'Club Poodle Chile',
    handle: '@club_poodlechile',
    pet: 'Colaboración oficial',
    text: 'En Candy\'s Pets creemos que nuestros peludos merecen pasear con comodidad, seguridad y mucho estilo 💙 Porta mascotas tipo sling ideales para paseos, salidas y aventuras juntos. ¡Los recomendamos!',
    photo: photo3,
    photoPosition: 'center 20%',
    rating: 5,
    location: 'Chile',
    tag: '✅ Colaboración oficial',
  },
  {
    id: 4,
    name: 'MIA — 2 meses',
    handle: 'cliente verificada',
    pet: 'Chihuahua 2 meses · Talla M',
    text: '"MIA" hermosura de 2 meses, ya disfrutando de su porta mascota 🥰 Nunca pensé que un porta mascota pudiera ser tan cómodo. Se quedó dormida en menos de 5 minutos. ¡100% recomendable!',
    photo: photo4,
    photoPosition: 'center 22%',
    rating: 5,
    location: 'Chile',
    tag: '😴 Se duerme adentro',
  },
  {
    id: 5,
    name: 'Papá de Rocky y Coco',
    handle: 'cliente verificado',
    pet: '2 Chihuahuas · Talla L',
    text: 'Lo que no sabía es que en la talla L cabían mis dos chihuahuas juntos 😂🐾🐾 Ahora salimos los tres a todas partes. Súper cómodo para mí y ellos se ven felicísimos. ¡Qué invento más genial!',
    photo: photo5,
    photoPosition: 'center 18%',
    rating: 5,
    location: 'Las Condes',
    tag: '🐾🐾 2 perritos · Talla L',
  },
  {
    id: 6,
    name: 'Club Chihuahua Chile',
    handle: '@clubchihuahuachile',
    pet: 'Colaboración oficial',
    text: 'Nuestros porta mascotas tipo sling están diseñados para mantener a tu compañero cerca de ti, ideales para paseos, salidas y aventuras juntos. ¡Juntos por nuestros peludos! 💕',
    photo: photo1,
    photoPosition: 'center 20%',
    rating: 5,
    location: 'Chile',
    tag: '✅ Colaboración oficial',
  },
  {
    id: 7,
    name: 'Mamá de Tobi',
    handle: 'cliente verificada',
    pet: 'Schnauzer mini · Talla L',
    text: 'Tobi tiene displasia y antes sufría mucho en los paseos. Con el sling de Candy\'s Pet puede salir sin dolor y sin estrés 🌿 La atención fue increíble, me ayudaron a elegir la talla perfecta por WhatsApp.',
    photo: photo2,
    photoPosition: 'center 35%',
    rating: 5,
    location: 'Ñuñoa',
    tag: '🌿 Terapéutico · displasia',
  },
  {
    id: 8,
    name: 'Cliente Feliz',
    handle: 'reseña verificada',
    pet: 'Yorkshire Terrier · Talla M',
    text: 'Variados colores y texturas para paseos con tus regalones, pero con estilo y seguridad!! 💥✨👌 Excelente atención, me ayudaron a elegir el color ideal. ¡El chiporro es súper suave!',
    photo: photo3,
    photoPosition: 'center 20%',
    rating: 5,
    location: 'Santiago',
    tag: '✨ Súper suave',
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="testimonials" className="py-24 overflow-hidden" style={{ background: 'hsl(220 25% 7%)' }}>
      <div className="container mx-auto px-6 sm:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ background: 'hsl(340 84% 50% / 0.14)', color: 'hsl(340 84% 68%)' }}
            >
              <Heart className="w-3.5 h-3.5" />
              La familia Candy's Pet
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl font-bold text-white"
            >
              Lo que dicen{' '}
              <span className="italic" style={{ color: 'hsl(340 84% 65%)' }}>
                nuestros clientes
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="mt-3 text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Cientos de familias ya forman parte de nuestra comunidad. Perritos felices, dueños tranquilos. 🐾
            </motion.p>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all hover:bg-white/5"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all"
              style={{ background: 'hsl(340 84% 50%)', boxShadow: '0 4px 20px hsl(340 84% 50% / 0.4)' }}
              aria-label="Siguiente"
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
                  className="rounded-3xl overflow-hidden h-full flex flex-col group hover:scale-[1.01] transition-transform duration-300"
                  style={{
                    background: 'hsl(220 25% 12%)',
                    border: '1px solid hsl(220 25% 18%)',
                    boxShadow: '0 0 0 0 hsl(340 84% 50% / 0)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px hsl(220 25% 4% / 0.5)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 0 hsl(340 84% 50% / 0)';
                  }}
                >
                  {/* Photo strip */}
                  <div className="relative h-52 overflow-hidden bg-gray-900">
                    <img
                      src={t.photo}
                      alt={`${t.name} — cliente Candy's Pet`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: t.photoPosition }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                    {/* Stars overlay */}
                    <div className="absolute bottom-4 left-4 flex gap-1">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} className="w-3.5 h-3.5 drop-shadow-md"
                          style={{ fill: 'hsl(43 100% 56%)', color: 'hsl(43 100% 56%)' }} />
                      ))}
                    </div>

                    {/* Pet label */}
                    <div className="absolute top-4 right-4">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                        style={{ background: 'hsl(340 84% 50% / 0.85)', backdropFilter: 'blur(8px)' }}
                      >
                        {t.pet}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 relative overflow-hidden">
                    {/* Giant decorative quote */}
                    <div
                      className="absolute -top-2 -left-1 font-heading text-9xl font-bold leading-none select-none pointer-events-none"
                      style={{ color: 'hsl(340 84% 50% / 0.12)' }}
                      aria-hidden="true"
                    >
                      "
                    </div>

                    {/* Tag */}
                    {t.tag && (
                      <span
                        className="relative z-10 self-start text-[10px] font-bold px-2.5 py-1 rounded-full mb-3"
                        style={{ background: 'hsl(340 84% 50% / 0.14)', color: 'hsl(340 84% 65%)' }}
                      >
                        {t.tag}
                      </span>
                    )}

                    {/* Quote text */}
                    <p
                      className="relative z-10 leading-relaxed mb-5 flex-1 text-sm"
                      style={{ color: 'rgba(255,255,255,0.72)' }}
                    >
                      {t.text}
                    </p>

                    {/* Author */}
                    <div
                      className="flex items-center gap-3 pt-4"
                      style={{ borderTop: '1px solid hsl(220 25% 22%)' }}
                    >
                      {/* Avatar initials */}
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: 'linear-gradient(135deg, hsl(340 84% 50%), hsl(186 96% 43%))' }}
                      >
                        {t.name[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-white text-sm truncate">{t.name}</h4>
                        <div className="flex items-center gap-1.5">
                          <Instagram className="w-3 h-3 text-pink-400 shrink-0" />
                          <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.42)' }}>
                            {t.handle}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {t.location}
                      </span>
                    </div>

                    {/* Subtle glow on hover */}
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
            href="https://www.instagram.com/candys_pets1/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
            style={{ color: 'hsl(340 84% 60%)' }}
          >
            <Instagram className="w-4 h-4" />
            Ver más reseñas en Instagram @candys_pets1
          </a>
        </motion.div>
      </div>
    </section>
  );
}
