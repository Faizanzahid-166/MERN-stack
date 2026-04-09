# ⚡ Blitz Tech Hub — MERN Stack Digital Agency Website

A production-ready, full-stack MERN web application for **Blitz Tech Hub**, a modern digital services agency.

---

## 📁 Project Structure

```
blitz-tech-hub/
├── backend/                  # Node.js + Express API
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/
│   │   ├── contactController.js
│   │   └── jobController.js
│   ├── middleware/
│   │   └── errorHandler.js   # Global error handler
│   ├── models/
│   │   ├── Contact.js        # Mongoose contact schema
│   │   └── Job.js            # Mongoose job schema
│   ├── routes/
│   │   ├── contactRoutes.js  # POST /api/contact
│   │   └── jobRoutes.js      # GET|POST /api/jobs
│   ├── .env.example
│   ├── package.json
│   └── server.js             # Express app entry point
│
└── frontend/                 # React (Vite) + Tailwind CSS
    ├── src/
    │   ├── components/
    │   │   ├── Footer.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── PageWrapper.jsx   # Page transition wrapper
    │   │   ├── SectionHeading.jsx
    │   │   └── ServiceCard.jsx
    │   ├── data/
    │   │   └── services.js       # All 10 services data
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── About.jsx
    │   │   ├── Services.jsx
    │   │   ├── Career.jsx        # Fetches jobs from backend
    │   │   └── Contact.jsx       # Submits to backend API
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css             # Tailwind + custom styles
    ├── index.html                # SEO meta tags
    ├── .env.example
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

---

### 1. Clone & Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

### 2. Configure Environment Variables

**Backend — copy `.env.example` to `.env`:**
```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/blitz-tech-hub?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
```

**Frontend — copy `.env.example` to `.env`:**
```bash
cd frontend
cp .env.example .env
```

The Vite proxy (`vite.config.js`) already forwards `/api` to `localhost:5000`,
so you only need to set `VITE_API_URL` for production builds.

---

### 3. Run the Backend

```bash
cd backend
npm run dev       # Uses nodemon for hot-reload
# or
npm start         # Production start
```

API will be live at: **http://localhost:5000**

---

### 4. Seed Demo Job Listings (Optional)

After the backend is running, seed 5 demo jobs:

```bash
curl -X POST http://localhost:5000/api/jobs/seed
```

Or use Postman / Thunder Client to hit `POST /api/jobs/seed`.

---

### 5. Run the Frontend

```bash
cd frontend
npm run dev
```

App will be live at: **http://localhost:5173**

---

## 🌐 API Reference

### Contact

| Method | Endpoint         | Description               |
|--------|-----------------|---------------------------|
| POST   | `/api/contact`  | Submit a contact message  |
| GET    | `/api/contact`  | Retrieve all messages     |

**POST `/api/contact` body:**
```json
{
  "name":    "Jane Smith",
  "email":   "jane@example.com",
  "message": "I'd love a quote for a new website."
}
```

---

### Jobs / Career

| Method | Endpoint          | Description            |
|--------|------------------|------------------------|
| GET    | `/api/jobs`       | Get all active jobs    |
| POST   | `/api/jobs`       | Create a job listing   |
| POST   | `/api/jobs/seed`  | Seed demo jobs (dev)   |

---

## 🎨 Tech Stack

### Frontend
| Tool             | Purpose                        |
|-----------------|--------------------------------|
| React 18        | UI library                     |
| Vite            | Build tool & dev server        |
| Tailwind CSS    | Utility-first styling          |
| Framer Motion   | Page & scroll animations       |
| React Router 6  | Client-side routing            |
| Lucide React    | Icon library                   |

### Backend
| Tool              | Purpose                        |
|------------------|--------------------------------|
| Node.js           | JavaScript runtime             |
| Express.js        | HTTP framework                 |
| MongoDB + Mongoose| Database & ODM                |
| express-validator | Input validation               |
| dotenv            | Environment variables          |
| cors              | Cross-origin resource sharing  |

---

## 🏗️ Features

### Frontend
- ✅ Sticky responsive Navbar with mobile drawer
- ✅ Animated Hero with floating orbs & grid overlay
- ✅ 10 services with animated cards & hover effects
- ✅ Smooth page transitions via Framer Motion
- ✅ Dynamic career listings fetched from backend
- ✅ Contact form connected to backend with validation
- ✅ Google Maps embed (dark-mode inverted)
- ✅ SEO meta tags in `index.html`
- ✅ Dark premium design with neon gradient accents
- ✅ Fully responsive (mobile-first)

### Backend
- ✅ RESTful Express API
- ✅ MongoDB via Mongoose with typed schemas
- ✅ Input validation (`express-validator`)
- ✅ Global error handling middleware
- ✅ CORS configured for frontend origin
- ✅ Environment variable management

---

## 📦 Production Build

```bash
# Build frontend
cd frontend
npm run build     # Outputs to frontend/dist/

# Serve frontend dist via Express (optional)
# Or deploy dist/ to Vercel / Netlify

# Deploy backend to Railway / Render / VPS
```

---

## 🔒 Security Notes

- Add authentication middleware before `GET /api/contact` in production
- Remove `POST /api/jobs/seed` route in production
- Use `helmet` and `express-rate-limit` for production hardening
- Store all secrets in `.env` — never commit `.env` to git

---

Built with ⚡ by the Blitz Tech Hub team.
