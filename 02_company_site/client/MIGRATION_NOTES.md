# Next.js Migration Notes — Blitz Tech Hub

## Files DELETED (Vite-only, no Next.js equivalent needed)

| File               | Reason removed |
|--------------------|----------------|
| `src/App.jsx`      | Replaced by `src/pages/_app.js` |
| `src/main.jsx`     | Replaced by Next.js internal entry point |
| `src/index.css`    | Moved to `src/styles/globals.css`, imported in `_app.js` |

---

## Files RENAMED / MOVED

| Old path                  | New path                       | Route served |
|---------------------------|--------------------------------|--------------|
| `src/pages/Home.jsx`      | `src/pages/index.js`           | `/`          |
| `src/pages/About.jsx`     | `src/pages/about.js`           | `/about`     |
| `src/pages/Services.jsx`  | `src/pages/services.js`        | `/services`  |
| `src/pages/Career.jsx`    | `src/pages/career.js`          | `/career`    |
| `src/pages/Contact.jsx`   | `src/pages/contact.js`         | `/contact`   |

---

## Files CREATED (new)

| File                        | Purpose |
|-----------------------------|---------|
| `src/pages/_app.js`         | Global layout: Navbar + Footer + AnimatePresence page transitions |
| `src/pages/_document.js`    | Custom HTML shell: Inter font, favicon, theme-color meta |
| `src/pages/404.js`          | Custom Not Found page |
| `src/styles/globals.css`    | Global CSS (moved + added `.grid-bg` utility class) |
| `jsconfig.json`             | `@/*` alias → `src/*` |
| `next.config.js`            | Next.js config |
| `tailwind.config.js`        | Tailwind with custom colors (primary, accent, neon) |
| `postcss.config.js`         | PostCSS for Tailwind |
| `.env.local`                | Environment variable template |
| `package.json`              | Next.js 14 + all dependencies |

---

## Fix 1 — Routing (CRITICAL)

**Problem:** `BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `useNavigate`, `useParams`
all imported from `react-router-dom`.

**Fix:**
- `App.jsx` deleted entirely. `_app.js` now wraps every page with Navbar + Footer.
- `AnimatePresence` in `_app.js` uses `router.pathname` as key for exit animations.
- All `<Link to="...">` → `<Link href="...">` from `next/link`.
- `NavLink` with `isActive` callback → plain `<Link>` + manual `isActive()` using `useRouter().pathname`.
- `useNavigate` → `useRouter().push()` (none existed in this project, but pattern is documented).
- `useParams` → `router.query` (none existed in this project, but pattern is documented).

---

## Fix 2 — Environment Variables

**Problem:** `import.meta.env.MODE`, `import.meta.env.VITE_*` — Vite-only APIs that crash in Node/Next.

**Fix:**

| Old (Vite)                              | New (Next.js)                                  |
|-----------------------------------------|------------------------------------------------|
| `import.meta.env.MODE === 'development'`| `process.env.NODE_ENV === 'development'`       |
| `import.meta.env.VITE_RENDER_BACKEND_API_URL` | `process.env.NEXT_PUBLIC_RENDER_BACKEND_API_URL` |
| `import.meta.env.VITE_NODE_BACKEND_API_URL`   | `process.env.NEXT_PUBLIC_NODE_BACKEND_API_URL`   |

Rename your `.env` keys to `NEXT_PUBLIC_*` — Next.js only exposes vars prefixed
`NEXT_PUBLIC_` to the browser bundle.

---

## Fix 3 — API_BASE undefined in Career.jsx

**Problem:** `fetch(\`${API_BASE}/jobs\`)` — `API_BASE` was never defined, causing a runtime crash.

**Fix:** Added at top of `career.js`:
```js
const API_BASE =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_NODE_BACKEND_API_URL
    : process.env.NEXT_PUBLIC_RENDER_BACKEND_API_URL;
```

---

## Fix 4 — Alias Paths

**Problem:** No `jsconfig.json` → `@/components/...` imports would fail.

**Fix:** `jsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": { "@/*": ["./*"] }
  }
}
```

All files now use `@/components/...`, `@/api/...`, `@/data/...`, `@/styles/...`.

---

## Fix 5 — Global CSS Location

**Problem:** Next.js only allows global CSS to be imported inside `_app.js`.
Importing it anywhere else throws a build error.

**Fix:** Moved `src/index.css` → `src/styles/globals.css` and imported
it at the top of `src/pages/_app.js`.

Added missing `.grid-bg` utility class (was used in pages but not defined in CSS).

---

## Fix 6 — Tailwind Custom Tokens

Added to `tailwind.config.js` so `text-primary`, `bg-accent`, `text-neon`, etc. work:
```js
colors: {
  primary:        '#6C63FF',
  'primary-dark': '#5A52D5',
  accent:         '#00D4FF',
  neon:           '#39FF14',
}
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill in your environment variables
cp .env.local .env.local
# Edit NEXT_PUBLIC_NODE_BACKEND_API_URL and NEXT_PUBLIC_RENDER_BACKEND_API_URL

# 3. Run development server
npm run dev

# 4. Build for production
npm run build
npm start
```

---

## Route Map

| URL          | File                          |
|--------------|-------------------------------|
| `/`          | `src/pages/index.js`          |
| `/about`     | `src/pages/about.js`          |
| `/services`  | `src/pages/services.js`       |
| `/career`    | `src/pages/career.js`         |
| `/contact`   | `src/pages/contact.js`        |
| `/*` (404)   | `src/pages/404.js`            |
