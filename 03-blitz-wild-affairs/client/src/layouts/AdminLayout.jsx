// src/layouts/AdminLayout.jsx
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Avatar from '@/components/ui/Avatar';
import toast from 'react-hot-toast';

const NAV_LINKS = [
  { to: '/admin',            label: 'Dashboard',   icon: '📊', end: true },
  { to: '/admin/blogs',      label: 'All Posts',   icon: '📝' },
  { to: '/admin/blogs/new',  label: 'New Post',    icon: '✏️' },
  { to: '/admin/users',      label: 'Users',       icon: '👥' },
  { to: '/',                 label: '← Public Site', icon: '🌐' },
];

function SidebarContent({ user, onLogout, onClose, router }) {
  const isActiveLink = (path, end) => {
    if (!path) return false;
    if (end) return router.pathname === path;
    return router.pathname === path || router.pathname.startsWith(path);
  };

  const linkClass = (path, end) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
      isActiveLink(path, end)
        ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
    }`;

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div>
          <span className="font-display font-bold text-xl text-brand-600">BlogForge</span>
          <span className="ml-2 text-[10px] bg-brand-100 dark:bg-brand-900/30 text-brand-600 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
            Admin
          </span>
        </div>
        {/* Close btn (mobile only) */}
        {onClose && (
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-gray-600">✕</button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
        {NAV_LINKS.map((link) => (
          <Link key={link.to} href={link.to} onClick={onClose} className={linkClass(link.to, link.end)}>
            <span className="text-base">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* User footer */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-3 px-1">
          <Avatar src={user?.avatar} name={user?.name} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-2 rounded-xl transition-colors font-medium"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const router = useRouter();
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out');
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 font-body overflow-hidden">

      {/* ── Desktop sidebar ── */}
      <AnimatePresence initial={false}>
        {desktopOpen && (
          <motion.aside
            key="desktop-sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="hidden md:flex flex-col flex-shrink-0 overflow-hidden
              bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800"
          >
            <SidebarContent user={user} onLogout={handleLogout} router={router} />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed left-0 top-0 bottom-0 w-64 z-50 md:hidden
                bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col"
            >
              <SidebarContent user={user} onLogout={handleLogout} onClose={() => setMobileOpen(false)} router={router} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="h-14 flex-shrink-0 flex items-center justify-between px-4 sm:px-6
          bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-gray-500 hover:text-brand-600 transition-colors text-lg"
            >
              ☰
            </button>
            {/* Toggle sidebar (desktop) */}
            <button
              onClick={() => setDesktopOpen((o) => !o)}
              className="hidden md:flex text-gray-500 hover:text-brand-600 transition-colors text-lg"
              title="Toggle sidebar"
            >
              ☰
            </button>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 hidden sm:block">
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="w-9 h-9 flex items-center justify-center rounded-full
                hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-base"
            >
              {dark ? '☀️' : '🌙'}
            </button>
            <Avatar src={user?.avatar} name={user?.name} size="sm" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
