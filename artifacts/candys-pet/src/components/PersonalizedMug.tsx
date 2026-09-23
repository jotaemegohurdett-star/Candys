import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, MessageCircle, Sparkles, Truck } from 'lucide-react';
import { customProductWaLink } from '../lib/constants';
import { WhatsAppIcon } from './WhatsAppIcon';

import almaMugImage from '@assets/IMG-20260923-WA0064(2)_1790141887019.jpg';
import kiraMugImage from '@assets/IMG-20260923-WA0063(2)_1790141887094.jpg';
import kiraFloralMugImage from '@assets/IMG-20260923-WA0065(2)_1790141887155.jpg';
import miaMugImage from '@assets/IMG-20260923-WA0068_1790141887219.jpg';
import aaronMugImage from '@assets/IMG-20260923-WA0069_1790141887276.jpg';
import customMugImage from '@assets/IMG-20260923-WA0070_1790141887342.jpg';

const GALLERY = [
  { src: almaMugImage, label: 'Diseño Alma' },
  { src: kiraMugImage, label: 'Diseño Kira' },
  { src: kiraFloralMugImage, label: 'Diseño floral Kira' },
  { src: miaMugImage, label: 'Diseño Mia' },
  { src: aaronMugImage, label: 'Diseño Aaron' },
  { src: customMugImage, label: 'Diseño personalizado' },
];

export function PersonalizedMug() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const activeImage = GALLERY[galleryIndex];

  const moveGallery = (direction: 1 | -1) => {
    setGalleryIndex((current) => (current + direction + GALLERY.length) % GALLERY.length);
  };

  const whatsappMessage = [
    "Hola Candy's Pet! 🤍 Quiero pedir un tazón blanco personalizado de 11oz.",
    'Me gustaría conocer las opciones para personalizarlo con una foto, frase o logo. Vi que el valor es de $6.990.',
  ].join('\n');

  return (
    <section
      id="tazones-personalizados"
      className="relative scroll-mt-24 overflow-hidden py-24"
      style={{ background: 'hsl(220 27% 12%)' }}
    >
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="container relative mx-auto px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 shadow-2xl">
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-black/20">
              <img
                key={activeImage.src}
                src={activeImage.src}
                alt={`${activeImage.label} del tazón blanco personalizado`}
                className="h-full w-full object-cover transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Inspiración</p>
                  <p className="mt-1 font-heading text-xl font-bold text-white">{activeImage.label}</p>
                </div>
                <span className="rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                  {galleryIndex + 1}/{GALLERY.length}
                </span>
              </div>
              <button
                type="button"
                aria-label="Imagen anterior de tazones personalizados"
                onClick={() => moveGallery(-1)}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:scale-105 hover:bg-black/70"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Imagen siguiente de tazones personalizados"
                onClick={() => moveGallery(1)}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:scale-105 hover:bg-black/70"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-white/10 bg-black/20 p-3 sm:grid-cols-6">
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
            <div className="border-t border-white/10 bg-black/20 p-3">
              <a
                href={customProductWaLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-[#25D366]/20 transition hover:bg-[#20bd5a]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Pedir este tazón por WhatsApp
                <MessageCircle className="h-4 w-4 opacity-75" />
              </a>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-pink-400/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-pink-200">
              <Sparkles className="h-3.5 w-3.5" />
              Nueva línea personalizada
            </span>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
              Tazón blanco personalizado 11oz 🤍
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              Con la foto, frase o logo que quieras. Un regalo especial para tu casa, tu empresa o alguien importante.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Calidad</p>
                <p className="mt-2 text-sm text-white/70">Cerámica de alta calidad, no se borra con el lavado.</p>
              </div>
              <div className="rounded-2xl border border-pink-300/25 bg-pink-300/10 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-pink-300">Valor</p>
                <p className="mt-2 text-2xl font-bold text-white">$6.990</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">Personalízalo como quieras</p>
              <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-white/70 sm:grid-cols-2">
                {[
                  'Foto de tu mascota o de alguien especial.',
                  'Frase, nombre o mensaje personalizado.',
                  'Logo para tu empresa o emprendimiento.',
                  'Ideal para regalo o para disfrutar en casa.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4 text-sm text-white/70">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
              <span>Entrega en Santiago y envíos a todo Chile.</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}