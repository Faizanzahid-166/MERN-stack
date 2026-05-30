// src/components/SectionHeading.jsx
// ✅ No changes needed — pure presentational component, no router/env deps.

import { motion } from 'framer-motion';

/**
 * SectionHeading — consistent animated section titles.
 * Props:
 *   eyebrow  - small label above heading
 *   title    - main heading text (supports JSX e.g. <span className="gradient-text">)
 *   subtitle - muted description below heading
 *   center   - boolean, center-aligns text (default: true)
 */
export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-14 ${center ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase
                         bg-primary/10 text-primary border border-primary/20 mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="section-heading text-white mb-4">{title}</h2>
      {subtitle && (
        <p className={`text-gray-400 text-lg leading-relaxed ${center ? 'max-w-2xl mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
