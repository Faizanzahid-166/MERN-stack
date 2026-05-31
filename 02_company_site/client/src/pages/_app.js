// src/pages/_app.js
// ✅ REPLACES src/App.jsx + src/main.jsx entirely.
// ✅ Wraps every page with <Navbar>, <Footer>, and framer-motion page transitions.
// ✅ Imports global CSS here (Next.js only allows global CSS in _app).
// ✅ AnimatePresence uses router.pathname as the key for exit animations.
// ✅ No BrowserRouter, no react-router-dom — Next.js handles routing.

import Head                   from 'next/head';
import { AnimatePresence }    from 'framer-motion';
import { useRouter }          from 'next/router';
import Navbar                 from '@/components/Navbar';
import Footer                 from '@/components/Footer';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        {/* {<link rel="icon" href="/favicon.ico" />} */}
        <link rel="icon" type="image/png" href="/blitz-tech-logo.png" />
        {/* Technical SEO basics */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0A0A0F" />
        {/* Default social card — pages should override as needed */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@blitztechhub" />
      </Head>
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
