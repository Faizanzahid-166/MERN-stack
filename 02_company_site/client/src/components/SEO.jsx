import Head from 'next/head';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blitztechhub.com';

export default function SEO({
  title,
  description,
  canonical,
  image,
  twitter = '@blitztechhub',
  services = [],
  locale = 'en_US',
}) {
  const pageUrl = canonical || SITE_URL;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: 'Blitz Tech Hub',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://www.linkedin.com/company/blitztechhub',
      'https://twitter.com/blitztechhub'
    ]
  };

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: 'Blitz Tech Hub',
    image: image || `${SITE_URL}/og-image.png`,
    '@id': SITE_URL,
    url: SITE_URL,
    telephone: '+92 331 9887683',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '',
      addressLocality: 'Islamabad',
      addressRegion: '',
      addressCountry: 'PK'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '33.6844',
      longitude: '73.0479'
    },
    sameAs: orgSchema.sameAs
  };

  const serviceSchemas = services.map((svc) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: svc.title || svc.name,
    description: svc.description || '',
    url: svc.url || SITE_URL,
  }));

  const jsonLd = [orgSchema, localSchema, ...serviceSchemas];

  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}

      {/* Open Graph */}
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Blitz Tech Hub" />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={image || `${SITE_URL}/og-image.png`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitter} />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image || `${SITE_URL}/og-image.png`} />

      {/* Canonical */}
      <link rel="canonical" href={pageUrl} />

      {/* Structured data */}
      <script
        type="application/ld+json"
        // JSON must be a string literal
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Best-practice meta defaults */}
      <meta name="robots" content="index,follow" />
    </Head>
  );
}
