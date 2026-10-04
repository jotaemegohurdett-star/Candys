---
name: Storefront campaign video playback
description: Browser compatibility, autoplay, and audio-focus rules for promotional video sections.
---

For promotional clips, keep the original upload as a fallback and provide a WebM rendition when preview browsers cannot decode H.264. By default, start the video muted as the section approaches, expose separate play/pause and sound controls, and only unmute after a user gesture. The New Launch publication is a specific exception: entering its section starts its longer music track without controls and takes audio focus from the previous video. Keep that behavior local to New Launch unless asked to change other videos.

**Why:** The Replit preview browser rejected the supplied H.264/AAC MP4 with `NotSupportedError`, even though the file was valid. A VP9/Opus WebM rendition played correctly, while retaining the original protects browsers that prefer MP4. The user requested automatic sound only for this new publication and explicitly asked not to alter the behavior of other videos.

For tall sections, trigger playback from `IntersectionObserver`'s `isIntersecting` state with a small positive root margin. Avoid high `intersectionRatio` thresholds because the ratio is measured against the entire section, which can prevent a long banner from ever reaching the threshold.

**Why:** A high threshold did not reliably fire for the full-height campaign section; a small approach margin reliably started and stopped the clip as the visitor scrolled past.

**How to apply:** Keep other clips muted until clicked, pause them after they leave the viewport, and restore the site's ambient audio focus when they are no longer visible. For New Launch, start/pause its separate extended audio track with section visibility and request immediate audio focus only for this section.