// src/pages/blogs/[slug].js
// ↳ Route: /blogs/:slug
// Was: src/pages/BlogDetail.jsx — moved + renamed. slug now comes from router.query.slug.
// Removed "use client" (not valid in Pages Router).
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import toast from 'react-hot-toast';
import { blogAPI } from '@/api/APIs';
import { useAuth } from '@/context/AuthContext';
import { readingTime, timeAgo, formatCount } from '@/utils/helpers';

import ReadingProgressBar from '@/components/blog/ReadingProgressBar';
import CommentsSection from '@/components/blog/CommentsSection';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ShareButtons from '@/components/blog/ShareButtons';
import Avatar from '@/components/ui/Avatar';
import { Tag } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/Spinner';

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query;   // Next.js dynamic segment
  const { user } = useAuth();

  const [blog, setBlog]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [liked, setLiked]         = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!slug) return;
    window.scrollTo(0, 0);
    setLoading(true);
    blogAPI
      .getBySlug(slug)
      .then(({ data }) => {
        setBlog(data.blog);
        setLikeCount(data.blog.likes ?? 0);
      })
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleLike = async () => {
    if (!user) return toast.error('Please log in to like posts');
    const { data } = await blogAPI.like(blog.id);
    setLiked(data.liked);
    setLikeCount((n) => (data.liked ? n + 1 : Math.max(0, n - 1)));
  };

  const handleBookmark = async () => {
    if (!user) return toast.error('Please log in to bookmark posts');
    const { data } = await blogAPI.bookmark(blog.id);
    setBookmarked(data.bookmarked);
    toast.success(data.bookmarked ? '🔖 Saved!' : 'Bookmark removed');
  };

  if (loading) return <PageLoader message="Loading article…" />;

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <p className="text-6xl mb-4">🔍</p>
        <h2 className="font-display font-bold text-2xl mb-3">Article not found</h2>
        <Link href="/blogs" className="btn-brand mt-4 inline-block">Browse all articles</Link>
      </div>
    </div>
  );

  return (
    <>
      <ReadingProgressBar />
      <article className="pt-16">
        {blog.cover_image && (
          <div className="relative h-[55vh] overflow-hidden">
            <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-gray-950/80 via-transparent to-transparent" />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 mb-5 text-sm text-gray-500">
            {blog.category && (
              <Link href={`/blogs?category=${blog.category}`}
                className="bg-brand-100 dark:bg-brand-900/30 text-brand-600 text-xs font-semibold px-3 py-1 rounded-full hover:bg-brand-200 transition-colors">
                {blog.category}
              </Link>
            )}
            {blog.featured && (
              <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 text-xs font-semibold px-3 py-1 rounded-full">⭐ Featured</span>
            )}
            <span className="ml-auto text-xs">{readingTime(blog.content)}</span>
            <span className="text-xs">· {formatCount(blog.views)} views</span>
            <span className="text-xs">· {timeAgo(blog.created_at)}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-4xl sm:text-5xl leading-tight text-gray-900 dark:text-white mb-6"
          >
            {blog.title}
          </motion.h1>

          {/* Author + actions */}
          <div className="flex items-center flex-wrap gap-4 mb-10 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Avatar src={blog.author?.avatar} name={blog.author?.name} size="md" />
              <div>
                <p className="font-semibold text-sm">{blog.author?.name || 'Anonymous'}</p>
                <p className="text-xs text-gray-400">Author</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-medium transition-all ${
                  liked
                    ? 'border-red-300 bg-red-50 dark:bg-red-900/20 text-red-500'
                    : 'border-gray-200 dark:border-gray-700 hover:text-red-500'
                }`}
              >
                {liked ? '❤️' : '🤍'} {formatCount(likeCount)}
              </button>
              <button
                onClick={handleBookmark}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-medium transition-all ${
                  bookmarked
                    ? 'border-brand-300 bg-brand-50 dark:bg-brand-900/20 text-brand-600'
                    : 'border-gray-200 dark:border-gray-700 hover:text-brand-600'
                }`}
              >
                {bookmarked ? '🔖' : '📑'} Save
              </button>
            </div>
          </div>

          {/* Content */}
          <div
            className="
              prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-display prose-headings:font-bold
              prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
              prose-code:bg-gray-100 dark:prose-code:bg-gray-800
              prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
              prose-pre:rounded-xl
              prose-img:rounded-xl
              prose-blockquote:border-brand-500

              [&_.video-embed]:my-10
              [&_.video-embed]:overflow-hidden
              [&_.video-embed]:rounded-xl
              [&_.video-embed]:border
              [&_.video-embed]:border-gray-300
              dark:[&_.video-embed]:border-gray-700

              [&_.video-embed_iframe]:w-full
              [&_.video-embed_iframe]:min-h-[420px]
              [&_.video-embed_iframe]:block
            "
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{blog.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10">
              {blog.tags.map((tag) => (
                <Link key={tag} href={`/blogs?search=${tag}`}><Tag>{tag}</Tag></Link>
              ))}
            </div>
          )}

          {/* Media attachments */}
          {blog.blog_media?.length > 0 && (
            <div className="mt-12">
              <h3 className="font-display font-bold text-xl mb-5">Media Attachments</h3>
              <div className="space-y-5">
                {blog.blog_media.map((m) => (
                  <div key={m.id}>
                    {m.media_type === 'image' && (
                      <img src={m.media_url} alt="Attachment"
                        className="rounded-2xl max-w-xl w-auto max-h-[600px] mx-auto shadow-md block object-contain bg-gray-50 dark:bg-gray-900/50"
                        loading="lazy" />
                    )}
                    {m.media_type === 'video' && (
                      <video controls className="max-w-xl w-full max-h-[600px] mx-auto rounded-2xl shadow-md bg-black block" preload="metadata">
                        <source src={m.media_url} type="video/mp4" />
                      </video>
                    )}
                    {m.media_type === 'pdf' && (
                      <a href={m.media_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-brand-400 transition-colors group">
                        <span className="text-4xl">📄</span>
                        <div>
                          <p className="font-semibold text-sm group-hover:text-brand-600 transition-colors">View PDF Document</p>
                          <p className="text-xs text-gray-400 mt-0.5">Opens in a new tab</p>
                        </div>
                        <span className="ml-auto text-brand-600 text-xl">↗</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
            <ShareButtons title={blog.title} />
          </div>

          <RelatedPosts category={blog.category} excludeSlug={slug} />
          <CommentsSection blogId={blog.id} />
        </div>
      </article>
    </>
  );
}
