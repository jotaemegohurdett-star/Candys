---
name: Vercel API redeploys
description: Required request fields and runtime verification when redeploying an existing Vercel deployment
---

To redeploy an existing Vercel deployment through `POST /v13/deployments`, provide both its `deploymentId` and `name`; reuse the source deployment's name. A simple `forceNew=true` query was rejected by the API, so omit it unless its accepted value is confirmed from current API documentation.

**Why:** A successful build can still leave the live Express API unable to reach PostgreSQL; a READY deployment did not guarantee that the store's database-backed catalog route worked.

**How to apply:** Read the source deployment metadata, redeploy with its ID and name for production, then test `/api/healthz` and a database-backed route such as `/api/catalog`. If the latter fails, inspect that deployment's runtime logs before declaring the release healthy.