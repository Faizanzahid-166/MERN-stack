// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogAPI } from '../api/APIs.js';
import BlogCard, { BlogCardSkeleton } from '../components/blog/BlogCard.jsx';
import FeaturedCard from '../components/blog/FeaturedCard.jsx';
import NewsletterSection from '../components/NewsletterSection.jsx';

const CATEGORIES = [
  { label: 'Technology', icon: '💻' },
  { label: 'Design',     icon: '🎨' },
  { label: 'Business',   icon: '📈' },
  { label: 'Science',    icon: '🔬' },
  { label: 'Culture',    icon: '🎭' },
  { label: 'Health',     icon: '🌿' },
];

export default function Home() {
  const [heroPost, setHeroPost]       = useState(null);
  const [featured, setFeatured]       = useState([]);
  const [latest, setLatest]           = useState([]);
  const [trending, setTrending]       = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [featRes, latestRes, trendRes] = await Promise.all([
          blogAPI.getAll({ featured: true, limit: 4 }),
          blogAPI.getAll({ limit: 6,  sort: 'created_at' }),
          blogAPI.getAll({ limit: 4,  sort: 'views' }),
        ]);

        const featBlogs = featRes.data.blogs;
        setHeroPost(featBlogs[0] || null);
        setFeatured(featBlogs.slice(1));          // rest of featured (up to 3)
        setLatest(latestRes.data.blogs);
        setTrending(trendRes.data.blogs);
      } catch {
        /* graceful — show empty states */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="pt-16">

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-brand-950/30" />
        <div className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 18% 50%, rgba(196,77,240,0.18) 0%, transparent 55%),' +
              'radial-gradient(circle at 80% 15%, rgba(124,58,237,0.12) 0%, transparent 50%)',
          }}
        />
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left text */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/40
                text-brand-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                ✨ Modern Blogging Platform
              </span>
              <h1 className="font-display font-black text-6xl sm:text-7xl leading-[1.05] text-gray-900 dark:text-white mb-6">
                Ideas worth
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-400">
                  sharing
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-lg">
                Discover thoughtful articles, in-depth tutorials, and creative stories from writers around the world.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/blogs" className="btn-brand !text-base !px-8 !py-3.5 shadow-xl shadow-brand-500/20">
                  Explore Blogs →
                </Link>
                <Link to="/register" className="btn-ghost !text-base !px-8 !py-3.5">
                  Start Writing
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12">
                {[['1K+','Articles'],['500+','Writers'],['50K+','Readers']].map(([n, l]) => (
                  <div key={l}>
                    <p className="font-display font-bold text-2xl text-gray-900 dark:text-white">{n}</p>
                    <p className="text-sm text-gray-500">{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — hero featured card */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              {loading
                ? <div className="h-[420px] skeleton rounded-3xl" />
                : heroPost
                  ? <FeaturedCard blog={heroPost} />
                  : <HeroPlaceholder />
              }
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader title="Browse by Topic" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/blogs?category=${cat.label}`}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-200 dark:border-gray-800
                  hover:border-brand-400 dark:hover:border-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20
                  hover:shadow-md transition-all duration-200 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand-600">{cat.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── More Featured ── */}
      {(loading || featured.length > 0) && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
              <SectionHeader title="Featured Stories" subtitle="Hand-picked by our editors" />
              <Link to="/blogs?featured=true" className="text-sm text-brand-600 hover:text-brand-700 font-medium hidden sm:block">
                See all featured →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading
                ? Array(3).fill(0).map((_, i) => <BlogCardSkeleton key={i} />)
                : featured.map((blog, i) => <BlogCard key={blog.id} blog={blog} index={i} />)
              }
            </div>
          </div>
        </section>
      )}

      {/* ── Latest + Trending side-by-side ── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Latest — 2/3 width */}
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between mb-8">
              <SectionHeader title="Latest Articles" />
              <Link to="/blogs" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {loading
                ? Array(6).fill(0).map((_, i) => <BlogCardSkeleton key={i} />)
                : latest.map((blog, i) => <BlogCard key={blog.id} blog={blog} index={i} />)
              }
            </div>
          </div>

          {/* Trending sidebar — 1/3 width */}
          <div>
            <SectionHeader title="Trending 🔥" className="mb-6" />
            <div className="space-y-4 mt-8">
              {loading
                ? Array(4).fill(0).map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-16 h-16 skeleton rounded-xl flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 skeleton rounded w-full" />
                        <div className="h-3 skeleton rounded w-2/3" />
                      </div>
                    </div>
                  ))
                : trending.map((blog, i) => <TrendingItem key={blog.id} blog={blog} rank={i + 1} />)
              }
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <NewsletterSection />
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────
function SectionHeader({ title, subtitle }) {
  return (
    <div>
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white">{title}</h2>
      {subtitle && <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">{subtitle}</p>}
    </div>
  );
}

function TrendingItem({ blog, rank }) {
  return (
    <Link
      to={`/blogs/${blog.slug}`}
      className="flex gap-3 group hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded-xl transition-colors"
    >
      {blog.cover_image ? (
        <img src={blog.cover_image} alt={blog.title}
          className="w-16 h-16 object-cover rounded-xl flex-shrink-0 group-hover:opacity-90 transition-opacity" />
      ) : (
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-100 to-purple-100 dark:from-brand-900/30 dark:to-purple-900/30 flex-shrink-0 flex items-center justify-center">
          <span className="font-display font-black text-2xl text-brand-300">#{rank}</span>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-xs text-brand-500 font-semibold mb-0.5">#{rank}</p>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-brand-600 transition-colors font-display leading-snug">
          {blog.title}
        </p>
        <p className="text-xs text-gray-400 mt-1">{blog.views?.toLocaleString() ?? 0} views</p>
      </div>
    </Link>
  );
}

function HeroPlaceholder() {
  return (
    <div className="h-[420px] rounded-3xl bg-gradient-to-br from-brand-100 to-purple-100 dark:from-brand-900/30 dark:to-purple-900/30 flex items-center justify-center">
      <div className="text-center text-brand-400">
        <p className="text-6xl font-display font-black mb-3 opacity-30">B</p>
        <p className="text-sm opacity-60">Your featured post will appear here</p>
      </div>
    </div>
  );
}
