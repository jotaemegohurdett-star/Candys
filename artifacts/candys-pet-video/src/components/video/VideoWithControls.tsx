import { useEffect, useState } from 'react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from './useSceneControls';

const TOTAL_DURATION_MS = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

export default function VideoWithControls() {
  const isEmbedded = typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('embed') === '1';
  const { durations, onSceneChange, mountKey, jumpTo } = useSceneControls(SCENE_DURATIONS);
  const [muted, setMuted] = useState(false);
  const downloadHref = `${import.meta.env.BASE_URL}downloads/candys-pet-instagram.mp4`;

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
      <div className="relative h-screen w-full">
        <VideoTemplate
          key={mountKey}
          durations={durations}
          loop
          muted={muted}
          onSceneChange={onSceneChange}
        />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <VideoTemplate />
      <div className="absolute bottom-[4vh] left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2">
        <a
          href={downloadHref}
          download="candys-pet-instagram.mp4"
          className="rounded-full px-6 py-3 text-sm font-bold transition-transform hover:scale-105 active:scale-95"
          style={{ background: 'var(--coral)', color: 'var(--paper)', boxShadow: '0 .8vw 2.4vw rgba(237,23,107,.3)' }}
        >
          Descargar video MP4
        </a>
        <span className="rounded-full px-3 py-1 text-[.7rem] font-semibold tracking-wide" style={{ background: 'rgba(17,19,29,.78)', color: 'rgba(250,248,244,.72)' }}>
          16:9 · {((TOTAL_DURATION_MS) / 1000).toFixed(2)} s · H.264 + AAC
        </span>
      </div>
    </div>
  );
}