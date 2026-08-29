import { useEffect, useState } from 'react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from './useSceneControls';

const TOTAL_DURATION_MS = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

export default function VideoWithControls() {
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isEmbedded = searchParams?.get('embed') === '1';
  const format = isEmbedded && searchParams?.get('format') === 'web' ? 'web' : 'instagram';
  const { durations, onSceneChange, mountKey, jumpTo } = useSceneControls(SCENE_DURATIONS);
  const [muted, setMuted] = useState(false);
  const instagramDownloadHref = `${import.meta.env.BASE_URL}downloads/candys-pet-instagram.mp4`;
  const webDownloadHref = `${import.meta.env.BASE_URL}downloads/candys-pet-web.mp4`;

  useEffect(() => {
    if (!isEmbedded) return;
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'CANDY_UNMUTE') {
        jumpTo(0);
        setMuted(false);
      }
      if (e.data?.type === 'CANDY_MUTE') setMuted(true);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [isEmbedded, jumpTo]);

  if (isEmbedded) {
    return (
      <div className="relative flex min-h-[100dvh] w-full items-center justify-center">
        <VideoTemplate
          key={mountKey}
          durations={durations}
          loop
          muted={muted}
          onSceneChange={onSceneChange}
          format={format}
        />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center">
      <VideoTemplate />
      <div className="absolute bottom-[2.4vh] left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
        <a
          href={instagramDownloadHref}
          download="candys-pet-instagram.mp4"
          className="rounded-full px-6 py-3 text-sm font-bold transition-transform hover:scale-105 active:scale-95"
          style={{ background: 'var(--coral)', color: 'var(--paper)', boxShadow: '0 .8vw 2.4vw rgba(237,23,107,.3)' }}
        >
          Descargar video Instagram - 9:16
        </a>
        <a
          href={webDownloadHref}
          download="candys-pet-web.mp4"
          className="rounded-full border px-6 py-3 text-sm font-bold transition-transform hover:scale-105 active:scale-95"
          style={{ borderColor: 'rgba(250,248,244,.3)', background: 'rgba(17,19,29,.82)', color: 'var(--paper)' }}
        >
          Descargar video web - 16:9
        </a>
        <span className="rounded-full px-3 py-1 text-[.7rem] font-semibold tracking-wide" style={{ background: 'rgba(17,19,29,.78)', color: 'rgba(250,248,244,.72)' }}>
          9:16 · {((TOTAL_DURATION_MS) / 1000).toFixed(2)} s · H.264 + AAC
        </span>
      </div>
    </div>
  );
}