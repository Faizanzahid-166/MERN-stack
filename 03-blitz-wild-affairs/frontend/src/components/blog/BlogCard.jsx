// src/components/blog/BlogCard.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BlogCard({ blog, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700 shadow-sm hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-brand-100 to-purple-100 dark:from-brand-900/30 dark:to-purple-900/30">
        {blog.cover_image ? (
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-20 font-display font-bold text-brand-600">
            B
          </div>
        )}
        {blog.category && (
          <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-brand-600 text-xs font-semibold px-3 py-1 rounded-full">
            {blog.category}
          </span>
        )}
        {blog.featured && (
          <span className="absolute top-3 right-3 bg-amber-400 text-white text-xs font-semibold px-3 py-1 rounded-full">
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="font-display font-semibold text-lg leading-snug mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
          <Link to={`/blogs/${blog.slug}`}>{blog.title}</Link>
        </h2>
        {blog.excerpt && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{blog.excerpt}</p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            {blog.author?.avatar ? (
              <img src={blog.author.avatar} alt={blog.author.name} className="w-6 h-6 rounded-full object-cover" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">
                {blog.author?.name?.[0]?.toUpperCase()}
              </div>
            )}
            <span>{blog.author?.name || 'Author'}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{blog.views ?? 0} views</span>
            <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// Skeleton loader for BlogCard
export function BlogCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
      <div className="h-52 skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-5 skeleton rounded-lg w-3/4" />
        <div className="h-4 skeleton rounded-lg w-full" />
        <div className="h-4 skeleton rounded-lg w-2/3" />
        <div className="flex justify-between">
          <div className="h-3 skeleton rounded-lg w-24" />
          <div className="h-3 skeleton rounded-lg w-16" />
        </div>
      </div>
    </div>
  );
}
