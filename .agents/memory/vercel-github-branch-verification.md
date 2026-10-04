---
name: Vercel and GitHub branch verification
description: Verify current GitHub and Vercel state when local Git authentication or tracking refs appear inconsistent
---

When a local push fails, do not assume the desired commit is absent from GitHub. Check the Vercel project's linked repository and production branch, compare the remote GitHub ref with the local tracking ref, and query Vercel deployments by the relevant commit SHA before attempting another write.

**Why:** The workspace's Git credential path can fail independently of the GitHub integration, and its remote-tracking branch can lag behind GitHub. In that state, the exact local commits may already be on the remote, while a blind retry or forced update risks overwriting newer work.

**How to apply:** Before pushing, creating API commits, or changing refs, confirm ancestry and compare deployment metadata. If the target commit is already present and has a READY deployment, verify the production health endpoint instead of duplicating it.