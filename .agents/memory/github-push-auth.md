---
name: GitHub push authentication
description: Replit Git push and the GitHub connector can use separate credentials and permissions.
---

Reauthorizing or removing and re-adding the GitHub connection may restore API reads without restoring repository write access. A repository-ref read can succeed while creating a Git blob still returns `Resource not accessible by integration`.

**Why:** A healthy OAuth connection and readable repository do not prove that the integration can write. Repository installation selection or organization policy can deny content writes even after reconnection.

**How to apply:** Keep the local commit intact, verify the actual write path, then stop credential retries after one reconnect and one retry. Ask the repository or organization owner to grant Replit `Contents: Read and write`; never ask the user to paste a token into chat.