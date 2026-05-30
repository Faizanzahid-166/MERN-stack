-- ============================================================
-- MERN Blog Platform — Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── USERS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS 02_users (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  password    TEXT NOT NULL,          -- bcrypt hash (stored in your backend, NOT Supabase Auth)
  avatar      TEXT,
  role        TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin','user')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── BLOGS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS 02_blogs (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  excerpt      TEXT,
  content      TEXT NOT NULL,
  cover_image  TEXT,
  category     TEXT,
  tags         TEXT[],
  featured     BOOLEAN DEFAULT FALSE,
  published    BOOLEAN DEFAULT FALSE,
  views        INTEGER DEFAULT 0,
  author_id    UUID REFERENCES 02_users(id) ON DELETE CASCADE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─── BLOG MEDIA ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS 02_blog_media (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blog_id     UUID REFERENCES 02_blogs(id) ON DELETE CASCADE,
  media_type  TEXT CHECK (media_type IN ('image','video','pdf')),
  media_url   TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── COMMENTS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS 02_comments (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blog_id     UUID REFERENCES 02_blogs(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES 02_users(id) ON DELETE CASCADE,
  comment     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── BOOKMARKS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS 02_bookmarks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES 02_users(id) ON DELETE CASCADE,
  blog_id     UUID REFERENCES 02_blogs(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, blog_id)
);

-- ─── LIKES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS 02_likes (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES 02_users(id) ON DELETE CASCADE,
  blog_id     UUID REFERENCES 02_blogs(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, blog_id)
);

-- ─── AUTO-UPDATE updated_at ON BLOGS ──────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blogs_updated_at
  BEFORE UPDATE ON 02_blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── ROW LEVEL SECURITY ───────────────────────────────────
-- (We use service_role key in backend, so RLS is permissive here.
--  Tighten if you expose Supabase directly to the client.)
ALTER TABLE 02_users      ENABLE ROW LEVEL SECURITY;
ALTER TABLE 02_blogs      ENABLE ROW LEVEL SECURITY;
ALTER TABLE 02_blog_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE 02_comments   ENABLE ROW LEVEL SECURITY;
ALTER TABLE 02_bookmarks  ENABLE ROW LEVEL SECURITY;
ALTER TABLE 02_likes      ENABLE ROW LEVEL SECURITY;

-- Allow service_role full access (used by your Express backend)
CREATE POLICY "service_role_all" ON 02_users      FOR ALL USING (true);
CREATE POLICY "service_role_all" ON 02_blogs      FOR ALL USING (true);
CREATE POLICY "service_role_all" ON 02_blog_media FOR ALL USING (true);
CREATE POLICY "service_role_all" ON 02_comments   FOR ALL USING (true);
CREATE POLICY "service_role_all" ON 02_bookmarks  FOR ALL USING (true);
CREATE POLICY "service_role_all" ON 02_likes      FOR ALL USING (true);

-- ─── STORAGE BUCKETS (run in Supabase Dashboard > Storage) ─
-- Or via Supabase CLI / API. Listed here for reference:
--   blog-images   (public)
--   blog-videos   (public)
--   blog-pdfs     (public)
--   user-avatars  (public)
