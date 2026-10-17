# AGENTS.md

Candy's Pet — pnpm workspace monorepo: `artifacts/candys-pet` (React/Vite storefront),
`artifacts/api-server` (Express 5 API), `lib/db` (Drizzle + Postgres), plus the optional
`artifacts/candys-pet-video` and `artifacts/mockup-sandbox` artifacts.

## Base44 sandbox (development)

Everything runs from the clone via `docker-compose.base44.yml`; no image bakes app source.

```bash
docker compose -f docker-compose.base44.yml up -d --build   # first boot (installs deps, pushes schema)
docker compose -f docker-compose.base44.yml ps
curl -s http://localhost:3000/ | head                # storefront (host port 3000)
curl -s http://localhost:3000/api/healthz            # API through the Vite proxy
curl -s http://localhost:3000/api/catalog            # DB-backed pricing/catalog payload
```

Services: `db` (postgres:16), `deps` (one-shot `pnpm install --frozen-lockfile` into named
`node_modules` volumes), `migrate` (one-shot `drizzle-kit push --force`), `api` (esbuild
build + `node dist/index.mjs` on 8080), `web` (Vite dev server on 3000).

Non-obvious things worth knowing:

- **Dependencies live in named volumes**, not in the clone, so the host checkout stays
  clean. After changing `pnpm-lock.yaml` or any manifest, re-run the installer:
  `docker compose -f docker-compose.base44.yml run --rm deps` (or `up -d --build`), then
  restart `api` / `web`.
- **Single origin:** the storefront fetches `${BASE_URL}/api/*`, so Vite proxies `/api` to
  the API. `vite.config.ts` reads `API_PROXY_TARGET` (`http://api:8080` in Compose);
  unset it falls back to `http://localhost:8080`, the original Replit behavior. This keeps
  the admin session cookie on one origin (cross-origin cookies would need
  `credentials: 'include'` + `Access-Control-Allow-Credentials`).
- **The API dev script has no watcher** (`build && start`). After editing
  `artifacts/api-server` or `lib/db`, restart it:
  `docker compose -f docker-compose.base44.yml restart api`.
  Frontend edits hot-reload on their own.
- `BASE44_PREVIEW_MODE` is passed through from the platform. Nothing in this repo branches
  on it yet; when unset or any value other than `"1"`, behavior is unchanged.
- Secrets arrive from `/run/base44/app.env` (outside the repo), never from a committed
  `.env`: `MP_ACCESS_TOKEN` (MercadoPago checkout) and `BLOB_READ_WRITE_TOKEN` (admin image
  uploads). Both are optional for boot; without them checkout falls back to WhatsApp
  transfer and uploads return 404. Do not move these keys under Compose `environment:` —
  that would permanently override the dashboard values.
- The DB starts empty by design: the storefront renders its built-in `KNOWN_PRODUCTS` and
  default prices (`price_m` 17990 / `price_l` 18990), and the admin panel at `/admin`
  (default password `candys2025`, override with `ADMIN_PASSWORD`) fills the catalog.
  There is no seed script; `catalog-original.json` is only for the authenticated
  recovery endpoint.
- Node 22 in Compose (the Replit original was Node 24); Vite 7 and Express 5 are fine on it.

## Checks

```bash
pnpm run typecheck                                        # whole workspace
pnpm --filter @workspace/candys-pet run build             # storefront only
pnpm --filter @workspace/api-server run build             # API only
docker compose -f docker-compose.base44.yml run --rm api pnpm --filter @workspace/api-server run test:pricing
```

`pnpm run build` (workspace-wide typecheck) currently fails inside the optional
`artifacts/candys-pet-video` artifact — validate the storefront and API separately.

## Deploy

Vercel (`vercel.json`): the SPA is built to `artifacts/candys-pet/dist/public` and the API
is served through the `api/[...path].js` serverless entry.
