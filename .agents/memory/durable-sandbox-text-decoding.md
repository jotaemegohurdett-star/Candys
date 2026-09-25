---
name: Durable sandbox text decoding
description: Byte/string conversion constraints observed in the durable CodeExecution scope.
---

The durable CodeExecution scope in this workspace does not expose `TextDecoder`. Do not assume Web or Node encoding globals are available there without checking; APIs inside `use impure` may have different globals.

**Why:** A production-catalog recovery script stopped during local payload parsing because the global was unavailable, before any database writes occurred.

**How to apply:** For byte decoding in durable-scope code, use a verified available conversion or move only the byte operation into an impure function; keep external callbacks outside impure functions.