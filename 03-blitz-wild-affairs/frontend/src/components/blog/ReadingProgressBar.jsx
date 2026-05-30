// src/components/blog/ReadingProgressBar.jsx
// Thin brand-colored bar fixed at the top of the viewport showing scroll progress.
import { useReadingProgress } from '../../hooks/useReadingProgress.js';

export default function ReadingProgressBar() {
  const progress = useReadingProgress();

  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[9999] transition-all duration-100 ease-linear"
      style={{
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #c44df0, #a82dd4, #7c3aed)',
      }}
    />
  );
}
