// src/components/ui/Button.jsx
// Polymorphic button with brand / ghost / danger / outline variants.
import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
  brand:
    'bg-brand-600 hover:bg-brand-700 text-white shadow-md hover:shadow-brand-500/25 focus:ring-brand-500',
  ghost:
    'border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-gray-400',
  danger:
    'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-red-500/25 focus:ring-red-400',
  outline:
    'border-2 border-brand-500 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 focus:ring-brand-500',
  link:
    'text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline p-0 h-auto',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3 text-base rounded-xl',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'brand',
      size = 'md',
      loading = false,
      disabled = false,
      fullWidth = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: isDisabled ? 1 : 0.96 }}
        disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          variant !== 'link' ? sizes[size] : '',
          fullWidth ? 'w-full' : '',
          className,
        ].join(' ')}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
