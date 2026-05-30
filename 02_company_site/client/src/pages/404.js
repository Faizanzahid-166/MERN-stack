// src/pages/404.js
// ✅ NEW — Next.js uses this file automatically for all unmatched routes.
// ✅ import Link from 'next/link'

import Head   from 'next/head';
import Link   from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found | Blitz Tech Hub</title>
      </Head>

      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          {/* Glowing 404 */}
          <div className="text-[120px] font-black leading-none mb-4
                          bg-gradient-to-r from-primary via-accent to-neon bg-clip-text text-transparent
                          drop-shadow-[0_0_40px_rgba(108,99,255,0.4)]">
            404
          </div>

          <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary">
              <Home size={16} /> Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-outline"
            >
              <ArrowLeft size={16} /> Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
