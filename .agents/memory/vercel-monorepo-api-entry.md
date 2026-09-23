---
name: Vercel monorepo API entry
description: Deployment constraint for the Candy's Pet Express API in the Vercel-hosted pnpm monorepo
---

Use a JavaScript Vercel function entry that imports a prebuilt Express bundle when deploying this monorepo to Vercel.

**Why:** Vercel's function typecheck followed stricter Node ESM resolution than the local TypeScript project and rejected extensionless imports plus CJS interop even though the local build and typecheck passed. Bundling the API with esbuild keeps the runtime behavior unchanged and avoids the incompatible function-level typecheck.

**How to apply:** Keep the Vercel build command generating the API bundle before the storefront build, and keep the function entry pointed at that bundle. Validate both the local API typecheck and a live `/api/catalog` request after deployment.