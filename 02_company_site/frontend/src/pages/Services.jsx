import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import SectionHeading from '../components/SectionHeading';
import services from '../data/services';

// Process card (used in "How We Work" section)
const steps = [
  { step: '01', title: 'Discovery',     desc: 'We dive deep into your goals, audience, and requirements to craft a tailored strategy.' },
  { step: '02', title: 'Design',        desc: 'Our designers create wireframes and high-fidelity prototypes for your approval.' },
  { step: '03', title: 'Development',   desc: 'Engineers build your solution using the best-fit technology stack.' },
  { step: '04', title: 'Delivery',      desc: 'We launch, test thoroughly, and provide post-launch support and optimisation.' },
];

export default function Services() {
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
            What We Offer
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-6"
          >
            Our <span className="gradient-text">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Ten specialised services, one unified team. Everything you need to build, grow,
            and scale your digital presence.
          </motion.p>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <FullServiceCard key={svc.id} {...svc} index={i} />
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-[#111127]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Process"
            title={<>How we <span className="gradient-text">deliver excellence</span></>}
            subtitle="A proven 4-step process that keeps projects on track and clients delighted."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line on desktop */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30" />

            {steps.map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass-card p-6 text-center relative"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-white font-bold text-sm">{step}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-accent/8 rounded-2xl" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Don't see what you need?{' '}
              <span className="gradient-text">Let's talk</span>
            </h2>
            <p className="text-gray-400 mb-8">
              We handle custom projects too. Drop us a message and we'll figure it out together.
            </p>
            <Link to="/contact" className="btn-primary px-8 py-4 text-base">
              Contact Us <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}

// ─── Full-detail service card (for the services page) ─────────────────────────
function FullServiceCard({ icon: Icon, title, description, gradient, tag, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="glass-card p-7 group relative overflow-hidden"
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0
                      group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Tag badge */}
      {tag && (
        <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-semibold
                         bg-accent/10 text-accent border border-accent/20">
          {tag}
        </span>
      )}

      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 mb-5
                       group-hover:shadow-[0_0_24px_rgba(108,99,255,0.35)] transition-shadow duration-300`}>
        <div className="w-full h-full rounded-2xl bg-[#0A0A0F] flex items-center justify-center">
          <Icon size={22} className="text-white" />
        </div>
      </div>

      <h3 className="text-white font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-200">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>

      <Link
        to="/contact"
        className="inline-flex items-center gap-1 mt-5 text-sm text-primary font-medium
                   opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0
                   transition-all duration-300"
      >
        Get a quote <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}
