export type StorefrontAudioFocus = 'none' | 'intro' | 'carnet' | 'launch';

export const AUDIO_FOCUS_EVENT = 'candys:audio-focus';

const GESTURE_EVENTS = ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown', 'wheel'] as const;
const audioUnlockListeners = new Set<() => void>();
let activeFocus: StorefrontAudioFocus = 'none';
let audioUnlocked = false;
let gestureListenersAttached = false;

function removeGestureListeners() {
  if (!gestureListenersAttached || typeof window === 'undefined') return;
  for (const eventName of GESTURE_EVENTS) {
    window.removeEventListener(eventName, handleAudioGesture);
  }
  gestureListenersAttached = false;
}

function handleAudioGesture(event: Event) {
  if (!event.isTrusted) return;
  audioUnlocked = true;
  for (const listener of [...audioUnlockListeners]) listener();
}

export function addAudioUnlockListener(listener: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  audioUnlockListeners.add(listener);

  if (audioUnlocked) {
    listener();
  }
  if (!gestureListenersAttached) {
    for (const eventName of GESTURE_EVENTS) {
      window.addEventListener(eventName, handleAudioGesture, { passive: true });
    }
    gestureListenersAttached = true;
  }

  return () => {
    audioUnlockListeners.delete(listener);
    if (audioUnlockListeners.size === 0) removeGestureListeners();
  };
}

export function getAudioFocus(): StorefrontAudioFocus {
  return activeFocus;
}

export function requestAudioFocus(focus: StorefrontAudioFocus, transitionMs = 900): void {
  activeFocus = focus;
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(AUDIO_FOCUS_EVENT, {
      detail: { focus, transitionMs },
    }),
  );
}

export function releaseAudioFocus(focus: StorefrontAudioFocus, transitionMs = 900): void {
  if (activeFocus === focus) requestAudioFocus('none', transitionMs);
}