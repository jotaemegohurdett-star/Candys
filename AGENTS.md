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
  Restart `api` on its own (not `api web` together): while the API bundles and comes
  back, `web`'s proxy logs a few `[vite] http proxy error … ECONNREFUSED` lines for the
  storefront's polling calls. That is a transient restart artifact, not a defect — the
  hooks fall back to defaults and the polls succeed again within seconds.
- Postgres 16 runs in-compose; `DATABASE_URL=postgres://candy:candy@db:5432/candyspet`.
  The `db-push` one-shot service applies the Drizzle schema (`drizzle-kit push-force`)
  on every `up`, so a fresh volume becomes usable without manual steps.
- A fresh database is empty; the real catalog lives in
  `artifacts/api-server/src/data/catalog-original.json` and is restored through the
  admin-guarded `POST /api/admin/catalog/recover-original` (log in first via
  `POST /api/admin/login`). It restores 30 stock rows, 24 product images pointing at
  `artifacts/candys-pet/public/catalog-recovered/<id>.jpg`, and the two `price_*`
  settings. The recovered `price_m` is `0` in that source file, so the storefront
  falls back to $17.990 for Talla M until the price is set in Admin → Precios.
- `deps` installs the workspace from `pnpm-lock.yaml` (`--frozen-lockfile`) into the
  bind-mounted `node_modules`; app services start only after it exits. It uses
  `--store-dir /pnpm-store` (a named volume) so pnpm never creates a package
  store inside the repo.
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

- API (port 8080 is not published to the host — go through the web proxy or the
  container): `curl localhost:3000/api/healthz` → `{"status":"ok"}`;
  `curl localhost:3000/api/catalog` → prices/images/products JSON (empty on a fresh
  database); `docker compose -f docker-compose.base44.yml exec api node -e "fetch('http://127.0.0.1:8080/api/healthz').then(r=>r.text()).then(console.log)"` for a direct check.
- Storefront: `curl -s localhost:3000/ | head` serves the Vite dev HTML of the
  cloned source (never a prebuilt bundle).
- Admin panel lives at `/admin`; dev password comes from `ADMIN_PASSWORD`
  (falls back to `candys2025` when unset).
