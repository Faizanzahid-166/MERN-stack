// src/components/blog/ShareButtons.jsx
// Social sharing buttons for a blog post.
import toast from 'react-hot-toast';
import { copyToClipboard } from '@/utils/helpers';

const SHARE_LINKS = [
  {
    label: 'Twitter / X',
    icon: '🐦',
    color: 'hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-500',
    href: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    label: 'LinkedIn',
    icon: '💼',
    color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600',
    href: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    label: 'Facebook',
    icon: '📘',
    color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700',
    href: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
];

export default function ShareButtons({ title }) {
  const url = window.location.href;

  const handleCopy = async () => {
    await copyToClipboard(url);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-1">Share:</span>
      {SHARE_LINKS.map((s) => (
        <a
          key={s.label}
          href={s.href(url, title)}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${s.label}`}
          className={`w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-lg transition-all ${s.color}`}
        >
          {s.icon}
        </a>
      ))}
      <button
        onClick={handleCopy}
        title="Copy link"
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
      >
        🔗
      </button>
    </div>
  );
}
