// src/components/ui/Input.jsx
// Styled input / textarea with label and error support.
import { forwardRef } from 'react';

const baseClass =
  'w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-sm ' +
  'placeholder-gray-400 dark:placeholder-gray-600 ' +
  'focus:outline-none focus:ring-2 transition-colors duration-150';

const stateClass = (error) =>
  error
    ? 'border-red-400 dark:border-red-500 focus:ring-red-400'
    : 'border-gray-200 dark:border-gray-700 focus:ring-brand-500';

export const Input = forwardRef(({ label, error, hint, className = '', ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
    )}
    <input
      ref={ref}
      className={[baseClass, stateClass(error), className].join(' ')}
      {...props}
    />
    {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
));

Input.displayName = 'Input';

export const Textarea = forwardRef(
  ({ label, error, hint, rows = 4, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={[baseClass, stateClass(error), 'resize-y', className].join(' ')}
        {...props}
      />
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
);

Textarea.displayName = 'Textarea';

export const Select = forwardRef(
  ({ label, error, options = [], className = '', ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={[baseClass, stateClass(error), className].join(' ')}
        {...props}
      >
        {options.map(({ value, label: optLabel }) => (
          <option key={value} value={value}>
            {optLabel}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
);

Select.displayName = 'Select';

export default Input;
