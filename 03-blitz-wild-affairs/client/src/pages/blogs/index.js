// src/pages/blogs/index.js
// ↳ Route: /blogs
// Was: src/pages/Blogs.jsx — moved into blogs/ folder for clean routing.
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { blogAPI } from '@/api/APIs';
import { useDebounce } from '@/hooks/useDebounce';
import BlogCard, { BlogCardSkeleton } from '@/components/blog/BlogCard';
import Pagination from '@/components/ui/Pagination';

const CATEGORIES = ['All', 'Politics', 'War', 'Technology', 'Design', 'Business', 'Science', 'Culture', 'Health'];

export default function Blogs() {
  const router = useRouter();
  const q = router.query || {};
  const [blogs, setBlogs]           = useState([]);
  const [total, setTotal]           = useState(0);
  const [pages, setPages]           = useState(1);
  const [loading, setLoading]       = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const page     = Number(q.page || 1);
  const category = q.category || '';
  const sort     = q.sort || 'created_at';
  const debouncedSearch = useDebounce(searchInput, 400);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9, sort };
      if (category && category !== 'All') params.category = category;
      if (debouncedSearch) params.search = debouncedSearch;
      const { data } = await blogAPI.getAll(params);
      setBlogs(data.blogs);
      setTotal(data.total);
      setPages(data.pages);
    } catch {
      setBlogs([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, category, sort, debouncedSearch]);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  // Sync search input from URL on mount / router changes
  useEffect(() => {
    if (!router.isReady) return;
    setSearchInput(router.query.search || '');
  }, [router.isReady, router.query.search]);

  // Push debounced search back into URL (shallow)
  useEffect(() => {
    if (!router.isReady) return;
    const next = { ...router.query };
    if (debouncedSearch) next.search = debouncedSearch; else delete next.search;
    delete next.page;
    router.replace({ pathname: router.pathname, query: next }, undefined, { shallow: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, router.isReady]);

  const setParam = (key, value) => {
    const next = { ...router.query };
    if (value) next[key] = value; else delete next[key];
    delete next.page;
    router.replace({ pathname: router.pathname, query: next }, undefined, { shallow: true });
  };

  const handlePageChange = (p) => {
    const next = { ...router.query, page: p };
    router.replace({ pathname: router.pathname, query: next }, undefined, { shallow: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display font-bold text-5xl text-gray-900 dark:text-white mb-3">All Articles</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {loading ? '—' : `${total} article${total !== 1 ? 's' : ''} published`}
          </p>
        </motion.div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search articles…"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setParam('sort', e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
          >
            <option value="created_at">Newest</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const active = cat === 'All' ? !category : category === cat;
            return (
              <button
                key={cat}
                onClick={() => setParam('category', cat === 'All' ? '' : cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  active
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-brand-100 hover:text-brand-600'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(9).fill(0).map((_, i) => <BlogCardSkeleton key={i} />)}
          </div>
        ) : blogs.length === 0 ? (
          <EmptyState
            onClear={() => {
              setSearchInput('');
              router.replace({ pathname: router.pathname, query: {} }, undefined, { shallow: true });
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, i) => <BlogCard key={blog.id} blog={blog} index={i} />)}
          </div>
        )}

        <Pagination current={page} total={pages} onChange={handlePageChange} />
      </div>
    </div>
  );
}

function EmptyState({ onClear }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-28 text-gray-400">
      <div className="text-6xl mb-5">📭</div>
      <h3 className="font-display font-semibold text-xl text-gray-700 dark:text-gray-300 mb-2">No articles found</h3>
      <p className="text-sm mb-6">Try a different search term or category.</p>
      <button onClick={onClear} className="btn-ghost text-sm">Clear filters</button>
    </motion.div>
  );
}
