// src/components/blog/RelatedPosts.jsx
// Fetches and displays blogs from the same category (excluding the current one).
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { blogAPI } from '@/api/APIs';
import { timeAgo } from '@/utils/helpers';
import Avatar from '@/components/ui/Avatar';

export default function RelatedPosts({ category, excludeSlug }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!category) return;
    blogAPI
      .getAll({ category, limit: 3 })
      .then(({ data }) => {
        setPosts(data.blogs.filter((b) => b.slug !== excludeSlug).slice(0, 3));
      })
      .catch(() => {});
  }, [category, excludeSlug]);

  if (!posts.length) return null;

  return (
    <aside className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-10">
      <h3 className="font-display font-bold text-2xl mb-6">Related Articles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.slug}`}
            className="group flex flex-col gap-3 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
          >
            {post.cover_image ? (
              <img
                src={post.cover_image}
                alt={post.title}
                className="h-36 w-full object-cover rounded-xl"
              />
            ) : (
              <div className="h-36 w-full rounded-xl bg-gradient-to-br from-brand-100 to-purple-100 dark:from-brand-900/20 dark:to-purple-900/20" />
            )}
            <p className="text-sm font-semibold group-hover:text-brand-600 transition-colors line-clamp-2 font-display">
              {post.title}
            </p>
            <div className="flex items-center gap-2 mt-auto">
              <Avatar src={post.author?.avatar} name={post.author?.name} size="xs" />
              <span className="text-xs text-gray-400">{timeAgo(post.created_at)}</span>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
