import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import SectionHeading from '../components/SectionHeading';


// Department colour mapping
const deptColors = {
  Engineering:       'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Design:            'bg-pink-500/10 text-pink-400 border-pink-500/20',
  Marketing:         'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'AI & Automation': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Operations:        'bg-green-500/10 text-green-400 border-green-500/20',
  Sales:             'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
};

const perks = [
  { emoji: '🌍', title: '100% Remote',       desc: 'Work from anywhere in the world.' },
  { emoji: '📈', title: 'Growth-first',       desc: 'Learning budgets and mentorship programs.' },
  { emoji: '💰', title: 'Competitive Pay',    desc: 'Above-market salaries and bonuses.' },
  { emoji: '🕒', title: 'Flexible Hours',     desc: 'Async-friendly, outcomes over hours.' },
  { emoji: '🤝', title: 'Inclusive Culture',  desc: 'Diversity and belonging at our core.' },
  { emoji: '⚡', title: 'Cutting-edge Stack', desc: 'Work with the latest tools and tech.' },
];

export default function Career() {
  const [jobs,    setJobs]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/jobs`);
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

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
            We're Hiring
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-6"
          >
            Join Our <span className="gradient-text">Dream Team</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto"
          >
            We're looking for talented, passionate individuals who want to shape the future of
            digital technology. Remote-first, growth-focused, ambition-driven.
          </motion.p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Life at Blitz"
          title={<>Why you'll love <span className="gradient-text">working here</span></>}
          subtitle="We invest in our people because great products are built by happy, empowered teams."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {perks.map(({ emoji, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5 text-center hover:border-primary/30 transition-colors"
            >
              <span className="text-3xl mb-3 block">{emoji}</span>
              <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Open Roles"
          title={<>Current <span className="gradient-text">Openings</span></>}
          subtitle="Find the role that matches your skills and ambitions."
        />

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-20 text-gray-400">
            <Loader2 size={22} className="animate-spin text-primary" />
            <span>Loading open positions…</span>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="glass-card p-8 text-center">
            {/* <AlertCircle size={36} className="text-red-400 mx-auto mb-3" /> */}
            <p className="text-gray-400 mb-2">send your CV speculatively at 
              <a href="mailto:faizanzahid150@gmail.com" className="text-primary hover:underline"> faizanzahid150@gmail.com</a>
            </p>
            {/* <p className="text-gray-500 text-sm">{error}</p> */}
            {/* <p className="text-gray-500 text-sm mt-2">
              Make sure the backend is running and MongoDB is connected,{' '}
              then seed jobs via <code className="text-primary">POST /api/jobs/seed</code>.
            </p> */}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && jobs.length === 0 && (
          <div className="glass-card p-12 text-center">
            <Briefcase size={40} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-xl mb-2">No open positions right now</h3>
            <p className="text-gray-400">Check back soon, or send us your CV speculatively.</p>
          </div>
        )}

        {/* Job cards */}
        {!loading && !error && jobs.length > 0 && (
          <div className="space-y-5">
            {jobs.map((job, i) => (
              <JobCard key={job._id} job={job} index={i} deptColors={deptColors} />
            ))}
          </div>
        )}
      </section>

      {/* Speculative CTA */}
      <section className="pb-24 max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-accent/8 rounded-2xl" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-3">
              Don't see your role? <span className="gradient-text">Apply anyway.</span>
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              We're always on the lookout for exceptional talent. Send us your portfolio and CV.
            </p>
            <a href="mailto:careers@blitztechhub.com" className="btn-primary">
              Send Speculative Application <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}

// ─── Individual job card ───────────────────────────────────────────────────────
function JobCard({ job, index, deptColors }) {
  const [expanded, setExpanded] = useState(false);
  const colorClass = deptColors[job.department] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="glass-card p-6 hover:border-primary/30 transition-all duration-300"
    >
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${colorClass}`}>
              {job.department}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {job.type}
            </span>
          </div>
          <h3 className="text-white font-bold text-xl mb-2">{job.title}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-primary" /> {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-primary" /> {job.type}
            </span>
          </div>
        </div>

        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-4 py-2 rounded-xl border border-[#1E1E3A] text-gray-400
                       hover:border-primary/40 hover:text-white transition-all text-sm"
          >
            {expanded ? 'Hide details' : 'View details'}
          </button>
          <a
            href={`mailto:careers@blitztechhub.com?subject=Application for ${job.title}`}
            className="btn-primary text-sm py-2 px-4"
          >
            Apply <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Expandable details */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-5 pt-5 border-t border-[#1E1E3A]"
        >
          <p className="text-gray-300 leading-relaxed mb-5">{job.description}</p>
          {job.requirements && job.requirements.length > 0 && (
            <>
              <h4 className="text-white font-semibold mb-3">Requirements</h4>
              <ul className="space-y-2">
                {job.requirements.map((req, ri) => (
                  <li key={ri} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
