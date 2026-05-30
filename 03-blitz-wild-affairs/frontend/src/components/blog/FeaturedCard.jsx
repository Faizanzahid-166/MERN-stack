// src/components/blog/FeaturedCard.jsx
// Large hero-style card for the #1 featured post on the home page.
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { readingTime, timeAgo } from '../../utils/helpers.js';
import Avatar from '../ui/Avatar.jsx';

export default function FeaturedCard({ blog }) {
  if (!blog) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-3xl overflow-hidden bg-gray-900 min-h-[420px] flex flex-col justify-end
        shadow-2xl hover:shadow-brand-500/10 transition-shadow duration-300"
    >
      {/* Background image */}
      {blog.cover_image ? (
        <img
          src={blog.cover_image}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60
            group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-purple-900" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

      {/* Content */}
      <div className="relative p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {blog.category && (
            <span className="bg-brand-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {blog.category}
            </span>
          )}
          <span className="text-gray-300 text-xs">⭐ Featured</span>
          <span className="text-gray-400 text-xs ml-auto">{readingTime(blog.content)}</span>
        </div>

        <Link to={`/blogs/${blog.slug}`}>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight mb-3
            group-hover:text-brand-300 transition-colors line-clamp-3">
            {blog.title}
          </h2>
        </Link>

        {blog.excerpt && (
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-5">
            {blog.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar src={blog.author?.avatar} name={blog.author?.name} size="sm" />
            <div>
              <p className="text-white text-xs font-medium">{blog.author?.name}</p>
              <p className="text-gray-400 text-xs">{timeAgo(blog.created_at)}</p>
            </div>
          </div>
          <Link
            to={`/blogs/${blog.slug}`}
            className="text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1"
          >
            Read article →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
