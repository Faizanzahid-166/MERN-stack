"use client"
// src/components/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Avatar from '@/components/ui/Avatar';
import toast from 'react-hot-toast';
import Link from "next/link";

const NAV_LINKS = [
  { to: '/',      label: 'Home',   end: true },
  { to: '/blogs', label: 'Blogs' },
];

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { dark, toggle } = useTheme();
  const router = useRouter();

  const isActiveLink = (path, end) => {
    if (!path) return false;
    if (end) return router.pathname === path;
    return router.pathname === path || router.pathname.startsWith(path);
  };

  const linkClass = (path, end) =>
    `text-sm font-medium transition-colors ${isActiveLink(path, end) ? 'text-brand-600' : 'text-gray-700 dark:text-gray-300 hover:text-brand-600'}`;

  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [dropOpen, setDropOpen]   = useState(false);
  const dropRef = useRef(null);

  // Scroll shadow
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const fn = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const handleLogout = async () => {
    setDropOpen(false);
    await logout();
    toast.success('See you soon! 👋');
    router.push('/');
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/85 dark:bg-gray-950/85 backdrop-blur-xl shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="font-display font-black text-2xl text-brand-600 hover:opacity-90 transition-opacity flex-shrink-0">
          Blitz Wild Affairs
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} href={link.to} className={linkClass(link.to, link.end)}>
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
              Admin
            </Link>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-full flex items-center justify-center text-base
              hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {/* Authenticated user dropdown */}
          {user ? (
            <div className="hidden md:block relative" ref={dropRef}>
              <button
                onClick={() => setDropOpen((o) => !o)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Avatar src={user.avatar} name={user.name} size="sm" />
                <span className="text-sm font-medium max-w-[100px] truncate">{user.name}</span>
                <span className="text-gray-400 text-xs">{dropOpen ? '▲' : '▼'}</span>
              </button>

              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 rounded-2xl
                      shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden py-1"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-semibold truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <DropItem to="/profile" icon="👤" label="My Profile" onClick={() => setDropOpen(false)} />
                    {isAdmin && <DropItem to="/admin" icon="⚙️" label="Admin Dashboard" onClick={() => setDropOpen(false)} />}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500
                        hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <span>🚪</span> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
              <div className="hidden md:flex items-center gap-2">
              <Link href="/login"    className="btn-ghost !py-1.5 !px-4 text-sm">Log in</Link>
              <Link href="/register" className="btn-brand !py-1.5 !px-4 text-sm">Sign up</Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center text-gray-700 dark:text-gray-300"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Open menu"
          >
            <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link key={link.to} href={link.to} onClick={() => setMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link href="/admin" onClick={() => setMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-xl text-sm font-medium text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20">
                  Admin
                </Link>
              )}
              {user ? (
                <>
                  <Link href="/profile" onClick={() => setMenuOpen(false)}
                    className="block py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                    My Profile
                  </Link>
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex gap-2 pt-2">
                  <Link href="/login"    onClick={() => setMenuOpen(false)} className="flex-1 btn-ghost text-sm text-center !py-2">Log in</Link>
                  <Link href="/register" onClick={() => setMenuOpen(false)} className="flex-1 btn-brand text-sm text-center !py-2">Sign up</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DropItem({ to, icon, label, onClick }) {
  return (
    <Link href={to} onClick={onClick}
      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300
        hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <span>{icon}</span> {label}
    </Link>
  );
}
