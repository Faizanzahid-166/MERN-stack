import Link from 'next/link';
import Image from 'next/image';
import SEO from '@/components/SEO';
import PageWrapper from '@/components/PageWrapper';

export default function WebDevelopment() {
  const title = 'Web Development — Blitz Tech Hub';
  const description = 'Full-stack web development services: Next.js, MERN stack, and custom software development for businesses in Islamabad and worldwide.';

  const faq = [
    {
      question: 'What technologies do you use?',
      answer: 'We specialise in Next.js, React, Node, Express, MongoDB (MERN), and cloud platforms like Vercel and AWS.'
    },
    {
      question: 'Do you handle maintenance?',
      answer: 'Yes — we provide maintenance, monitoring, and growth services after launch.'
    }
  ];

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/services/web-development`}
        image={`${process.env.NEXT_PUBLIC_SITE_URL}/og-web-dev.png`}
        services={[{ title: 'Web Development', description }]}
      />

      <PageWrapper>
        <section className="pt-32 pb-12 text-center">
          <h1 className="text-4xl font-bold text-white">Web Development</h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{description}</p>
        </section>

        <section className="py-12 max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-white mb-4">Our approach</h2>
          <p className="text-gray-400 mb-6">We build fast, accessible, and SEO-friendly web applications using Next.js and proven engineering practices. Our focus includes Core Web Vitals optimisation, server-side rendering, and resilient APIs.</p>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-2">Services included</h3>
              <ul className="text-gray-400 list-disc pl-5">
                <li>Next.js website & app development</li>
                <li>Custom backend & APIs (Node/Express)</li>
                <li>MERN stack development</li>
                <li>Performance & SEO optimisation</li>
              </ul>
            </div>
            <div>
              <Image src="/services/web-dev-hero.jpg" alt="Web development" width={1200} height={700} priority />
            </div>
          </div>
        </section>

        <section className="py-12 max-w-4xl mx-auto px-4">
          <h3 className="text-xl font-semibold text-white mb-4">Frequently asked</h3>
          <div className="space-y-4">
            {faq.map((f) => (
              <div key={f.question} className="glass-card p-4">
                <strong className="text-white">{f.question}</strong>
                <p className="text-gray-400 mt-2">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 text-center">
          <Link href="/contact" className="btn-primary">Get a quote</Link>
        </section>
      </PageWrapper>
    </>
  );
}
