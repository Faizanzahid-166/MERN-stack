import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Eye, Heart, ArrowRight, Code2, Megaphone, BrainCircuit, Brush } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import SectionHeading from '../components/SectionHeading';

const values = [
  { icon: Target, title: 'Mission',   desc: 'To empower businesses of every size with premium digital solutions that drive real, measurable growth.' },
  { icon: Eye,    title: 'Vision',    desc: 'A world where every entrepreneur has access to enterprise-grade technology and creative expertise.' },
  { icon: Heart,  title: 'Values',    desc: 'Transparency, quality-first, continuous learning, and genuine partnership with every client we serve.' },
];

const teamRoles = [
  { icon: Code2,        role: 'Developers',   desc: 'Full-stack engineers specialising in MERN, Next.js, and cloud infrastructure.',   color: 'from-primary to-accent' },
  { icon: Brush,        role: 'Designers',    desc: 'Creative UI/UX designers who blend aesthetics with intuitive user experiences.',   color: 'from-pink-500 to-rose-500' },
  { icon: BrainCircuit, role: 'AI Engineers', desc: 'Machine learning and LLM experts building intelligent automation pipelines.',      color: 'from-purple-500 to-indigo-500' },
  { icon: Megaphone,    role: 'Marketers',    desc: 'Data-driven strategists growing brand awareness, leads, and online revenue.',      color: 'from-orange-500 to-amber-400' },
];

const whyUs = [
  'End-to-end digital services under one roof',
  'Dedicated project manager for every client',
  'Transparent pricing — no hidden fees',
  'Agile methodology with weekly check-ins',
  'Post-launch support and maintenance',
  'NDA and IP ownership guaranteed',
];

export default function About() {
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
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-6"
          >
            We're <span className="gradient-text">Blitz Tech Hub</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl leading-relaxed"
          >
            A passionate team of developers, designers, AI engineers, and marketers united by one
            goal: to help businesses thrive in the digital age.
          </motion.p>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="glass-card p-7 text-center hover:border-primary/30 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <Icon size={24} className="text-primary" />
              </div>
              <h3 className="text-white text-xl font-bold mb-3">{title}</h3>
              <p className="text-gray-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story section */}
      <section className="py-20 bg-[#111127]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase
                               bg-accent/10 text-accent border border-accent/20 mb-5">
                Our Story
              </span>
              <h2 className="text-4xl font-bold text-white mb-6">
                Born from a passion for <span className="gradient-text">building great things</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Blitz Tech Hub was founded in 2023 with a clear mission: to bridge the gap between
                  cutting-edge technology and businesses that need it most. We started small — a handful
                  of engineers and a designer in a co-working space in Islamabad.
                </p>
                <p>
                  Today, we're a full-service digital agency with expertise spanning web development,
                  AI automation, mobile apps, design, and performance marketing. Every project we take
                  on is driven by the same founding principle: deliver exceptional quality, on time,
                  every time.
                </p>
                <p>
                  We've helped startups launch MVPs in weeks, helped enterprises modernise legacy
                  systems, and helped local businesses dominate their local SEO markets. The variety
                  keeps us sharp; the results keep us motivated.
                </p>
              </div>
            </motion.div>

            {/* Why choose us checklist */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8"
            >
              <h3 className="text-white text-2xl font-bold mb-6">Why choose Blitz Tech Hub?</h3>
              <ul className="space-y-4">
                {whyUs.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    </span>
                    <span className="text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team / Skills */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Team"
          title={<>The <span className="gradient-text">experts</span> behind every project</>}
          subtitle="A multidisciplinary team that covers every aspect of your digital journey."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamRoles.map(({ icon: Icon, role, desc, color }, i) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card p-6 text-center group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} p-0.5 mx-auto mb-5`}>
                <div className="w-full h-full rounded-2xl bg-[#0A0A0F] flex items-center justify-center">
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">{role}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Let's build something <span className="gradient-text">together</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Whether you need a website, an AI solution, or a full digital strategy — we're ready.
          </p>
          <Link to="/contact" className="btn-primary px-8 py-4 text-base">
            Start a Conversation <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
