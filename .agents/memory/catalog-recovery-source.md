---
name: Catalog recovery source
description: Recovering Candy's Pet catalog after the storefront API and its production database diverge
---

The original Replit production database was a verified source for product stock, names, prices, and product-image links after Vercel began using a separate database. An empty development database or failing Vercel API does not prove that the original catalog was deleted.

**Why:** The catalog appeared to be missing, but the older production database still contained real product records and image associations. The Vercel API could not access its configured database, so a Git deployment alone did not restore the production data.

**How to apply:** Read the original production catalog before recovery, preserve a snapshot and original image bytes, merge by stable IDs without overwriting newer edits, and verify the database-backed production catalog before saying recovery is complete.