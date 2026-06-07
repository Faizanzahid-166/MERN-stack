# Blitz World Affairs (client)

Blitz WorldAffairs is a customized instance of the BlogForge platform adapted for the "Blitz World Affairs" publication. This folder (`client/`) contains the Next.js front-end used to publish news, analysis, and long-form articles about geopolitics, international affairs, and related topics.

This README documents the real, current state of the codebase and how to run it locally.

---

## Summary

- Frontend (this folder): Next.js (Pages Router) app using React 19 and Next 16 (Pages-based routing under `src/pages`).
- Backend: Express + Supabase (see `../backend/`).
- Alternative frontend: there is also a `frontend/` folder (Vite + React Router) in the repo — it is a separate build/variant used for other environments.

Important: the Next.js app in this `client/` folder currently uses the Pages Router (presence of `src/pages/_app.js` and `src/pages/_document.js`). The App Router (`app/`) is not present.

---

## Quick start (local)

1. Backend (Express + Supabase)

```bash
cd backend
cp .env.example .env
# edit .env to set SUPABASE keys + JWT_SECRET + CLIENT_URL
npm install
npm run dev    # starts the backend on :5000 (default)
```

2. Next.js client (this folder)

```bash
cd client
cp .env.local.example .env.local   # if present, otherwise set NEXT_PUBLIC_SITE_URL and any client envs
npm install
npm run dev    # starts Next.js dev server (default :3000)
```

3. Alternative Vite frontend (optional)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev    # starts Vite dev server (5173 by default)
```

Notes:
- The Next.js client proxies or calls the backend using `src/api/Client.js` and the `blogAPI` helper in `src/api/APIs.js`.
- Ensure Supabase and backend are running before using admin features.

---

## Project layout (high level)

- `backend/` — Express server, Supabase service-role client, API controllers, upload helpers.
- `client/` — Next.js front-end (Pages Router):
  - `src/pages/` — pages and route handlers (includes `_app.js`, `_document.js`, `index.js`, and `blogs/[slug].js`).
  - `src/components/` — UI components (blog cards, admin editor, preview, etc.).
  - `src/api/` — Axios client + API wrappers (`APIs.js`).
  - `src/context/` — Auth + Theme contexts.
  - `src/layouts/` — `MainLayout` and `AdminLayout`.
- `frontend/` — Vite-based alternate front-end (React Router) used in another variation of the project.
- `supabase/` — SQL schema useful for creating tables in Supabase.

---

## What is implemented (current state)

- Pages Router Next.js application with client-side and server-side rendering for different routes.
- Markdown editor and preview using `react-markdown` + `remark-gfm` (preview and published pages updated to preserve paragraph spacing using `remark-breaks`).
- Blog CRUD, media uploads, likes, bookmarks via backend `/api/blogs` endpoints.
- Supabase used for DB and storage (see `backend/config/supabase.js`).
- TailwindCSS + @tailwindcss/typography for content styling.

---

## SEO & Metadata (status)

Current status:
- The project uses the Pages Router and does not yet use Next.js App Router `metadata` API. There is no centralized `app/metadata` in this folder.
- Per-article structured data (JSON-LD) is not yet injected automatically across all pages.
- `sitemap.xml`, `news-sitemap.xml`, `robots.txt`, and `rss.xml` routes are not present yet under the Next.js app; they should be added as server routes or route handlers.

Recommended next steps (priority):
1. Decide whether to migrate to the App Router (recommended for advanced Metadata API usage). You may run both side-by-side — adding an `app/` directory will let App Router routes take precedence while older Pages Router pages continue to work.
2. Add centralized SEO utilities and Metadata generation (either via `app/metadata.ts` if migrating or via helper functions used in each Pages Router page).
3. Add dynamic sitemap, news sitemap, robots.txt, and RSS route files (server-side endpoints) that read published articles from the backend.

If you want, I can scaffold the App Router `app/` files and a single example article page that uses `generateMetadata` and injects JSON-LD; or I can implement Pages Router-compatible server endpoints and a centralized SEO helper module.

---

## Environment variables (important)

Set the following values for local development (example names used in repo):

- Backend (`backend/.env`)
  - `SUPABASE_URL` — your Supabase project URL
  - `SUPABASE_SERVICE_KEY` — Supabase service role key (backend only)
  - `JWT_SECRET` — secret used for JWT signing
  - `CLIENT_URL` — frontend origin (e.g., `http://localhost:3000`)

- Next.js client (`client/.env.local` or process envs)
  - `NEXT_PUBLIC_SITE_URL` — canonical site URL (e.g., `http://localhost:3000`)
  - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` if client accesses Supabase directly

Do not commit secrets to source control.

---

## Notable files to review

- `client/src/pages/_app.js` — App wrapper (provides layouts and Toaster). This confirms Pages Router usage.
- `client/src/pages/_document.js` — Document wrapper (theme script). Pages Router.
- `client/src/pages/blogs/[slug].js` — Blog detail page (ReactMarkdown rendering).
- `client/src/components/admin/BlogEditor.jsx` — Editor and preview component (preview uses remark-breaks dynamically).
- `client/src/api/APIs.js` — Client wrappers for backend endpoints.
- `backend/src/controllers/blogController.js` — Server controllers showing content stored as-is in Supabase.

---

## How you (or I) can proceed next

Options (pick one):
- Keep Pages Router and add server routes for `sitemap.xml`, `robots.txt`, `rss.xml` plus a centralized SEO helper used by pages. (Lower migration cost)
- Migrate incrementally to App Router and implement Metadata API, JSON-LD injection, and route handlers. (Recommended for enterprise SEO features)

Tell me which path you prefer and I will scaffold the required files and implement the first-pass changes.

---

## Contributing / Contacts

If you need help implementing the SEO plan, JSON-LD, or migrating to App Router, ask me to scaffold the files you want and I will add them to the repo with working examples.

---

*Last updated:* June 7, 2026
