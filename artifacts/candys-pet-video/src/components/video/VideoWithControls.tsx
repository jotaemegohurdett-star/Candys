import { useEffect, useState } from 'react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from './useSceneControls';

export default function VideoWithControls() {
  const isIframed = typeof window !== 'undefined' && window.self !== window.top;

  const { sceneKeys, activeIndex, locked, mountKey, tick, durations, activeDuration, onSceneChange, jumpTo, toggleLock } =
    useSceneControls(SCENE_DURATIONS);

  const [muted, setMuted] = useState(true);

  // Listen for mute/unmute commands from parent page via postMessage
  useEffect(() => {
    if (!isIframed) return;
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'CANDY_UNMUTE') {
        // Restart from scene 1 so the music plays from the beginning to the end
        jumpTo(0);
        setMuted(false);
      }
      if (e.data?.type === 'CANDY_MUTE') setMuted(true);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [isIframed]);

  // Export / standalone path: no controls, plays freely
  if (!isIframed) return <VideoTemplate />;

  // Iframed: play with mute state driven by parent scroll, no control bar
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
