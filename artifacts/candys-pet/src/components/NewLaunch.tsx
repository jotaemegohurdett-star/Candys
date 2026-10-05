import { useEffect, useRef } from 'react';
import { ArrowDownRight, Check, PawPrint } from 'lucide-react';
import launchVideo from '@assets/VID-20261004-WA0023(1)_1791149720846.mp4';
import launchVideoWebM from '../assets/new-launch.webm';
import launchMusic from '../assets/new-launch-music.mp3';
import launchPoster from '@assets/IMG-20261004-WA0017_1791149720773.jpg';
import lifestylePink from '@assets/IMG-20261004-WA0018_1791149720799.jpg';
import lifestyleGray from '@assets/IMG-20261004-WA0016_1791149720822.jpg';
import lifestyleBlack from '@assets/IMG-20261004-WA0019_1791149720742.jpg';
import lifestyleYellow from '@assets/IMG-20261004-WA0020_1791149720657.jpg';
import { useCatalog } from '../hooks/useCatalog';
import { waLink } from '../lib/constants';
import {
  addAudioUnlockListener,
  AUDIO_FOCUS_EVENT,
  getAudioFocus,
  releaseAudioFocus,
  requestAudioFocus,
  type StorefrontAudioFocus,
} from '../lib/audioFocus';
import './NewLaunch.css';

const formatPrice = (amount: number) =>
  `$${new Intl.NumberFormat('es-CL').format(amount)}`;

const lifestylePhotos = [
  { src: lifestylePink, alt: 'Portamascotas rosado durante un paseo al aire libre' },
  { src: lifestyleGray, alt: 'Portamascotas gris usado durante un paseo' },
  { src: lifestyleBlack, alt: 'Perro viajando en portamascotas negro durante un paseo en moto' },
  { src: lifestyleYellow, alt: 'Perro viajando en portamascotas negro con una chaqueta amarilla' },
];

