import Link from 'next/link';
import SEO from '@/components/SEO';
import PageWrapper from '@/components/PageWrapper';

export default function SEOService() {
  const title = 'SEO Services in Islamabad — Blitz Tech Hub';
  const description = 'Local and technical SEO services in Islamabad: on-page, off-page, technical audits and Core Web Vitals optimisation.';

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/services/seo-services`}
        image={`${process.env.NEXT_PUBLIC_SITE_URL}/og-seo.png`}
        services={[{ title: 'SEO Services', description }]}
      />

      <PageWrapper>
        <section className="pt-32 pb-12 text-center">
          <h1 className="text-4xl font-bold text-white">SEO Services in Islamabad</h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{description} We help local businesses rank and increase qualified traffic.</p>
        </section>

        <section className="py-12 text-center">
          <Link href="/contact" className="btn-primary">Request an SEO audit</Link>
        </section>
      </PageWrapper>
    </>
  );
}
