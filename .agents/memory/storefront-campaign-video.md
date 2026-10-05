---
name: Storefront campaign video playback
description: Browser compatibility, autoplay, and audio-focus rules for promotional video sections.
---

For Candy's Pet storefront media, allow only the currently focused video to play audio. Try the motorcycle launch track on page entry, then switch audio focus as other video sections become visible; pause the previous source and release focus when a clip leaves view. Keep the storefront free of sound-activation buttons and video controls. Embedded animation audio stays silent until the parent storefront gives it focus; the standalone animation may play its own track.

**Why:** The user asked for music to start with the motorcycle clip, switch independently as they scroll to other videos, and have no sound controls. Browser autoplay policies can still block audible playback until a trusted user interaction.

**How to apply:** Make a best-effort sound autoplay attempt and retry on trusted pointer, touch, keyboard, or wheel input without adding a visible control. Never claim first-load sound is guaranteed on every browser; preserve exclusive audio focus when switching between media sections.