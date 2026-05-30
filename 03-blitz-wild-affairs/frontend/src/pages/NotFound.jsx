// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <p className="text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-brand-400 to-purple-500 mb-4">
          404
        </p>
        <h1 className="font-display font-bold text-3xl mb-3">Page not found</h1>
        <p className="text-gray-500 mb-8">Looks like this page wandered off into the void.</p>
        <Link to="/" className="btn-brand">← Back to Home</Link>
      </motion.div>
    </div>
  );
}
