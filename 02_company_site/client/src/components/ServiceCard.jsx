// src/components/ServiceCard.jsx
// ✅ import Link from 'next/link'  (was react-router-dom)
// ✅ No other changes needed — pure presentational component

import { motion }       from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link             from 'next/link';

/**
 * ServiceCard — animated card for each service offering.
 * Props:
 *   icon        - Lucide icon component
 *   title       - service name
 *   description - short blurb
 *   gradient    - tailwind gradient classes for icon bg
 *   delay       - framer-motion stagger delay (number)
 */
export default function ServiceCard({
  icon: Icon,
  title,
  description,
  gradient = 'from-primary to-accent',
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="glass-card p-6 group cursor-pointer relative overflow-hidden"
    >
      {/* Hover glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0
                      group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

      {/* Neon top border on hover */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} p-0.5 mb-5
                       group-hover:shadow-[0_0_20px_rgba(108,99,255,0.35)] transition-shadow duration-300`}>
        <div className="w-full h-full rounded-xl bg-[#0A0A0F] flex items-center justify-center">
          <Icon size={20} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-200">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>

      {/* Arrow link — ✅ next/link href prop */}
      <Link
        href="/services"
        className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100
                   translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300"
      >
        Learn more <ArrowUpRight size={14} />
      </Link>
    </motion.div>
  );
}
