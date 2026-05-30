// src/context/ThemeContext.jsx
// Removed "use client" — that directive only exists in App Router (Next.js 13+).
// Pages Router components are always client-rendered; no directive needed.
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // Start false (light) to match the SSR HTML; useEffect corrects it client-side.
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('theme');
      if (saved) { setDark(saved === 'dark'); return; }
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      setDark(!!prefersDark);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* ignore */ }
  }, [dark]);

  const toggle = () => setDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
