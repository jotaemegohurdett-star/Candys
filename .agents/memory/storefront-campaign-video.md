---
name: Storefront campaign video playback
description: Browser compatibility, autoplay, and audio-focus rules for promotional video sections.
---

For Candy's Pet storefront media, allow only the currently focused video to play audio. Try the motorcycle launch track on page entry and keep its soundtrack playing after its video scrolls away. Switch to another soundtrack only when that next video appears; keep the current soundtrack playing between video sections. Crossfade on handoff, and release audio focus only when its source is removed. Keep the storefront free of sound-activation buttons and video controls. Embedded animation audio stays silent until the parent storefront gives it focus; the standalone animation may play its own track.

**Why:** The user clarified that navigation must never go silent: the current soundtrack continues until another video appears and takes over, without visible sound controls. Browser autoplay policies can still block audible playback until a trusted user interaction.

**How to apply:** Do not clear audio focus merely because a video leaves the viewport. Make a best-effort sound autoplay attempt and retry on trusted pointer, touch, keyboard, or wheel input without adding a visible control. Never claim first-load sound is guaranteed on every browser; preserve exclusive audio focus when switching between media sections.