---
name: Catalog recovery source
description: Recovering Candy's Pet catalog after the storefront API and its production database diverge
---

The original Replit production database and API remain the verified source for product stock, names, prices, and product-image links. Vercel had been pointed at a separate database that failed, so its empty or failing catalog did not prove the original catalog was deleted.

**Why:** The older production API still returned the original products, 24 image associations, stock rows, and admin image records. A Vercel deployment by itself did not repair the separate database connection.

**How to apply:** Keep Vercel's API routes proxying to the verified production API while the databases differ. Before changing that arrangement, migrate the original records and images by stable IDs without overwriting newer edits; verify catalog, admin, stock, and image requests before calling recovery complete.