// src/hooks/useReadingProgress.js
// Returns a 0-100 reading progress percentage based on scroll position.
import { useState, useEffect } from 'react';

export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrollable = scrollHeight - clientHeight;
      if (scrollable > 0) {
        setProgress(Math.min(100, Math.round((scrollTop / scrollable) * 100)));
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return progress;
}

export default useReadingProgress;
