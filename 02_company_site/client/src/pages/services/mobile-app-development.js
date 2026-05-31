import Link from 'next/link';
import Image from 'next/image';
import SEO from '@/components/SEO';
import PageWrapper from '@/components/PageWrapper';

export default function MobileAppDevelopment() {
  const title = 'Mobile App Development — Blitz Tech Hub';
  const description = 'Native and cross-platform mobile app development for iOS and Android, with strong UX and performance focus.';

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/services/mobile-app-development`}
        image={`${process.env.NEXT_PUBLIC_SITE_URL}/og-mobile.png`}
        services={[{ title: 'Mobile App Development', description }]}
      />

      <PageWrapper>
        <section className="pt-32 pb-12 text-center">
          <h1 className="text-4xl font-bold text-white">Mobile App Development</h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{description} We deliver performant apps, intuitive UX, and release support.</p>
        </section>

        <section className="py-12 max-w-5xl mx-auto px-4">
          <Image src="/services/mobile-hero.jpg" alt="Mobile apps" width={1200} height={700} />
          <h2 className="text-2xl font-semibold text-white mt-6">Platforms & frameworks</h2>
          <p className="text-gray-400">React Native, Flutter, and native Swift/Kotlin development available depending on requirements and performance targets.</p>
        </section>

        <section className="py-12 text-center">
          <Link href="/contact" className="btn-primary">Start your app</Link>
        </section>
      </PageWrapper>
    </>
  );
}
