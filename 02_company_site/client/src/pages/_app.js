// src/pages/_app.js
// ✅ REPLACES src/App.jsx + src/main.jsx entirely.
// ✅ Wraps every page with <Navbar>, <Footer>, and framer-motion page transitions.
// ✅ Imports global CSS here (Next.js only allows global CSS in _app).
// ✅ AnimatePresence uses router.pathname as the key for exit animations.
// ✅ No BrowserRouter, no react-router-dom — Next.js handles routing.

import { AnimatePresence } from 'framer-motion';
import { useRouter }        from 'next/router';
import Navbar               from '@/components/Navbar';
import Footer               from '@/components/Footer';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          {/*
            AnimatePresence needs a key that changes on navigation.
            router.pathname is the stable key (excludes query params).
          */}
          <AnimatePresence mode="wait" initial={false}>
            <Component key={router.pathname} {...pageProps} />
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </>
  );
}
