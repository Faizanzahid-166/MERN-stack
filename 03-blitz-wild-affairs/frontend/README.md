# BlogForge — MERN + Supabase Blog Platform

A production-ready, full-stack blog platform built with **React + Vite**, **Express.js (ESM)**, **Supabase** (database + storage), **JWT auth**, and **Tailwind CSS**.

---

## 🗂 Project Structure

```
blog-platform/
├── backend/
│   ├── config/
│   │   └── supabase.js          # Supabase client (service-role)
│   ├── controllers/
│   │   ├── authController.js    # Register, login, logout, forgot/reset password
│   │   ├── blogController.js    # CRUD, media upload, likes, bookmarks, stats
│   │   └── commentController.js # Get, add, delete comments
│   ├── middleware/
│   │   ├── auth.js              # JWT protect + adminOnly guards
│   │   └── upload.js            # Multer + Supabase Storage upload helpers
│   ├── routes/
│   │   ├── auth.js
│   │   ├── blogs.js
│   │   └── comments.js
│   ├── server.js                # Express entry point
│   ├── package.json             # "type": "module"
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── blog/
│   │   │       └── BlogCard.jsx      # Card + skeleton loader
│   │   ├── context/
│   │   │   ├── AuthContext.jsx       # User session (httpOnly cookie)
│   │   │   └── ThemeContext.jsx      # Dark / light mode
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx
│   │   │   └── AdminLayout.jsx       # Sidebar CMS layout
│   │   ├── lib/
│   │   │   └── supabase.js           # Public anon client
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Hero + featured + latest + newsletter
│   │   │   ├── Blogs.jsx             # Grid + search + category filter + pagination
│   │   │   ├── BlogDetail.jsx        # Reading progress + markdown + comments + likes
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx     # Stats + recent posts
│   │   │       ├── BlogList.jsx      # Searchable post table
│   │   │       └── BlogEditor.jsx    # Markdown editor + media upload
│   │   ├── services/
│   │   │   └── api.js                # Axios instance + all API helpers
│   │   ├── App.jsx                   # Routes + guard components
│   │   ├── main.jsx
│   │   └── index.css                 # Tailwind + custom classes
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
└── supabase/
    └── schema.sql                    # Full DB schema (run in Supabase SQL editor)
```

---

## 🚀 Quick Setup

### 1. Supabase Project

1. Go to [supabase.com](https://supabase.com) → **New project**
2. Open **SQL Editor** → paste and run `supabase/schema.sql`
3. Go to **Storage** → create 4 **public** buckets:
   - `blog-images`
   - `blog-videos`
   - `blog-pdfs`
   - `user-avatars`
4. Copy your **Project URL**, **service_role key**, and **anon key** from **Settings > API**

---

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase URL + service_role key

npm install
npm run dev      # starts on :5000
```

#### Create your first admin user

After registering via the API/frontend, run this in the Supabase SQL editor:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

---

### 3. Frontend

```bash
cd frontend
cp .env.example .env
# Edit .env with your Supabase URL + anon key

npm install
npm run dev      # starts on :5173 (proxies /api to :5000)
```

---

## 🔐 Auth Flow

| Action | Endpoint | Notes |
|---|---|---|
| Register | `POST /api/auth/register` | `multipart/form-data` with optional avatar |
| Login | `POST /api/auth/login` | Sets `token` httpOnly cookie |
| Logout | `POST /api/auth/logout` | Clears cookie |
| Me | `GET /api/auth/me` | Returns current user |
| Forgot password | `POST /api/auth/forgot-password` | Returns reset token (send via email in prod) |
| Reset password | `POST /api/auth/reset-password` | `{ token, newPassword }` |

---

## 📝 Blog API

| Method | Endpoint | Auth |
|---|---|---|
| GET | `/api/blogs` | Public — supports `?page&limit&category&search&featured` |
| GET | `/api/blogs/:slug` | Public — increments views |
| GET | `/api/blogs/admin/all` | Admin |
| GET | `/api/blogs/admin/stats` | Admin |
| POST | `/api/blogs` | Admin — `multipart/form-data` |
| PUT | `/api/blogs/:id` | Admin — `multipart/form-data` |
| DELETE | `/api/blogs/:id` | Admin |
| POST | `/api/blogs/media/upload` | Admin — upload image/video/PDF |
| POST | `/api/blogs/:blogId/like` | Authenticated |
| POST | `/api/blogs/:blogId/bookmark` | Authenticated |

---

## 🎨 UI Features

- **Dark / Light mode** — system default, persisted in localStorage
- **Reading progress bar** — on blog detail page
- **Skeleton loaders** — while data fetches
- **Framer Motion** animations — page loads + staggered card reveals
- **Glassmorphism** cards
- **Tailwind Typography** — beautiful markdown rendering
- **Toast notifications** — react-hot-toast
- **Fully responsive** — mobile-first

---

## 📦 Production Deployment

### Backend (Railway / Render / Fly.io)

```bash
# Set environment variables in your host:
PORT=5000
NODE_ENV=production
JWT_SECRET=...
SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...
CLIENT_URL=https://your-frontend.vercel.app
```

### Frontend (Vercel / Netlify)

```bash
# Set environment variables:
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

# Build command:
npm run build

# Output directory:
dist
```

> **Important:** Update the Vite proxy and CORS origin for production. Point Axios `baseURL` to your deployed backend URL.

---

## 🛡️ Security Notes

- `SUPABASE_SERVICE_KEY` — **never** expose in the browser. Backend only.
- `VITE_SUPABASE_ANON_KEY` — safe for the browser (read-only unless RLS allows).
- JWT tokens stored in **httpOnly cookies** — safe from XSS.
- Passwords hashed with **bcryptjs** (cost factor 12).
- File uploads validated by MIME type before hitting Supabase Storage.

---

## 📧 Email (Forgot Password)

Currently the reset token is returned in the API response for development. In production, integrate an email provider:

- [Resend](https://resend.com) — simple API, generous free tier
- [Nodemailer](https://nodemailer.com) + SMTP
- [SendGrid](https://sendgrid.com)

Replace the `// TODO: send resetToken via email` comment in `authController.js`.
