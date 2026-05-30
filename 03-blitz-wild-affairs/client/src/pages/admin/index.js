// src/pages/admin/index.js
// ↳ Route: /admin
// Was: src/pages/admin/Dashboard.jsx — renamed to index.js.
// AdminLayout is applied automatically by _app.js for all /admin/* routes.
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogAPI } from '@/api/APIs';
import { useAuth } from '@/context/AuthContext';
import { PageLoader } from '@/components/ui/Spinner';

const StatCard = ({ label, value, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
  >
    <div className="flex items-center justify-between mb-4">
      <span className="text-3xl">{icon}</span>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${color}`}>Live</span>
    </div>
    <p className="text-3xl font-display font-bold">{value ?? '—'}</p>
    <p className="text-sm text-gray-500 mt-1">{label}</p>
  </motion.div>
);

export default function Dashboard() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [stats, setStats]   = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  // Guard: redirect non-admins
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) router.replace('/');
  }, [authLoading, user, isAdmin, router]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await blogAPI.getDashboardStats();
        setStats(data.stats);
        setRecent(data.recentBlogs);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (authLoading) return <PageLoader />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Your platform at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <StatCard label="Total Blogs" value={stats?.totalBlogs} icon="📝" color="bg-blue-100 text-blue-600" delay={0} />
        <StatCard label="Total Users" value={stats?.totalUsers} icon="👥" color="bg-green-100 text-green-600" delay={0.1} />
        <StatCard label="Total Views" value={stats?.totalViews?.toLocaleString()} icon="👁️" color="bg-brand-100 text-brand-600" delay={0.2} />
      </div>

      <div className="flex gap-4 mb-10">
        <Link href="/admin/blogs/new" className="btn-brand text-sm">+ New Post</Link>
        <Link href="/admin/blogs" className="btn-ghost text-sm">Manage Posts</Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-display font-semibold text-lg">Recent Posts</h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {loading
            ? Array(4).fill(0).map((_, i) => (
                <div key={i} className="px-6 py-4 flex items-center gap-4">
                  <div className="h-4 skeleton rounded flex-1" />
                  <div className="h-4 skeleton rounded w-20" />
                </div>
              ))
            : recent.map((blog) => (
                <div key={blog.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{blog.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{new Date(blog.created_at).toLocaleDateString()} · {blog.views} views</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${blog.published ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                    <Link href={`/admin/blogs/edit/${blog.id}`} className="text-xs text-brand-600 hover:underline">Edit</Link>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
}
