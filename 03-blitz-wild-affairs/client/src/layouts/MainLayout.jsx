// src/layouts/MainLayout.jsx
// Removed "use client" — invalid in Pages Router.
// Navbar and Footer are rendered here; _app.js wraps this around all non-admin pages.
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
