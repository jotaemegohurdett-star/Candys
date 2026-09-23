import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { customProductWaLink } from '../lib/constants';
import { WhatsAppIcon } from './WhatsAppIcon';

import dogSampleImage from '@assets/IMG-20260923-WA0060_1790140389348.jpg';
import frontSampleImage from '@assets/IMG-20260923-WA0061_1790140389391.jpg';
import protectedBackImage from '@assets/llavero-reverso-datos-protegidos.jpg';

const GALLERY = [
  { src: dogSampleImage, label: 'Ejemplo personalizado' },
  { src: frontSampleImage, label: 'Detalle de la chapita' },
  { src: protectedBackImage, label: 'Reverso con datos protegidos' },
];

export function PersonalizedKeychain() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const activeImage = GALLERY[galleryIndex];

  const moveGallery = (direction: 1 | -1) => {
    setGalleryIndex((current) => (current + direction + GALLERY.length) % GALLERY.length);
  };

  const whatsappMessage = [
    "Hola Candy's Pet! 🐾 Quiero pedir la placa de identificación huesito personalizada modelo KIRA.",
    'Vi la muestra de la chapita y me gustaría coordinar mi diseño por $3.500.',
  ].join('\n');

  return (
    <section
      id="llaveros-personalizados"
      className="relative scroll-mt-24 overflow-hidden py-24"
      style={{ background: 'hsl(220 27% 12%)' }}
    >
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="container relative mx-auto px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 shadow-2xl"
          >
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-black/20">
              <motion.img
                key={activeImage.src}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={activeImage.src}
                alt={`${activeImage.label} del llavero personalizado`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Detalle</p>
                  <p className="mt-1 font-heading text-xl font-bold text-white">{activeImage.label}</p>
                </div>
                <span className="rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                  {galleryIndex + 1}/{GALLERY.length}
                </span>
              </div>
              <button
                type="button"
                aria-label="Imagen anterior del llavero"
                onClick={() => moveGallery(-1)}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:scale-105 hover:bg-black/70"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Imagen siguiente del llavero"
                onClick={() => moveGallery(1)}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:scale-105 hover:bg-black/70"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-white/10 bg-black/20 p-3">
              {GALLERY.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setGalleryIndex(index)}
                  aria-label={`Ver ${image.label}`}
                  className={`aspect-[4/3] overflow-hidden rounded-xl border-2 transition ${
                    galleryIndex === index
                      ? 'border-pink-400 opacity-100'
                      : 'border-transparent opacity-55 hover:opacity-90'
                  }`}
                >
                  <img src={image.src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-pink-400/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-pink-200">
              <Sparkles className="h-3.5 w-3.5" />
              Nueva línea personalizada
            </span>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
              Placa de identificación huesito personalizada 🐾
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
              <strong className="font-semibold text-white/85">Modelo KIRA</strong>
              <br />
              ¡Tu peludito siempre seguro y con mucho estilo! 🩷
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Personalizable</p>
                <p className="mt-2 text-sm text-white/70">Nombre, dibujo de su raza y datos de contacto.</p>
              </div>
              <div className="rounded-2xl border border-pink-300/25 bg-pink-300/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-pink-300">Valor</p>
                <p className="mt-2 text-2xl font-bold text-white">$3.500</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">¿Qué incluye?</p>
              <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-white/70 sm:grid-cols-2">
                {[
                  'Nombre grande por delante: “Hola Soy Kira” + dibujo de su raza.',
                  'Datos por detrás: “Mamá de Kira” + tu WhatsApp.',
                  'Forma de huesito, liviana y no molesta.',
                  'Material resistente al agua y no se oxida.',
                  'Argolla y cadena metálica incluida, lista para poner en su collar.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4 text-sm text-white/70">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
              <span>La muestra del reverso se publica con los últimos tres dígitos desenfocados para proteger los datos del cliente.</span>
            </div>

            <a
              href={customProductWaLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-center font-bold text-white shadow-lg shadow-[#25D366]/20 transition hover:-translate-y-0.5 hover:bg-[#20bd5a] sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Pedir por WhatsApp
              <MessageCircle className="h-4 w-4 opacity-75" />
            </a>
            <p className="mt-3 text-xs text-white/45">+56 9 9050 4762 · Precio de la placa personalizada: $3.500.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}