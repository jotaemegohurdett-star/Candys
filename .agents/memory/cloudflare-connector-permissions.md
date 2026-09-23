---
name: Cloudflare connector permissions
description: Permission behavior of the Replit Cloudflare connection for Candy's Pet
---

The Cloudflare connection can expose the correct zone and DNS records while rejecting DNS-record and SSL-setting changes when its account token is read-only or lacks the zone edit scopes.

**Why:** Read requests succeeded for the Candy's Pet zone, but DNS mutations returned Cloudflare code 10000 and SSL changes returned code 9109. The token verification endpoint can also be incompatible with account-owned tokens, so successful zone reads are the reliable connectivity check.

**How to apply:** For future direct configuration, use a Cloudflare token scoped to the `candyspet.cl` zone with Zone Read, DNS Edit, and zone settings edit permissions. Never treat the presence of the zone in a read response as proof that writes are authorized.