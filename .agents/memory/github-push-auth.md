---
name: GitHub push authentication
description: Replit Git push and the GitHub connector can use separate credentials and permissions.
---

Reauthorizing the GitHub connector may restore API reads without restoring repository write access for either the connector or the Replit Git remote. A `Resource not accessible by integration` write response can persist after reconnection.

**Why:** A healthy OAuth connection and readable repository do not prove that the integration can write. The workspace can still have a valid local commit while HTTPS push reports an invalid token and connector writes return 403.

**How to apply:** Keep the local commit intact, check the actual write path, and after one reauthorization plus one retry, stop credential retries if the connector still returns 403. Do not ask the user to paste a token into chat.