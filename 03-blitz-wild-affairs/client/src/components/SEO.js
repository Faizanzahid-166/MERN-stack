import Head from 'next/head';

function jsonLdScript(obj) {
  return JSON.stringify(obj);
}

export function OrganizationLd() {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Blitz World Affairs',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
    sameAs: [
      'https://x.com/BlitzTechHub',
      'https://linkedin.com/company/blitztechhub',
      'https://github.com/Faizanzahid-166',
      'https://www.facebook.com/BlitzWorldAffairs',
      'https://www.youtube.com/@BlitzAffairs-7107',
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/og/publisher-logo.png`,
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(org) }} />;
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  author,
  publisher = 'Blitz World Affairs',
  image,
  type = 'website',
  robots = 'index,follow',
  datePublished,
  dateModified,
  articleSection,
  tags = [],
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const fullTitle = title ? `${title} | Blitz World Affairs` : 'Blitz World Affairs | Global News, Politics & Geopolitical Analysis';
  const metaDesc = description || 'Blitz World Affairs delivers expert coverage of geopolitics, international affairs, diplomacy, technology, economics, conflicts, and world news.';
  const metaImage = image || `${siteUrl}/og/default.png`;

  const articleLd = type === 'article' || type === 'newsarticle' ? {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title || '',
    description: metaDesc,
    image: [metaImage],
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    author: author ? { '@type': 'Person', name: author } : undefined,
    publisher: {
      '@type': 'Organization',
      name: publisher,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/og/publisher-logo.png` },
    },
    articleSection: articleSection || undefined,
    keywords: tags.length ? tags.join(', ') : (keywords || '').toString(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical || siteUrl },
  } : null;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(', ') : keywords} />}
      <link rel="canonical" href={canonical || siteUrl} />
      <meta name="author" content={author || publisher} />
      <meta name="publisher" content={publisher} />
      <meta name="robots" content={robots} />

      {/* Open Graph */}
      <meta property="og:title" content={title || fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonical || siteUrl} />
      <meta property="og:type" content={type === 'newsarticle' ? 'article' : type} />
      <meta property="og:site_name" content="Blitz World Affairs" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaImage} />

      {/* Structured data */}
      <OrganizationLd />
      {articleLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(articleLd) }} />}
    </Head>
  );
}
