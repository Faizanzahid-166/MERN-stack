// src/components/NewsletterSection.jsx
// Full-width newsletter signup section (reused on Home + Blogs pages).
import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return toast.error('Enter a valid email');
    // TODO: wire to your email service (Resend, Mailchimp, etc.)
    setSubmitted(true);
    toast.success('You\'re on the list! 🎉');
    setEmail('');
  };

  return (
    <section className="py-24 bg-gradient-to-r from-brand-600 to-purple-600 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/5 rounded-full" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-3xl mb-4 block">📬</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4">
            Stay in the loop
          </h2>
          <p className="text-brand-100 text-lg mb-10 max-w-md mx-auto">
            Get the best articles delivered straight to your inbox. No spam — unsubscribe anytime.
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/20 backdrop-blur rounded-2xl px-8 py-6 inline-block"
            >
              <p className="text-xl font-semibold">You're subscribed! 🎉</p>
              <p className="text-brand-100 text-sm mt-1">We'll be in touch soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/20 backdrop-blur
                  placeholder-brand-200 text-white border border-white/30
                  focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25 transition-all"
              />
              <button
                type="submit"
                className="bg-white text-black font-semibold px-7 py-3.5 rounded-xl
                  hover:bg-brand-50 active:scale-95 transition-all duration-150 whitespace-nowrap"
              >
                Subscribe →
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
