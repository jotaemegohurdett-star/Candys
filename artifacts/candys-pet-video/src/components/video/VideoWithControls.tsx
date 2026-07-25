import { useEffect, useRef, useState } from 'react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from './useSceneControls';

const TOTAL_DURATION_MS = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

type RecordState = 'idle' | 'recording' | 'done' | 'mobile' | 'error';

const isMobileDevice = () =>
  typeof navigator !== 'undefined' &&
  (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    !navigator.mediaDevices?.getDisplayMedia);

export default function VideoWithControls() {
  // embed=1 means we're inside the store's iframe — hide the download button there
  const isEmbedded = typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('embed') === '1';

  const { sceneKeys, activeIndex, locked, mountKey, tick, durations, activeDuration, onSceneChange, jumpTo, toggleLock } =
    useSceneControls(SCENE_DURATIONS);

  const [muted, setMuted] = useState(true);

  // ── recording state (standalone only) ──
  const [recState, setRecState] = useState<RecordState>('idle');
  const [progress, setProgress] = useState(0);
  const [videoKey, setVideoKey] = useState(0); // forces VideoTemplate remount
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Listen for mute/unmute commands from parent page via postMessage
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
  }, [isEmbedded]);

  async function startDownload() {
    // Mobile / unsupported browser
    if (isMobileDevice()) {
      setRecState('mobile');
      return;
    }

    try {
      // Ask user to share THIS tab
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 30, displaySurface: 'browser' } as DisplayMediaStreamConstraints['video'],
        audio: false,
      } as DisplayMediaStreamOptions);

      // Restart the video from the beginning
      setVideoKey(k => k + 1);
      setProgress(0);
      setRecState('recording');

      chunksRef.current = [];
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';
      const mr = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mr;
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.start(200);

      // Progress bar
      const startTime = Date.now();
      const progInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setProgress(Math.min(99, Math.round((elapsed / TOTAL_DURATION_MS) * 100)));
      }, 200);

      // Stop after full video duration
      await new Promise<void>((res) => setTimeout(res, TOTAL_DURATION_MS));
      clearInterval(progInterval);
      setProgress(100);

      mr.stop();
      stream.getTracks().forEach((t) => t.stop());

      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'candys-pet-video.webm';
        a.click();
        URL.revokeObjectURL(url);
        setRecState('done');
        setTimeout(() => setRecState('idle'), 4000);
      };
    } catch {
      setRecState('error');
      setTimeout(() => setRecState('idle'), 3000);
    }
  }

  // Embedded in store: audio controlled by parent scroll, no download button
  if (isEmbedded) {
    return (
      <div className="relative w-full h-screen">
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

  // Standalone path: video + download button
  return (
    <div className="relative w-full h-screen">
      <VideoTemplate key={videoKey} />

      {/* Download overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">

        {recState === 'idle' && (
          <button
            onClick={startDownload}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm shadow-2xl transition-all hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg,hsl(340 84% 50%),hsl(270 70% 55%))' }}
          >
            ⬇ Descargar video
          </button>
        )}

        {recState === 'recording' && (
          <div
            className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl shadow-2xl min-w-[220px]"
            style={{ background: 'hsl(220 25% 10% / 0.95)' }}
          >
            <div className="flex items-center gap-2 text-white text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Grabando… {progress}%
            </div>
            <div className="w-48 h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{ width: `${progress}%`, background: 'hsl(340 84% 55%)' }}
              />
            </div>
            <p className="text-[11px] text-white/50 text-center">No cierres esta pestaña</p>
          </div>
        )}

        {recState === 'done' && (
          <div
            className="px-6 py-3 rounded-full font-bold text-white text-sm shadow-2xl"
            style={{ background: 'hsl(150 65% 35% / 0.95)' }}
          >
            ✅ ¡Descarga lista! Revisá tu carpeta de descargas
          </div>
        )}

        {recState === 'error' && (
          <div
            className="px-6 py-3 rounded-2xl text-white text-sm shadow-2xl text-center max-w-[260px]"
            style={{ background: 'hsl(0 70% 40% / 0.95)' }}
          >
            ❌ No se pudo iniciar. Asegurate de compartir <strong>esta pestaña</strong> cuando el navegador lo pida.
          </div>
        )}

        {recState === 'mobile' && (
          <div
            className="px-6 py-4 rounded-2xl text-white text-sm shadow-2xl text-center max-w-[280px] space-y-1"
            style={{ background: 'hsl(220 25% 12% / 0.97)' }}
          >
            <p className="font-bold text-base mb-1">📱 En celular</p>
            <p className="text-white/80 text-xs leading-relaxed">
              Usá la <strong>grabación de pantalla</strong> de tu teléfono mientras el video se reproduce.
            </p>
            <button
              onClick={() => setRecState('idle')}
              className="mt-2 text-xs underline text-white/50"
            >
              Cerrar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
