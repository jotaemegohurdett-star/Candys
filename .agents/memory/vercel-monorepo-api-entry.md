---
name: Vercel monorepo API entry
description: Deployment constraint for the Candy's Pet Express API in the Vercel-hosted pnpm monorepo
---

Use a JavaScript Vercel function entry with a dynamic import of the prebuilt Express bundle when deploying this monorepo to Vercel.

**Why:** Vercel's function typecheck followed stricter Node ESM resolution than the local TypeScript project and rejected extensionless imports plus CJS interop even though the local build and typecheck passed. A static import of the `.mjs` bundle is then compiled to CommonJS and fails with `ERR_REQUIRE_ESM`; dynamic import works in that runtime.

**How to apply:** Keep the Vercel build command generating the API bundle before the storefront build, keep the function entry pointed at that bundle, and load it with `import()` rather than a static import. Validate both the local API typecheck and a live `/api/catalog` request after deployment.