import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, Clock, MessageSquare } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { sendContactForm } from "../api/contactApi.js";

const contactInfo = [
  { icon: Mail,    label: 'Email',    value: 'faizanzahid166@gmail.com',  }, //href: 'mailto:hello@blitztechhub.com'
  { icon: Phone,   label: 'Phone',    value: '+92 3495526117',       }, //href: 'tel:+923495526117' 
  { icon: MapPin,  label: 'Location', value: 'Islamabad, Pakistan',    href: '#' },
  { icon: Clock,   label: 'Hours',    value: 'Mon–Sat, 9 AM – 7 PM',  href: '#' },
];

export default function Contact() {
   const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // ✅ success/error messages
  const [loading, setLoading] = useState(false); // ✅ show loading while sending

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus(null);
      setLoading(true);
  
      try {
        const res = await sendContactForm(formData);
  
        if (res.success) {
          setStatus({ type: "success", msg: res.msg || "✅ Message sent successfully 🚀" });
          setFormData({ name: "", email: "", message: "" });
        } else {
          setStatus({ type: "error", msg: res.msg || "❌ Failed to send message" });
        }
      } catch (err) {
        setStatus({ type: "error", msg: "❌ Server error. Please try again later." });
        console.error("Contact form error (frontend):", err);
      } finally {
        setLoading(false);
      }
    };
  
    const handleReset = () => {
      setFormData({ name: "", email: "", message: "" });
      setStatus(null);
    };

  return (
    <PageWrapper>
      {/* Page header */}
      <section className="pt-32 pb-20 relative grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase
                       bg-primary/10 text-primary border border-primary/20 mb-5"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-6"
          >
            Let's <span className="gradient-text">Start a Project</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Have an idea? Need a quote? Just want to say hi? We'd love to hear from you.
            We typically respond within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">

          {/* ── Contact form (3 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageSquare size={18} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-xl">Send us a message</h2>
                  <p className="text-gray-500 text-sm">We'll get back to you ASAP</p>
                </div>
              </div>

              {/* Success state */}
              {status?.type === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-6 text-center"
                >
                  <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold text-lg mb-1">Message sent!</h3>
                  <p className="text-gray-400 text-sm">
                    Thanks for reaching out. We'll be in touch within 24 hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-4 text-sm text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}

              {/* Error state */}
              {status?.type === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-5 flex items-start gap-3"
                >
                  <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{status.msg}</p>
                </motion.div>
              )}

              {/* Form */}
              {status?.type !== 'success' && (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full bg-[#0A0A0F] border border-[#1E1E3A] rounded-xl px-4 py-3 text-white placeholder-gray-600
                                 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full bg-[#0A0A0F] border border-[#1E1E3A] rounded-xl px-4 py-3 text-white placeholder-gray-600
                                 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, budget, and timeline…"
                      required
                      rows={6}
                      className="w-full bg-[#0A0A0F] border border-[#1E1E3A] rounded-xl px-4 py-3 text-white placeholder-gray-600
                                 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm
                                 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary flex-1 justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message <Send size={16} />
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      disabled={loading}
                      className="px-8 py-4 rounded-xl border border-[#1E1E3A] text-gray-400 hover:border-primary/40 hover:text-white transition-all text-base disabled:opacity-50"
                    >
                      Reset
                    </button>
                  </div>

                  <p className="text-gray-600 text-xs text-center">
                    By submitting, you agree to our privacy policy. We never share your data.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* ── Contact info (2 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Info cards */}
            <div className="glass-card p-6">
              <h3 className="text-white font-bold text-lg mb-5">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0
                                    group-hover:bg-primary/20 transition-colors">
                      <Icon size={15} className="text-primary" />
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs uppercase tracking-wide">{label}</span>
                      <p className="text-gray-300 text-sm group-hover:text-white transition-colors">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Map embed */}
            <div className="glass-card overflow-hidden rounded-2xl flex-1 min-h-[220px]">
              <iframe
                title="Blitz Tech Hub location — Islamabad, Pakistan"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106050.34490379434!2d72.82399834999999!3d33.6844202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6789ef3976c6e8c7!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[220px]"
              />
            </div>

            {/* Quick response badge */}
            <div className="glass-card p-4 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shrink-0" />
              <p className="text-gray-400 text-sm">
                <span className="text-white font-medium">Average response time:</span> under 2 hours during business hours
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
