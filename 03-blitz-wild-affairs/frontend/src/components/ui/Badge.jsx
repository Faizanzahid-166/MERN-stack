// src/components/ui/Badge.jsx
// Small status / category badges and tag pills.

const COLORS = {
  brand:   'bg-brand-100 dark:bg-brand-900/30 text-brand-600',
  green:   'bg-green-100 dark:bg-green-900/30 text-green-600',
  red:     'bg-red-100 dark:bg-red-900/30 text-red-500',
  yellow:  'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600',
  gray:    'bg-gray-100 dark:bg-gray-800 text-gray-500',
  amber:   'bg-amber-100 dark:bg-amber-900/30 text-amber-600',
};

export function Badge({ children, color = 'brand', className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${COLORS[color] || COLORS.gray} ${className}`}
    >
      {children}
    </span>
  );
}

export function Tag({ children, onClick, className = '' }) {
  const base =
    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ' +
    'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 ' +
    'hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 transition-colors';

  return onClick ? (
    <button onClick={onClick} className={`${base} ${className}`}>
      #{children}
    </button>
  ) : (
    <span className={`${base} ${className}`}>#{children}</span>
  );
}

export default Badge;
