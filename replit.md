# Nilambar Behera Portfolio

A personal portfolio for Nilambar Behera — a Stranger Things-themed Vite+React frontend with an Express backend (email via Resend, site stats via PostgreSQL).

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the frontend (port 21113)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- Required env: `DATABASE_URL` — Postgres connection string (auto-provisioned)
- Optional env: `RESEND_API_KEY`, `EMAIL_TO` — for contact form email (graceful 503 without them)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: Vite + React, Tailwind v3 (postcss), Wouter routing, Framer Motion, Three.js
- API: Express 5, pino logging
- DB: PostgreSQL (raw `pg` pool in api-server, no Drizzle for this project)
- Build: esbuild (CJS bundle for api-server)

## Where things live

- `artifacts/portfolio/` — React+Vite frontend
- `artifacts/portfolio/src/components/` — all page section components
- `artifacts/portfolio/src/pages/Home.tsx` — page composition
- `artifacts/portfolio/src/lib/projects-data.ts` — project data (uses @assets alias)
- `artifacts/portfolio/public/` — static assets (resume.pdf, favicon, og image, contact icons, media)
- `artifacts/api-server/src/routes/stats.ts` — site view/love count API (raw pg)
- `artifacts/api-server/src/routes/send.ts` — contact form email (Resend)
- `attached_assets/` — source images/media copied into portfolio/public during setup

## Architecture decisions

- Tailwind v3 (NOT v4) — original project used v3; postcss config with autoprefixer
- `@assets` alias → `../../attached_assets` (two levels up from artifact) for dev; assets also in `public/` for prod
- Stats tables created on-demand in `ensureTables()` with a `tablesEnsured` guard — avoids repeated CREATE TABLE calls
- `pdfjs-dist` pinned at v4.x — v6 uses `Map.prototype.getOrInsertComputed` (not available in current browser env)
- `react-github-calendar` uses named export `{ GitHubCalendar }` (not default export in v4.5+)
- Wouter router uses `BASE_URL` as base for path-based proxy routing

## Product

- Animated intro screen (Stranger Things neon "NILAMBAR" sign)
- Hero, About, Education, Skills, Projects, Achievements, Resume (PDF viewer), GitHub contributions, Contact
- Floating audio player, custom cursor, particle effects
- Live site stats (view count + love button) via PostgreSQL
- Contact form sends email via Resend API

## Gotchas

- Clear `artifacts/portfolio/node_modules/.vite` cache after changing pdfjs-dist or react-github-calendar versions
- Multi-statement SQL in `pg.query()` causes errors — always use separate `await p.query()` calls
- `react-github-calendar` export: `import { GitHubCalendar } from "react-github-calendar"` (named, not default)
- `pdfjs-dist` v6 requires `Map.prototype.getOrInsertComputed` — use v4.x instead

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
