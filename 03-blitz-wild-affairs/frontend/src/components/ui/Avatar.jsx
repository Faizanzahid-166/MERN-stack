// src/components/ui/Avatar.jsx
// Displays a user's avatar image or their initials as a fallback.
import { initials } from '../../utils/helpers.js';

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-14 h-14 text-xl',
  xl: 'w-20 h-20 text-2xl',
};

export default function Avatar({ src, name, size = 'md', className = '' }) {
  const sizeClass = sizes[size] || sizes.md;

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'User'}
        className={`${sizeClass} rounded-full object-cover flex-shrink-0 ring-2 ring-white dark:ring-gray-900 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-full bg-gradient-to-br from-brand-500 to-purple-500
        flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}
    >
      {initials(name)}
    </div>
  );
}
