import { useEffect, useRef } from 'react';
import { AUDIO_FOCUS_EVENT, type StorefrontAudioFocus } from '../lib/audioFocus';

export function VideoSection() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const audioFocusRef = useRef<StorefrontAudioFocus>('intro');

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
    const handleAudioFocus = (event: Event) => {
      const detail = (event as CustomEvent<{ focus: StorefrontAudioFocus; transitionMs?: number }>).detail;
      const transitionMs = detail.transitionMs ?? 900;
      audioFocusRef.current = detail.focus;
      sendAudioFocus(detail.focus, transitionMs);
    };

    window.addEventListener(AUDIO_FOCUS_EVENT, handleAudioFocus);
    return () => window.removeEventListener(AUDIO_FOCUS_EVENT, handleAudioFocus);
  }, []);

  return (
    <div style={{ width: '100%', height: 'clamp(320px, 56.25vw, 560px)', lineHeight: 0 }}>
      <iframe
        ref={frameRef}
        src="/candys-pet-video/"
        onLoad={() => sendAudioFocus(audioFocusRef.current, 0)}
        allow="autoplay"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        title="Candy's Pet"
      />
    </div>
  );
}