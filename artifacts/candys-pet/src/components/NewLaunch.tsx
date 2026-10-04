import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, Check, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import launchVideo from '@assets/VID-20261004-WA0023(1)_1791149720846.mp4';
import launchVideoWebM from '../assets/new-launch.webm';
import launchPoster from '@assets/IMG-20261004-WA0017_1791149720773.jpg';
import lifestylePink from '@assets/IMG-20261004-WA0018_1791149720799.jpg';
import lifestyleGray from '@assets/IMG-20261004-WA0016_1791149720822.jpg';
import { useCatalog } from '../hooks/useCatalog';
import { waLink } from '../lib/constants';
import { requestAudioFocus } from '../lib/audioFocus';

const formatPrice = (amount: number) =>
  `$${new Intl.NumberFormat('es-CL').format(amount)}`;

export function NewLaunch() {
  const { catalog } = useCatalog();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const soundOnRef = useRef(false);
  const [visible, setVisible] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [playing, setPlaying] = useState(false);

  const priceM = catalog.prices.price_p25_m ?? 22990;
  const priceL = catalog.prices.price_p25_l ?? 24990;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      const isVisible = entry.isIntersecting;
      setVisible(isVisible);
      if (isVisible) {
        requestAudioFocus('launch');
        const video = videoRef.current;
        if (video) {
          video.muted = !soundOnRef.current;
          void video.play().then(() => setPlaying(true)).catch((error: unknown) => {
            console.warn('[NewLaunch] Video autoplay did not start:', error);
            setPlaying(false);
          });
        }
      } else {
        videoRef.current?.pause();
        setPlaying(false);
        requestAudioFocus('intro');
      }
    }, { threshold: 0, rootMargin: '120px 0px' });
    observer.observe(section);
    return () => {
      observer.disconnect();
      videoRef.current?.pause();
      setPlaying(false);
      requestAudioFocus('intro');
    };
  }, []);

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (!soundOn) {
      video.muted = false;
      soundOnRef.current = true;
      setSoundOn(true);
      if (video.paused && visible) await video.play().catch(() => {});
    } else {
      video.muted = true;
      soundOnRef.current = false;
      setSoundOn(false);
    }
  };

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
      return;
    }

    video.pause();
    setPlaying(false);
  };

  return (
    <section
      ref={sectionRef}
      id="new-launch"
      aria-labelledby="launch-title"
      className="relative isolate overflow-hidden bg-[hsl(220_25%_8%)] text-[#fff8f0]"
    >
      <div className="pointer-events-none absolute -left-36 top-8 h-96 w-96 rounded-full bg-[hsl(340_84%_50%/0.18)] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[hsl(38_72%_58%/0.11)] blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mb-9 flex items-center gap-3">
          <span className="h-px w-10 bg-[hsl(340_84%_65%)]" />
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">Nuevo lanzamiento · Hecho para ir contigo</p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <div className="relative z-10 order-2 lg:order-1">
            <p className="mb-4 font-heading text-xl italic text-[hsl(38_72%_68%)]">Para los paseos que se vuelven aventura.</p>
            <h2 id="launch-title" className="max-w-xl font-heading text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              Cerca, sin<br />
              <span className="italic text-[hsl(340_84%_66%)]">dejar tus manos.</span>
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
                  aria-label="Video de 18 segundos del nuevo Portamascotas Tipo Banano en uso"
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src={launchVideoWebM} type="video/webm" />
                  <source src={launchVideo} type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111219]/75 via-transparent to-[#111219]/10" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#111219]/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm sm:left-6 sm:top-6">Candy’s Pet · nuevo</span>
                <button
                  type="button"
                  onClick={() => void toggleSound()}
                  aria-pressed={soundOn}
                  aria-label={soundOn ? 'Silenciar el video' : 'Activar sonido del video'}
                  data-testid="button-launch-sound"
                  className="absolute bottom-4 right-4 z-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 bg-[#111219]/70 px-4 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-[#111219]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-6 sm:right-6"
                >
                  {soundOn ? <Volume2 aria-hidden="true" className="h-4 w-4" /> : <VolumeX aria-hidden="true" className="h-4 w-4" />}
                  {soundOn ? 'Sonido activado' : 'Activar sonido'}
                </button>
                <button
                  type="button"
                  onClick={() => void togglePlayback()}
                  aria-label={playing ? 'Pausar video del portamascotas' : 'Reproducir video del portamascotas'}
                  aria-pressed={playing}
                  data-testid="button-launch-playback"
                  className="absolute bottom-4 left-4 z-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 bg-[#111219]/70 px-4 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-[#111219]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-6 sm:left-6"
                >
                  {playing ? <Pause aria-hidden="true" className="h-4 w-4" /> : <Play aria-hidden="true" className="h-4 w-4" />}
                  {playing ? 'Pausar' : 'Reproducir'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 p-2 sm:gap-3 sm:p-3">
                <img src={lifestylePink} alt="Portamascotas tipo banano rosado en un paseo al aire libre" loading="lazy" decoding="async" className="h-28 w-full rounded-xl object-cover object-center sm:h-36" />
                <img src={lifestyleGray} alt="Portamascotas tipo banano gris usado durante un paseo" loading="lazy" decoding="async" className="h-28 w-full rounded-xl object-cover object-center sm:h-36" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}