import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Clock3, MessageCircle, Ruler, ShoppingBag, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import { customProductWaLink } from '../lib/constants';
import { WhatsAppIcon } from './WhatsAppIcon';

import promoImage from '@assets/carnet-veterinario-whatsapp.jpg';
import colorOptionsImage from '@assets/IMG-20260923-WA0009_1790139464278.jpg';
import dataImage from '@assets/IMG-20260923-WA0008_1790139463654.jpg';
import vaccineImage from '@assets/IMG-20260923-WA0005_1790139463785.jpg';
import healthImage from '@assets/IMG-20260923-WA0006_1790139463722.jpg';
import growthImage from '@assets/IMG-20260923-WA0012_1790139464070.jpg';
import groomingImage from '@assets/IMG-20260923-WA0011_1790139464138.jpg';
import interiorImage from '@assets/IMG-20260923-WA0007_1790139463691.jpg';
import productVideo from '@assets/VID-20260923-WA0013_1790139464556.mp4';

const GALLERY = [
  { src: promoImage, label: 'Nueva línea personalizada' },
  { src: colorOptionsImage, label: 'Colores rosado y celeste' },
  { src: dataImage, label: 'Datos de la mascota' },
  { src: vaccineImage, label: 'Control de vacunas' },
  { src: healthImage, label: 'Control de salud' },
  { src: growthImage, label: 'Álbum de crecimiento' },
  { src: groomingImage, label: 'Peluquería opcional' },
  { src: interiorImage, label: 'Interior del carnet' },
];

const FORMAT_OPTIONS = [
  {
    id: 'A6',
    name: 'Pequeño A6',
    dimensions: '15,5 × 11 cm',
    price: 12990,
    description: 'Cómodo para llevar en cualquier bolso.',
  },
  {
    id: 'A5',
    name: 'Grande A5',
    dimensions: '21,5 × 15 cm',
    price: 15990,
    description: 'Formato tipo agenda, con más espacio.',
  },
] as const;

const COLOR_OPTIONS = [
  { id: 'Rosado', swatch: '#f38bb8' },
  { id: 'Celeste', swatch: '#75cbe9' },
] as const;

const CONTENTS = [
  'Datos de la mascota',
  'Control de vacunas',
  'Vacunación antirrábica',
  'Control de salud',
  'Peluquería opcional',
  'Álbum de crecimiento con fotografías',
];

