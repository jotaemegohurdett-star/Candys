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
build + `node dist/index.mjs` on 8080), `video` (the separate `candys-pet-video` artifact
on 26272), `web` (Vite dev server on 3000).

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
- **The storefront's second video is a separate app**, not a bundled file: `VideoSection`
  embeds an iframe at `/candys-pet-video/`, which upstream is routed by the platform
  (Replit path router; in production `scripts/build-vercel.sh` copies the built
  `candys-pet-video` into `artifacts/candys-pet/dist/public/candys-pet-video`). The sandbox
  serves it with the `video` service (port 26272, `BASE_PATH=/candys-pet-video/`) and
  `vite.config.ts` proxies that path only when `VIDEO_PROXY_TARGET` is set (Compose sets
  `http://video:26272`). With the variable unset the proxy is absent and behavior is
  unchanged; if the `video` service is stopped, the iframe falls through to the
  storefront's SPA fallback and shows a copy of the whole page inside the video slot.
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
- **A fresh database serves an empty catalog, and that is user-visible.** Once
  `/api/catalog` answers successfully the storefront treats the API list as the source of
  truth, so with no rows the product grid renders *nothing* (the bundled `KNOWN_PRODUCTS`
  only apply while the API is unavailable). Populate it through the app's own
  authenticated recovery path, not with SQL:
  `curl -c /tmp/cj -X POST http://localhost:3000/api/admin/login -H 'Content-Type: application/json' -d '{"password":"candys2025"}'`
  then
  `curl -b /tmp/cj -X POST http://localhost:3000/api/admin/catalog/recover-original`
  → 30 stock rows, 24 image rows (rewritten to `/catalog-recovered/<id>.jpg`, which exist in
  `artifacts/candys-pet/public/catalog-recovered/`) and the global prices. That yields 14
  visible products (p6 stays hidden by design as a duplicate of p12); stock rows with qty 0
  render an "AGOTADO" overlay. The admin panel is at `/admin` (default password
  `candys2025`, `ADMIN_PASSWORD` overrides it).
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
