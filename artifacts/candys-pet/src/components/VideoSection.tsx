import { useEffect, useRef } from 'react';
import {
  addAudioUnlockListener,
  AUDIO_FOCUS_EVENT,
  getAudioFocus,
  releaseAudioFocus,
  requestAudioFocus,
  type StorefrontAudioFocus,
} from '../lib/audioFocus';

export function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const audioFocusRef = useRef<StorefrontAudioFocus>('none');

  const sendAudioFocus = (focus: StorefrontAudioFocus, transitionMs: number) => {
    frameRef.current?.contentWindow?.postMessage(
      {
        type: 'candys:audio-focus',
        focus,
        transitionMs,
      },
      '*',
    );
  };

  useEffect(() => {
    let videoIsFocused = false;
    const handleAudioFocus = (event: Event) => {
      const detail = (event as CustomEvent<{ focus: StorefrontAudioFocus; transitionMs?: number }>).detail;
      const transitionMs = detail.transitionMs ?? 900;
      audioFocusRef.current = detail.focus;
      sendAudioFocus(detail.focus, transitionMs);
    };

    const removeUnlockListener = addAudioUnlockListener(() => {
      if (audioFocusRef.current === 'intro') sendAudioFocus('intro', 0);
    });
    window.addEventListener(AUDIO_FOCUS_EVENT, handleAudioFocus);
    const section = sectionRef.current;
    const observer = section
      ? new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && !videoIsFocused) {
            videoIsFocused = true;
            requestAudioFocus('intro', 700);
          } else if (!entry.isIntersecting && videoIsFocused) {
            videoIsFocused = false;
            releaseAudioFocus('intro', 700);
          }
        }, { threshold: 0.25 })
      : null;
    if (section && observer) observer.observe(section);

    return () => {
      if (videoIsFocused) releaseAudioFocus('intro', 0);
      observer?.disconnect();
      removeUnlockListener();
      window.removeEventListener(AUDIO_FOCUS_EVENT, handleAudioFocus);
    };
  }, []);

  return (
    <div ref={sectionRef} style={{ width: '100%', height: 'clamp(320px, 56.25vw, 560px)', lineHeight: 0 }}>
      <iframe
        ref={frameRef}
        src="/candys-pet-video/"
        onLoad={() => {
          audioFocusRef.current = getAudioFocus();
          sendAudioFocus(audioFocusRef.current, 0);
        }}
        allow="autoplay"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        title="Candy's Pet"
      />
    </div>
  );
}