export function PersonalizedVeterinaryNotebook() {
  const { addToCart, openCart } = useCart();
  const [format, setFormat] = useState<(typeof FORMAT_OPTIONS)[number]['id']>('A6');
  const [color, setColor] = useState<(typeof COLOR_OPTIONS)[number]['id']>('Rosado');
  const [galleryIndex, setGalleryIndex] = useState(0);

  const activeImage = GALLERY[galleryIndex];
  const selectedFormat = useMemo(
    () => FORMAT_OPTIONS.find((option) => option.id === format) ?? FORMAT_OPTIONS[0],
    [format],
  );

  const whatsappMessage = [
    "Hola Candy's Pet! 🐾 Quiero pedir un Carnet Veterinario Personalizado.",
    `Formato: ${selectedFormat.name} (${selectedFormat.dimensions})`,
    `Color: ${color}`,
    `Valor: $${selectedFormat.price.toLocaleString('es-CL')}`,
    'Quisiera coordinar la personalización, el valor y el despacho.',
  ].join('\n');

  const handleAddToCart = () => {
    addToCart({
      productId: 'custom-veterinary-notebook',
      name: `Carnet veterinario personalizado · ${selectedFormat.name}`,
      price: selectedFormat.price,
      image: promoImage,
      size: selectedFormat.id,
      color,
    });
    toast.success('¡Carnet agregado al carrito! 🐾', {
      description: `${selectedFormat.name} · ${color} · $${selectedFormat.price.toLocaleString('es-CL')}`,
      action: { label: 'Ver carrito', onClick: openCart },
      duration: 5000,
    });
  };

  const moveGallery = (direction: 1 | -1) => {
    setGalleryIndex((current) => (current + direction + GALLERY.length) % GALLERY.length);
  };

  return (
    <section
      id="carnet-veterinario"
      className="relative scroll-mt-24 overflow-hidden py-24"
      style={{ background: 'linear-gradient(180deg, hsl(220 25% 9%) 0%, hsl(220 27% 12%) 100%)' }}
    >
      <div className="pointer-events-none absolute -left-36 top-24 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-36 bottom-16 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="container relative mx-auto px-6 sm:px-10">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ background: 'hsl(190 80% 55% / 0.14)', color: 'hsl(190 85% 72%)' }}
          >
            Nuevo · Personalizado
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-5 font-heading text-4xl font-bold leading-tight text-white md:text-5xl"
          >
            Un carnet hecho para contar{' '}
            <span className="italic text-pink-400">su historia</span>
          </motion.h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            Guarda sus controles, vacunas y recuerdos en un carnet veterinario personalizado con el
            nombre y las fotografías de tu mascota.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 shadow-2xl"
          >
            <div className="relative aspect-square overflow-hidden sm:aspect-[1.08/1]">
              <motion.img
                key={activeImage.src}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                src={activeImage.src}
                alt={`${activeImage.label} del carnet veterinario personalizado`}
                className="h-full w-full object-cover"
              />
              {galleryIndex !== 0 && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Detalle</p>
                      <p className="mt-1 font-heading text-xl font-bold text-white">{activeImage.label}</p>
                    </div>
                    <span className="rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                      {galleryIndex + 1}/{GALLERY.length}
                    </span>
                  </div>
                </>
              )}
              <button
                type="button"
                aria-label="Imagen anterior"
                onClick={() => moveGallery(-1)}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:scale-105 hover:bg-black/70"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Imagen siguiente"
                onClick={() => moveGallery(1)}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:scale-105 hover:bg-black/70"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-8 gap-1.5 border-t border-white/10 bg-black/20 p-3">
              {GALLERY.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setGalleryIndex(index)}
                  aria-label={`Ver ${image.label}`}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition ${
                    galleryIndex === index ? 'border-pink-400 opacity-100' : 'border-transparent opacity-55 hover:opacity-90'
                  }`}
                >
                  <img src={image.src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
            <div className="border-t border-white/10 bg-black/20 p-3">
              <a
                href={customProductWaLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-[#25D366]/20 transition hover:bg-[#20bd5a]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Pedir este carnet por WhatsApp
                <MessageCircle className="h-4 w-4 opacity-75" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-xl sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Elige tu formato</p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-white">Carnet veterinario</h3>
              </div>
              <div className="rounded-2xl bg-pink-400/15 p-3 text-pink-300">
                <Ruler className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {FORMAT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFormat(option.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    format === option.id
                      ? 'border-pink-400 bg-pink-400/15 shadow-lg shadow-pink-900/20'
                      : 'border-white/10 bg-black/10 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white">{option.name}</span>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white/70">
                      {option.id}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-pink-200">{option.dimensions}</p>
                  <p className="mt-1 text-lg font-black text-white">
                    ${option.price.toLocaleString('es-CL')}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/50">{option.description}</p>
                </button>
              ))}
            </div>

            <div className="mt-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-white/55">Color de portada</p>
              <div className="flex flex-wrap gap-3">
                {COLOR_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setColor(option.id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      color === option.id
                        ? 'border-white bg-white text-slate-900'
                        : 'border-white/15 bg-black/10 text-white/75 hover:border-white/35'
                    }`}
                  >
                    <span className="h-3 w-3 rounded-full" style={{ background: option.swatch }} />
                    {option.id}
                    {color === option.id && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 grid gap-2.5">
              {CONTENTS.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3.5">
                <Clock3 className="h-5 w-5 shrink-0 text-pink-300" />
                <div>
                  <p className="text-xs font-bold text-white">Entrega</p>
                  <p className="text-xs text-white/55">4 días hábiles</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3.5">
                <Truck className="h-5 w-5 shrink-0 text-cyan-300" />
                <div>
                  <p className="text-xs font-bold text-white">Despacho</p>
                  <p className="text-xs text-white/55">Gratis sobre $49.900</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-pink-300/20 bg-pink-400/10 px-4 py-3">
              <span className="text-sm text-white/65">Valor seleccionado</span>
              <span className="text-2xl font-black text-pink-200">
                ${selectedFormat.price.toLocaleString('es-CL')}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-pink-500 px-6 py-4 text-center font-bold text-white shadow-lg shadow-pink-500/20 transition hover:-translate-y-0.5 hover:bg-pink-400"
            >
              <ShoppingBag className="h-5 w-5" />
              Agregar al carrito
            </button>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-6 rounded-[2rem] border border-white/10 bg-black/20 p-5 sm:p-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-pink-300">Mira los detalles</p>
            <h3 className="mt-2 font-heading text-2xl font-bold text-white">Personalizado para acompañarlos siempre</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              Revisa el proceso y el interior del carnet antes de pedirlo. Elige el formato y color que
              mejor represente a tu mascota.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl bg-black">
            <video
              className="aspect-video w-full object-cover"
              src={productVideo}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              aria-label="Video del carnet veterinario personalizado"
            />
          </div>
        </div>
      </div>
    </section>
  );
}