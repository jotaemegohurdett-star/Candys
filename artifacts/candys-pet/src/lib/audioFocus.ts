export type StorefrontAudioFocus = 'intro' | 'carnet';

export const AUDIO_FOCUS_EVENT = 'candys:audio-focus';

export function requestAudioFocus(focus: StorefrontAudioFocus): void {
  window.dispatchEvent(
    new CustomEvent(AUDIO_FOCUS_EVENT, {
      detail: { focus, transitionMs: 900 },
    }),
  );
}