export function NewLaunch() {
  const { catalog } = useCatalog();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const priceM = catalog.prices.price_p25_m ?? 22990;
  const priceL = catalog.prices.price_p25_l ?? 24990;

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    const playMusic = () => {
      if (getAudioFocus() !== 'launch') return;
      audio.volume = 0.82;
      void audio.play().catch(() => {
        // Browsers that block sound autoplay retry after the first user gesture.
      });
    };
    const handleAudioFocus = (event: Event) => {
      const focus = (event as CustomEvent<{ focus: StorefrontAudioFocus }>).detail?.focus;
      if (focus === 'launch') {
        if (audio.paused && audio.currentTime > 0) audio.currentTime = 0;
        playMusic();
      } else {
        audio.pause();
      }
    };

    let launchVideoWasVisible = false;
    const removeUnlockListener = addAudioUnlockListener(playMusic);
    window.addEventListener(AUDIO_FOCUS_EVENT, handleAudioFocus);

    audio.volume = 0.82;
    audio.currentTime = 0;
    requestAudioFocus('launch', 0);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        launchVideoWasVisible = true;
        video.muted = true;
        void video.play().catch(() => {});
        if (getAudioFocus() !== 'launch') requestAudioFocus('launch', 0);
      } else {
        video.pause();
        if (launchVideoWasVisible) {
          launchVideoWasVisible = false;
          releaseAudioFocus('launch', 0);
        }
      }
    }, { threshold: 0, rootMargin: '0px' });
    observer.observe(video);

    return () => {
      observer.disconnect();
      releaseAudioFocus('launch', 0);
      window.removeEventListener(AUDIO_FOCUS_EVENT, handleAudioFocus);
      removeUnlockListener();
      video.pause();
      audio.pause();
    };
  }, []);

  return (
    <section
      id="new-launch"
      aria-labelledby="launch-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[hsl(220_25%_8%)] text-[#fff8f0]"
    >
      <div className="pointer-events-none absolute -left-36 top-8 h-96 w-96 rounded-full bg-[hsl(340_84%_50%/0.18)] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[hsl(38_72%_58%/0.11)] blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mb-12 flex justify-center sm:mb-14">
          <div
            className="new-launch-badge"
            aria-label="Nuevo lanzamiento, hecho para ir contigo"
            data-testid="text-launch-promo"
          >
            <div className="new-launch-paw-frame" aria-hidden="true">
              {Array.from({ length: 8 }, (_, index) => (
                <PawPrint
                  key={index}
                  className={`new-launch-paw new-launch-paw-${index + 1}`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="new-launch-badge-copy">
              <span className="new-launch-badge-label">Nuevo</span>
              <span className="new-launch-badge-title">Lanzamiento</span>
              <span className="new-launch-badge-tagline">Hecho para ir contigo</span>
            </div>
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <div className="relative z-10 order-2 lg:order-1">
            <p className="mb-4 font-heading text-xl italic text-[hsl(38_72%_68%)]">Para los paseos que se vuelven aventura.</p>
            <h2 id="launch-title" className="new-launch-gold-sweep max-w-xl font-heading text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              Cerca, sin<br />
              <span className="italic">dejar tus manos.</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/68 sm:text-lg">
              Conoce el nuevo Portamascotas Tipo Banano: una forma cómoda de llevar a tu compañero contigo, con ajuste en cintura y cuello.
            </p>

            <div className="mt-8 grid max-w-lg grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/12 bg-white/[0.055] p-4 sm:p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Talla M</span>
                  <span className="font-heading text-2xl text-white sm:text-3xl">{formatPrice(priceM)}</span>
                </div>
                <p className="mt-3 text-sm leading-5 text-white/65">Desde los 2 meses<br />y hasta 3,5 kg</p>
              </div>
              <div className="rounded-2xl border border-[hsl(340_84%_65%/0.5)] bg-[hsl(340_84%_50%/0.11)] p-4 sm:p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">Talla L</span>
                  <span className="font-heading text-2xl text-white sm:text-3xl">{formatPrice(priceL)}</span>
                </div>
                <p className="mt-3 text-sm leading-5 text-white/70">Hasta 10 kg<br />· razas medianas</p>
              </div>
            </div>

            <ul className="mt-6 flex flex-col gap-3 text-sm text-white/76 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <li className="flex items-center gap-2"><Check aria-hidden="true" className="h-4 w-4 text-[hsl(38_72%_65%)]" />Tela semielasticada</li>
              <li className="flex items-center gap-2"><Check aria-hidden="true" className="h-4 w-4 text-[hsl(38_72%_65%)]" />Broches en cintura y cuello</li>
              <li className="flex items-center gap-2"><Check aria-hidden="true" className="h-4 w-4 text-[hsl(38_72%_65%)]" />Manos libres para paseos y aventuras</li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={waLink('Hola Candy’s Pet, quiero consultar por el Portamascotas Tipo Banano.')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Consultar por WhatsApp sobre el Portamascotas Tipo Banano"
                data-testid="link-launch-whatsapp"
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[hsl(340_84%_53%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_35px_hsl(340_84%_50%/0.25)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(38_72%_65%)]"
              >
                Lo quiero conocer <ArrowDownRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
            </div>
            <p className="mt-3 text-xs text-white/42">Escríbenos para consultar tallas y disponibilidad.</p>
          </div>

          <div className="relative order-1 mx-auto w-full max-w-[620px] lg:order-2">
            <div className="absolute -inset-3 rotate-2 rounded-[2rem] border border-white/10 sm:-inset-5" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/15 bg-[#171820] shadow-[0_28px_90px_rgba(0,0,0,0.4)]">
              <div className="relative aspect-[4/5]">
                <video
                  ref={videoRef}
                  poster={launchPoster}
                  preload="none"
                  muted
                  playsInline
                  loop
                  controls={false}
                  aria-label="Video en bucle del nuevo Portamascotas Tipo Banano en uso"
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src={launchVideoWebM} type="video/webm" />
                  <source src={launchVideo} type="video/mp4" />
                </video>
                <audio
                  ref={audioRef}
                  src={launchMusic}
                  preload="auto"
                  loop
                  autoPlay
                  aria-label="Música del nuevo lanzamiento"
                  data-testid="audio-launch-music"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111219]/75 via-transparent to-[#111219]/10" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#111219]/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm sm:left-6 sm:top-6">Candy’s Pet · nuevo</span>
              </div>
              <div className="grid grid-cols-2 gap-2 p-2 sm:gap-3 sm:p-3" aria-label="Fotos del portamascotas">
                {lifestylePhotos.map((photo, index) => (
                  <img
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    data-testid={`img-launch-lifestyle-${index + 1}`}
                    className="h-28 w-full rounded-xl object-cover object-center sm:h-36"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}