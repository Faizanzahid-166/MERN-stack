// src/components/PageWrapper.jsx
// ✅ No changes needed — pure framer-motion wrapper with no router/env deps.
// Used by every page for fade + slide-up entrance animation.

import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -10 },
};

/**
 * Wraps every page with a fade + slide-up entrance animation.
 * AnimatePresence in _app.js drives the exit animation between routes.
 */
export default function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
