---
name: Generated validation compatibility
description: OpenAPI format generation can assume validation APIs unavailable in this workspace's installed runtime.
---

Do not assume newly generated validation code is compatible with the installed validation library just because code generation succeeded.

**Why:** Adding a URI format produced a newer URL validator API that the existing runtime did not expose, so generation succeeded but compilation failed.

**How to apply:** Check regenerated schemas with the library build. Keep generator and runtime capabilities aligned; for return URLs, explicit native URL validation avoids a broad dependency upgrade merely to support a format.