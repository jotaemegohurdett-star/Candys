---
name: Checkout pricing compatibility
description: Reasons for preserving legacy price inheritance and requiring confirmation when checkout totals change.
---

Preserve Mercado Pago and existing products' global-price inheritance. Do not silently rewrite all existing products into fixed per-product prices when extending pricing.

**Why:** Existing products had only global prices; fixing new-product pricing must not unexpectedly change that established behavior or require a production schema migration.

**How to apply:** New products get independent prices, while legacy products inherit until an administrator gives them a specific price. Keep schema changes out of this pricing correction unless explicitly needed and verified.

Use current server-owned prices for checkout, and require the customer to review a changed total rather than redirecting with a silently different charge.

**Why:** Saved carts can outlive price edits. Matching the displayed amount and the eventual payment matters more than proceeding without interruption.

**How to apply:** When frontend and server totals disagree, update the cart and stop that payment attempt; the customer starts checkout again after reviewing.