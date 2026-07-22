import { useEffect, useRef } from 'react';

export function VideoSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

      {/* Video frame */}
      <div
        style={{
          position: 'relative',
          margin: '0 auto',
          width: 'min(94vw, 900px)',
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
        <div
          style={{
            width: '100%',
            height: 'clamp(340px, 52vw, 520px)',
            position: 'relative',
          }}
        >
          <iframe
            ref={iframeRef}
            src="/candys-pet-video/"
            allow="autoplay"
            title="Candy's Pet — video"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
              borderRadius: 20,
            }}
          />
        </div>
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
    </section>
  );
}
