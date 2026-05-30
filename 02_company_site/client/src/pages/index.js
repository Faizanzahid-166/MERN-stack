// src/pages/index.js
// ✅ RENAMED from src/pages/Home.jsx  →  src/pages/index.js  (serves the "/" route)
// ✅ import Link from 'next/link'  (was react-router-dom)
// ✅ All @/ aliases resolve via jsconfig.json
// ✅ Added Next.js <Head> for per-page SEO meta tags

import Head                                           from 'next/head';
import Link                                           from 'next/link';
import { motion }                                     from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Shield, Clock, Users } from 'lucide-react';
import PageWrapper   from '@/components/PageWrapper';
import SectionHeading from '@/components/SectionHeading';
import ServiceCard   from '@/components/ServiceCard';
import services      from '@/data/services';

// Show only top 6 services on home page
const featuredServices = services.slice(0, 6);

const strengths = [
  { icon: Zap,    title: 'Lightning Fast',     desc: 'We deliver projects at warp speed without cutting corners.' },
  { icon: Shield, title: 'Enterprise Quality', desc: 'Production-grade code reviewed by senior engineers.' },
  { icon: Clock,  title: 'On-Time Delivery',   desc: '98% of our projects ship on or before the deadline.' },
  { icon: Users,  title: 'Dedicated Team',     desc: 'A full-stack team assigned exclusively to your project.' },
];

const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '50+',  label: 'Happy Clients' },
  { value: '10+',  label: 'Services Offered' },
  { value: '98%',  label: 'Client Satisfaction' },
];

function HeroOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon/5 rounded-full blur-2xl animate-pulse [animation-delay:2s]" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Blitz Tech Hub — Innovate. Build. Scale.</title>
        <meta
          name="description"
          content="Premium digital agency offering web development, AI automation, digital marketing, SEO, and app development services."
        />
      </Head>

      <PageWrapper>
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center grid-bg pt-16">
          <HeroOrbs />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                         bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Premium Digital Agency · Est. 2023
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="gradient-text">Innovate.</span>{' '}
              <span className="text-white">Build.</span>{' '}
              <span className="gradient-text">Scale.</span>
            </motion.h1>

            {/* Sub-heading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Your one-stop solution for{' '}
              <span className="text-white font-medium">digital transformation</span>. We build
              modern web apps, automate with AI, and grow your brand online.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contact" className="btn-primary text-base px-8 py-4">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="btn-outline text-base px-8 py-4">
                Explore Services
              </Link>
            </motion.div>

            {/* Trust chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mt-14 text-sm text-gray-500"
            >
              {['No-risk free consultation', '24/7 support', 'Agile delivery', 'NDA-ready'].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-accent" /> {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0A0A0F] to-transparent" />
        </section>

        {/* ── Stats bar ──────────────────────────────────────────────────────── */}
        <section className="py-12 border-y border-[#1E1E3A] bg-[#111127]/40">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold gradient-text mb-1">{value}</div>
                <div className="text-gray-400 text-sm">{label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Featured Services ──────────────────────────────────────────────── */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Do"
            title={<>Our <span className="gradient-text">Core Services</span></>}
            subtitle="From concept to deployment — we cover every layer of your digital stack with expert precision."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((svc, i) => (
              <ServiceCard key={svc.id} {...svc} delay={i * 0.08} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link href="/services" className="btn-outline">
              View All 10 Services <ArrowRight size={16} />
            </Link>
          </motion.div>
        </section>

        {/* ── Why Choose Us ──────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#111127]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left copy */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase
                                 bg-accent/10 text-accent border border-accent/20 mb-4">
                  Why Blitz
                </span>
                <h2 className="section-heading text-white mb-6">
                  Built for <span className="gradient-text">results</span>, obsessed with quality
                </h2>
                <p className="text-gray-400 leading-relaxed mb-8">
                  We don't just build products — we build competitive advantages. Every project is
                  treated as if it were our own business, with a relentless focus on performance,
                  scalability, and user experience.
                </p>
                <Link href="/about" className="btn-primary">
                  Learn About Us <ArrowRight size={16} />
                </Link>
              </motion.div>

              {/* Right grid */}
              <div className="grid sm:grid-cols-2 gap-5">
                {strengths.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="glass-card p-5 hover:border-primary/30 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{title}</h3>
                    <p className="text-gray-400 text-sm">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA banner ──────────────────────────────────────────────── */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative glass-card p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-2xl" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to build something{' '}
                <span className="gradient-text">extraordinary?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Let's turn your vision into a digital reality. Get a free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary text-base px-8 py-4">
                  Start Your Project <ArrowRight size={18} />
                </Link>
                <Link href="/career" className="btn-outline text-base px-8 py-4">
                  Join Our Team
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </PageWrapper>
    </>
  );
}
