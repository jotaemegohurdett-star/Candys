import { useEffect, useRef, useState } from 'react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from './useSceneControls';

const TOTAL_DURATION_MS = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

type RecordState = 'idle' | 'countdown' | 'recording' | 'done';

export default function VideoWithControls() {
  const isIframed = typeof window !== 'undefined' && window.self !== window.top;

  const { sceneKeys, activeIndex, locked, mountKey, tick, durations, activeDuration, onSceneChange, jumpTo, toggleLock } =
    useSceneControls(SCENE_DURATIONS);

  const [muted, setMuted] = useState(true);

  // ── recording state (standalone only) ──
  const [recState, setRecState] = useState<RecordState>('idle');
  const [countdown, setCountdown] = useState(3);
  const [progress, setProgress] = useState(0); // 0–100
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Listen for mute/unmute commands from parent page via postMessage
  useEffect(() => {
    if (!isIframed) return;
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'CANDY_UNMUTE') {
        jumpTo(0);
        setMuted(false);
      }
      if (e.data?.type === 'CANDY_MUTE') setMuted(true);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [isIframed]);

  async function startDownload() {
    try {
      // Ask user to share the tab/window
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 30 },
        audio: true,
      } as DisplayMediaStreamOptions);

      // 3-second countdown so the user can switch back to this tab
      setRecState('countdown');
      setCountdown(3);
      await new Promise<void>((res) => {
        let c = 3;
        const id = setInterval(() => {
          c--;
          setCountdown(c);
          if (c <= 0) { clearInterval(id); res(); }
        }, 1000);
      });

      // Start recording
      chunksRef.current = [];
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';
      const mr = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mr;
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.start(200);
      setRecState('recording');
      setProgress(0);

      // Progress bar
      const startTime = Date.now();
      const progInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setProgress(Math.min(100, Math.round((elapsed / TOTAL_DURATION_MS) * 100)));
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
      setRecState('idle');
    }
  }

  // Iframed path: audio controlled by parent scroll
  if (isIframed) {
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
      <VideoTemplate />

      {/* Download overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
        {recState === 'idle' && (
          <button
            onClick={startDownload}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm shadow-2xl transition-all hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg,hsl(340 84% 50%),hsl(270 70% 55%))' }}
          >
            ⬇ Descargar video
          </button>
        )}

        {recState === 'countdown' && (
          <div
            className="px-6 py-3 rounded-full font-bold text-white text-lg shadow-2xl"
            style={{ background: 'hsl(220 25% 15% / 0.92)' }}
          >
            Volvé a esta pestaña en… {countdown}
          </div>
        )}

        {recState === 'recording' && (
          <div
            className="flex flex-col items-center gap-2 px-6 py-3 rounded-2xl shadow-2xl"
            style={{ background: 'hsl(220 25% 15% / 0.92)' }}
          >
            <div className="flex items-center gap-2 text-white text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Grabando… {progress}%
            </div>
            <div className="w-48 h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: 'hsl(340 84% 55%)' }}
              />
            </div>
          </div>
        )}

        {recState === 'done' && (
          <div
            className="px-6 py-3 rounded-full font-bold text-white text-sm shadow-2xl"
            style={{ background: 'hsl(150 65% 35% / 0.95)' }}
          >
            ✅ ¡Descarga lista!
          </div>
        )}
      </div>
    </div>
  );
}
