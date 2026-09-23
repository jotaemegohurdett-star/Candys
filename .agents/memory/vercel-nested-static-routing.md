---
name: Vercel nested static routing
description: Routing and builder constraints for a SPA with a nested static video artifact
---

For a SPA that owns a nested static artifact, route API requests first, then let Vercel serve the filesystem, and only then use the SPA fallback. A catch-all rewrite before filesystem handling turns missing or nested video assets into the storefront HTML.

**Why:** The production project had the video subpath configured behind a broad SPA fallback, so `/candys-pet-video/` returned the storefront `index.html`. A direct prebuilt deployment also required explicit builders: the Node builder for the API function and the static-build builder for already-generated assets; using only one made the other class of files disappear or become static source.

**How to apply:** Keep the route order `api -> filesystem -> /index.html`, verify the video HTML and MP4 content type on the live domain, and verify `/api/healthz` after every deployment path.