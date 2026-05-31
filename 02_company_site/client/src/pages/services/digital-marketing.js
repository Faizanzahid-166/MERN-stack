import Link from 'next/link';
import SEO from '@/components/SEO';
import PageWrapper from '@/components/PageWrapper';

export default function DigitalMarketing() {
  const title = 'Digital Marketing — Blitz Tech Hub';
  const description = 'Full-service digital marketing: paid media, SEO, content strategy, and performance analytics for growth-minded businesses.';

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/services/digital-marketing`}
        image={`${process.env.NEXT_PUBLIC_SITE_URL}/og-marketing.png`}
        services={[{ title: 'Digital Marketing', description }]}
      />

      <PageWrapper>
        <section className="pt-32 pb-12 text-center">
          <h1 className="text-4xl font-bold text-white">Digital Marketing</h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{description} We combine growth experiments with measurable ROI and clear reporting.</p>
        </section>

        <section className="py-12 text-center">
          <Link href="/contact" className="btn-primary">Plan a campaign</Link>
        </section>
      </PageWrapper>
    </>
  );
}
