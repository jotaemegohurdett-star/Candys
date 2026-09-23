---
name: GitHub push authentication
description: Replit Git push and the GitHub connector can use separate credentials and permissions.
---

Reauthorizing the GitHub connector may restore API reads without restoring repository write access for either the connector or the Replit Git remote; verify the actual push path before treating OAuth as fixed.

**Why:** The workspace can have a valid local commit while HTTPS push reports an invalid token, SSH has no key, and connector writes return a permission error.

**How to apply:** Keep the local commit intact and repair the Replit Git remote authorization or repository write permission; do not ask the user to paste a token into chat.