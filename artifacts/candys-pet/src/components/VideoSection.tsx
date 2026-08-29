import { useEffect, useRef, useState } from 'react';

// The video scenes are designed for a desktop-like viewport.
// We render the iframe at a fixed design size and scale it down to fit,
// so the content always keeps its exact layout and format — never cropped.
const DESIGN_WIDTH = 960;
const DESIGN_HEIGHT = 540; // 16:9
const VIDEO_EMBED_URL = (() => {
  if (typeof window === 'undefined') return '/candys-pet-video/?embed=1&format=web';
  const url = new URL('/candys-pet-video/', window.location.origin);
  url.searchParams.set('embed', '1');
  url.searchParams.set('format', 'web');
  return url.toString();
})();

export function VideoSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Keep the iframe scaled to the frame width
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const update = () => setScale(frame.clientWidth / DESIGN_WIDTH);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  // Unmute (and restart from the beginning) when the section scrolls into view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const send = (type: string) => {
      iframeRef.current?.contentWindow?.postMessage({ type }, '*');
    };

    const obs = new IntersectionObserver(
      ([entry]) => send(entry.isIntersecting ? 'CANDY_UNMUTE' : 'CANDY_MUTE'),
      { threshold: 0.35 }
    );
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        background: 'linear-gradient(180deg, #09090f 0%, #0f0a1a 60%, #09090f 100%)',
        padding: '72px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60vw',
          height: '40vw',
          maxWidth: 700,
          maxHeight: 460,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(219,39,119,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header copy */}
      <div style={{ textAlign: 'center', marginBottom: 36, padding: '0 24px' }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#e879a0',
            marginBottom: 14,
          }}
        >
          Mirá en acción
        </p>
        <h2
          style={{
            fontSize: 'clamp(26px, 5vw, 44px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          El abrazo que tu mascota
          <br />
          <span style={{ color: '#e879a0', fontStyle: 'italic', fontWeight: 900 }}>
            nunca va a querer soltar.
          </span>
        </h2>
      </div>

      {/* Video frame — fixed 16:9, content scaled to fit (never cropped) */}
      <div
        ref={frameRef}
        style={{
          position: 'relative',
          margin: '0 auto',
          width: 'min(94vw, 900px)',
          aspectRatio: '16 / 9',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 0 0 1px rgba(232,121,160,0.18), 0 32px 80px rgba(0,0,0,0.65)',
        }}
      >
        {/* Thin top accent line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: '15%',
            right: '15%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(232,121,160,0.55), transparent)',
            zIndex: 2,
          }}
        />
        <iframe
          ref={iframeRef}
          src={VIDEO_EMBED_URL}
          allow="autoplay"
          title="Candy's Pet — video"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: DESIGN_WIDTH,
            height: DESIGN_HEIGHT,
            border: 'none',
            display: 'block',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Subtitle below video */}
      <p
        style={{
          textAlign: 'center',
          marginTop: 28,
          fontSize: 13,
          color: 'rgba(255,255,255,0.38)',
          letterSpacing: '0.04em',
          padding: '0 24px',
        }}
      >
        Fabricado a mano en Chile · 100% algodón transpirable
      </p>
      <a
        href="/candys-pet-video/downloads/candys-pet-web.mp4"
        download="candys-pet-web.mp4"
        style={{
          display: 'block',
          width: 'fit-content',
          margin: '18px auto 0',
          padding: '11px 20px',
          borderRadius: 999,
          background: '#ed176b',
          color: '#ffffff',
          fontSize: 13,
          fontWeight: 800,
          textDecoration: 'none',
          boxShadow: '0 10px 28px rgba(237,23,107,0.24)',
        }}
      >
        Descargar video Candy's Pet
      </a>
    </section>
  );
}
