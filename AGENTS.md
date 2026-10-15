# AGENTS.md — working in this repo

Candy's Pet: pnpm monorepo with a Vite/React storefront (`artifacts/candys-pet`),
an Express 5 API (`artifacts/api-server`), shared libs (`lib/db` Drizzle schema,
`lib/api-zod`, `lib/api-client-react`) and two unused-by-default extra artifacts
(`artifacts/candys-pet-video`, `artifacts/mockup-sandbox`). Postgres + Drizzle.

## Running it here (Base44 sandbox)

```
docker compose -f docker-compose.base44.yml up -d --build
```

- `web` publishes the Vite dev server on host port **3000** (`PORT=25253`, `BASE_PATH=/`).
  Host port 3000 is the only public port; the dev server proxies `/api` to `http://api:8080`.
- `api` runs the project's own `pnpm --filter @workspace/api-server run dev`
  (= esbuild bundle + node). **It has no watch server**: after editing API or `lib/**`
  source run `docker compose -f docker-compose.base44.yml restart api`.
- Postgres 16 runs in-compose; `DATABASE_URL=postgres://candy:candy@db:5432/candyspet`.
  The `db-push` one-shot service applies the Drizzle schema (`drizzle-kit push-force`)
  on every `up`, so a fresh volume becomes usable without manual steps.
- `deps` installs the workspace from `pnpm-lock.yaml` (`--frozen-lockfile`) into the
  bind-mounted `node_modules`; app services start only after it exits.
- If `package.json` / `pnpm-lock.yaml` change, re-run `up` (the `deps` service re-syncs).

## Sandbox-only changes

- `artifacts/candys-pet/vite.config.ts`: the `/api` proxy target is now
  `process.env.API_PROXY_TARGET ?? 'http://localhost:8080'`. Compose sets
  `API_PROXY_TARGET=http://api:8080`; with the variable unset the original
  localhost behavior is preserved (Replit/Vercel unaffected).
- `BASE44_PREVIEW_MODE` is passed through to `api` and `web`, but nothing in the
  app branches on it today (Vite already runs with `allowedHosts: true`, so the
  preview host is accepted).

## Things that do NOT work in this sandbox

- **Admin image upload** (`/api/storage/uploads/request-url`): the default path
  signs URLs through Replit's object-storage sidecar on `127.0.0.1:1106`, which
  only exists on Replit. With `BLOB_READ_WRITE_TOKEN` set the route uses the
  Vercel Blob path instead. Otherwise uploading returns an error.
- **MercadoPago checkout** without `MP_ACCESS_TOKEN`: `/api/payment/preference`
  answers `503 MP_NOT_CONFIGURED` and the cart falls back to WhatsApp — expected,
  not a bug.
- `pnpm run build` fails on workspace typecheck because `artifacts/candys-pet-video`
  has pre-existing TypeScript errors. Use the per-package builds instead
  (`pnpm --filter @workspace/candys-pet run build`).

## Verifying it works

- API: `curl localhost:8080/api/healthz` → `{"status":"ok"}`; `curl localhost:8080/api/catalog`
  → prices/images/products JSON (empty arrays are valid on a fresh database).
- Storefront: `curl -s localhost:3000/ | head` serves the Vite dev HTML of the
  cloned source (never a prebuilt bundle).
- Admin panel lives at `/admin`; dev password comes from `ADMIN_PASSWORD`
  (falls back to `candys2025` when unset).
