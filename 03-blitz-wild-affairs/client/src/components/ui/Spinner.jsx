// src/components/ui/Spinner.jsx
// Lightweight spinner + full-page loading overlay.

export function Spinner({ size = 'md', className = '' }) {
  const sizeMap = { sm: 'w-4 h-4 border-2', md: 'w-7 h-7 border-[3px]', lg: 'w-12 h-12 border-4' };
  return (
    <span
      className={`${sizeMap[size] || sizeMap.md} border-brand-500 border-t-transparent rounded-full animate-spin inline-block ${className}`}
    />
  );
}

export function PageLoader({ message = 'Loading…' }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-gray-400">
      <Spinner size="lg" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default Spinner;
