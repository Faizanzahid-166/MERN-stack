import Link from 'next/link';
import Image from 'next/image';
import SEO from '@/components/SEO';
import PageWrapper from '@/components/PageWrapper';

export default function AIAutomation() {
  const title = 'AI Automation — Blitz Tech Hub';
  const description = 'AI automation services: LLM integrations, process automation, and intelligent workflows to save time and cost.';

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/services/ai-automation`}
        image={`${process.env.NEXT_PUBLIC_SITE_URL}/og-ai.png`}
        services={[{ title: 'AI Automation', description }]}
      />

      <PageWrapper>
        <section className="pt-32 pb-12 text-center">
          <h1 className="text-4xl font-bold text-white">AI Automation</h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{description} We build LLM-powered assistants, document automation, and bespoke AI integrations.</p>
        </section>

        <section className="py-12 max-w-5xl mx-auto px-4">
          <Image src="/services/ai-hero.jpg" alt="AI automation" width={1200} height={700} />
        </section>

        <section className="py-12 text-center">
          <Link href="/contact" className="btn-primary">Discuss AI</Link>
        </section>
      </PageWrapper>
    </>
  );
}
