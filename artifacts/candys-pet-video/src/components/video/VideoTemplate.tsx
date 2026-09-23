import { useEffect, useRef } from 'react';
import { useVideoPlayer } from '@/lib/video';
import { AnimatePresence } from 'framer-motion';

import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

export const SCENE_DURATIONS: Record<string, number> = {
  scene1: 8000,
  scene2: 8000,
  scene3: 8000,
  scene4: 8000,
  scene5: 8000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  scene1: Scene1,
  scene2: Scene2,
  scene3: Scene3,
  scene4: Scene4,
  scene5: Scene5,
};

// Cumulative start times in seconds for audio sync
const SCENE_START_SEC: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, ms] of Object.entries(SCENE_DURATIONS)) {
    out[key] = cumulativeMs / 1000;
    cumulativeMs += ms;
  }
  return out;
})();

const AUDIO_SEEK_EPSILON_SEC = 0.18;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioFocusRef = useRef<'intro' | 'carnet'>('intro');
  const audioAnimationRef = useRef<number | null>(null);

  useEffect(() => {
    const fadeAudio = (focus: 'intro' | 'carnet', durationMs: number) => {
      const audio = audioRef.current;
      if (!audio || muted) return;

      if (audioAnimationRef.current !== null) {
        cancelAnimationFrame(audioAnimationRef.current);
        audioAnimationRef.current = null;
      }

      audioFocusRef.current = focus;
      const startVolume = audio.volume;
      const targetVolume = focus === 'intro' ? 0.45 : 0;
      const startedAt = performance.now();

      if (focus === 'intro') {
        void audio.play().catch(() => {});
      }

      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        audio.volume = startVolume + (targetVolume - startVolume) * eased;

        if (progress < 1) {
          audioAnimationRef.current = requestAnimationFrame(animate);
          return;
        }

        audioAnimationRef.current = null;
        if (focus === 'carnet') audio.pause();
      };

      audioAnimationRef.current = requestAnimationFrame(animate);
    };

    const handleAudioFocus = (event: MessageEvent) => {
      if (event.data?.type !== 'candys:audio-focus') return;
      const focus = event.data.focus === 'carnet' ? 'carnet' : 'intro';
      fadeAudio(focus, Number(event.data.transitionMs) || 900);
    };

    window.addEventListener('message', handleAudioFocus);
    return () => {
      window.removeEventListener('message', handleAudioFocus);
      if (audioAnimationRef.current !== null) cancelAnimationFrame(audioAnimationRef.current);
    };
  }, [muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audioFocusRef.current !== 'intro' || muted) return;
    audio.volume = 0.45;
    const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
    if (Math.abs(audio.currentTime - targetTime) > AUDIO_SEEK_EPSILON_SEC) {
      audio.currentTime = targetTime;
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, muted]);

  return (
    <>
      <div
        className="w-full h-screen overflow-hidden relative"
        style={{ backgroundColor: 'var(--color-bg-light)' }}
        data-scene-index={sceneIndex}
      >
        <AnimatePresence mode="sync">
          {SceneComponent && <SceneComponent key={currentSceneKey} />}
        </AnimatePresence>
      </div>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`}
        preload="auto"
        autoPlay
        muted={muted}
      />
    </>
  );
}