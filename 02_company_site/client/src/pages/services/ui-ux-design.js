import Link from 'next/link';
import Image from 'next/image';
import SEO from '@/components/SEO';
import PageWrapper from '@/components/PageWrapper';

export default function UIUXDesign() {
  const title = 'UI/UX Design — Blitz Tech Hub';
  const description = 'Human-centred UI/UX design services that balance product strategy, accessibility, and delightful visuals.';

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/services/ui-ux-design`}
        image={`${process.env.NEXT_PUBLIC_SITE_URL}/og-ux.png`}
        services={[{ title: 'UI/UX Design', description }]}
      />

      <PageWrapper>
        <section className="pt-32 pb-12 text-center">
          <h1 className="text-4xl font-bold text-white">UI / UX Design</h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{description} We produce wireframes, prototypes, and production-ready interfaces that convert users.</p>
        </section>

        <section className="py-12 max-w-5xl mx-auto px-4">
          <Image src="/services/ux-hero.jpg" alt="UI UX" width={1200} height={700} />
        </section>

        <section className="py-12 text-center">
          <Link href="/contact" className="btn-primary">Request a design review</Link>
        </section>
      </PageWrapper>
    </>
  );
}
