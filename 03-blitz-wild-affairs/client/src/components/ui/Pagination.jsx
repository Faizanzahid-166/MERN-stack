// src/components/ui/Pagination.jsx
// Generic pagination bar used on blog listing pages.
import { motion } from 'framer-motion';

export default function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  // Show a window of pages around the current page
  const window = 2;
  const visible = pages.filter(
    (p) => p === 1 || p === total || (p >= current - window && p <= current + window)
  );

  // Insert ellipsis markers
  const withEllipsis = [];
  let prev = null;
  for (const p of visible) {
    if (prev && p - prev > 1) withEllipsis.push('…');
    withEllipsis.push(p);
    prev = p;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
      {/* Prev */}
      <NavBtn disabled={current === 1} onClick={() => onChange(current - 1)}>
        ←
      </NavBtn>

      {withEllipsis.map((item, idx) =>
        item === '…' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
            …
          </span>
        ) : (
          <motion.button
            key={item}
            whileTap={{ scale: 0.92 }}
            onClick={() => onChange(item)}
            className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
              item === current
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600'
            }`}
          >
            {item}
          </motion.button>
        )
      )}

      {/* Next */}
      <NavBtn disabled={current === total} onClick={() => onChange(current + 1)}>
        →
      </NavBtn>
    </div>
  );
}

function NavBtn({ children, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-10 h-10 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800
        hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 transition-all
        disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
