---
name: Storefront campaign video playback
description: Browser compatibility, autoplay, and audio-focus rules for promotional video sections.
---

For promotional clips, keep the original upload as a fallback and provide a WebM rendition when preview browsers cannot decode H.264. Start the video muted as the section approaches, expose separate play/pause and sound controls, and only unmute after a user gesture.

**Why:** The Replit preview browser rejected the supplied H.264/AAC MP4 with `NotSupportedError`, even though the file was valid. A VP9/Opus WebM rendition played correctly, while retaining the original protects browsers that prefer MP4.

For tall sections, trigger playback from `IntersectionObserver`'s `isIntersecting` state with a small positive root margin. Avoid high `intersectionRatio` thresholds because the ratio is measured against the entire section, which can prevent a long banner from ever reaching the threshold.

**Why:** A high threshold did not reliably fire for the full-height campaign section; a small approach margin reliably started and stopped the clip as the visitor scrolled past.

**How to apply:** Keep clips muted until clicked, pause after they leave the viewport, and restore the site's ambient audio focus when the campaign video is no longer visible.