import "./config/dotenv.js"; // load .env first
import {app, PORT} from './index.js'

import authRoutes    from './routes/auth.js';
import blogRoutes    from './routes/blogs.js';
import commentRoutes from './routes/comments.js';
import adminRoutes   from './routes/admin.js';

import { errorHandler, notFound } from './middleware/errorHandler.js';
import { rateLimit } from './middleware/rateLimit.js';

// ── Health ────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  console.log(`[${new Date().toISOString()}] 🔥 Health Check hit`);
  res.status(200).json({
    status: 'online',
    success: true,
    message: "BlogForge API is fully operational ⚡",
    env: process.env.NODE_ENV || 'development'
  });
})

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth',     rateLimit(20, 60_000), authRoutes);   // rate-limit login/register
app.use('/api/blogs',    blogRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin',    adminRoutes);    // user management (admin-only inside)

// ── 404 + Error Handler ───────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  BlogForge API  →  http://localhost:${PORT}`);
  console.log(`    Env       : ${process.env.NODE_ENV || 'development'}`);
  console.log(`    Supabase  : ${process.env.SUPABASE_URL ? '✅' : '❌  SUPABASE_URL missing'}\n`);
});

process.on('unhandledRejection', (reason) => console.error('Unhandled rejection:', reason));

export default app;
