---
name: Imported artifact registration
description: Replit behavior to account for when a GitHub-imported multi-artifact workspace has local artifact metadata but no registered artifact records.
---

Imported workspaces can contain valid `.replit-artifact/artifact.toml` files while the platform has no corresponding artifact registry entries or managed workflow names. In that state, `listArtifacts` may be empty, `presentArtifact` may report the artifact as missing, and managed workflow restart will fail even though the local services are runnable.

**Why:** The imported project can still be served correctly, but platform registration is not guaranteed by the presence of local metadata.

**How to apply:** Preserve the existing artifact commands and paths. If managed services are unavailable, configure only the minimal workflows described by the local metadata, starting the primary frontend before its backend dependencies.