import SEO from './SEO';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blitztechhub.com';

export default function SEOArticle({
  title,
  description,
  image,
  publishedAt,
  modifiedAt,
  author = { name: 'Blitz Tech Hub' },
  breadcrumbs = [],
  canonical,
}) {
  const articleUrl = canonical || SITE_URL;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    headline: title,
    image: [image || `${SITE_URL}/og-image.png`],
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: { '@type': 'Organization', name: author.name },
    publisher: {
      '@type': 'Organization',
      name: 'Blitz Tech Hub',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` }
    },
    description,
  };

  const breadcrumbSchema = breadcrumbs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: b.item,
        })),
      }
    : null;

  const extraJson = breadcrumbSchema ? [articleSchema, breadcrumbSchema] : [articleSchema];

  return (
    <>
      <SEO title={title} description={description} image={image} canonical={articleUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(extraJson) }}
      />
    </>
  );
}
