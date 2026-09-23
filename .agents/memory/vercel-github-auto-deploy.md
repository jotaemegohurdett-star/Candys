---
name: Vercel GitHub auto-deploy
description: Production publishing path for Candy's Pet after connecting Vercel to the GitHub main branch
---

Vercel production is connected to the GitHub repository's `main` branch. A push that reaches `main` creates a production deployment automatically; Replit's separate Republish action is not part of the Vercel release path.

**Why:** The first GitHub-triggered deployment completed successfully and the public API returned healthy responses after deployment, confirming the intended Replit → GitHub → Vercel workflow.

**How to apply:** Commit and push approved changes from Replit to `main`, wait for Vercel's deployment to become ready, and verify a public health/API endpoint. Do not change Cloudflare DNS or attach the production domain to Replit.