import Head from 'next/head';

function jsonLdScript(obj) {
  return JSON.stringify(obj);
}

function makeAbsolute(siteUrl, url) {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  if (!siteUrl) return url;
  return `${siteUrl.replace(/\/$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;
}

export function OrganizationLd() {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const siteUrl = rawSiteUrl ? rawSiteUrl.replace(/\/$/, '') : '';

  const logoUrl = siteUrl ? `${siteUrl}/og/publisher-logo.png` : undefined;

  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Blitz World Affairs',
    ...(siteUrl ? { url: siteUrl } : {}),
    sameAs: [
      'https://x.com/BlitzTechHub',
      'https://linkedin.com/company/blitztechhub',
      'https://github.com/Faizanzahid-166',
      'https://www.facebook.com/BlitzWorldAffairs',
      'https://www.youtube.com/@BlitzAffairs-7107',
    ],
    ...(logoUrl ? { logo: { '@type': 'ImageObject', url: logoUrl } } : {}),
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
  breadcrumbs = [],
}) {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
  const siteUrl = rawSiteUrl ? rawSiteUrl.replace(/\/$/, '') : '';
  const fullTitle = title ? `${title} | Blitz World Affairs` : 'Blitz World Affairs | Global News, Politics & Geopolitical Analysis';
  const metaDesc = description || 'Blitz World Affairs delivers expert coverage of geopolitics, international affairs, diplomacy, technology, economics, conflicts, and world news.';
  const metaImage = makeAbsolute(siteUrl, image || '/og/default.png') || undefined;

  // canonical handling: ensure absolute and no trailing slash (except root)
  const canonicalUrl = (function () {
    if (!canonical && siteUrl) return siteUrl;
    if (!canonical) return canonical;
    if (/^https?:\/\//i.test(canonical)) return canonical.replace(/\/$/, '');
    if (!siteUrl) return canonical.replace(/\/$/, '');
    return `${siteUrl}/${canonical.replace(/^\/+/, '').replace(/\/$/, '')}`;
  })();

  const articleLd = (type === 'article' || type === 'newsarticle') ? {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title || '',
    description: metaDesc,
    image: metaImage ? [metaImage] : undefined,
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    author: author ? { '@type': 'Person', name: author } : undefined,
    publisher: {
      '@type': 'Organization',
      name: publisher,
      logo: { '@type': 'ImageObject', url: siteUrl ? `${siteUrl}/og/publisher-logo.png` : undefined },
    },
    articleSection: articleSection || undefined,
    keywords: tags.length ? tags.join(', ') : (keywords || '').toString(),
    mainEntityOfPage: canonicalUrl ? { '@type': 'WebPage', '@id': canonicalUrl } : undefined,
  } : null;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta httpEquiv="Content-Language" content="en-US" />
      <meta name="content-language" content="en-US" />
      {keywords && <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(', ') : keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta name="author" content={author || publisher} />
      <meta name="publisher" content={publisher} />
      <meta name="robots" content={robots} />

      {/* Open Graph */}
      <meta property="og:title" content={title || fullTitle} />
      <meta property="og:description" content={metaDesc} />
      {metaImage && <meta property="og:image" content={metaImage} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:type" content={type === 'newsarticle' ? 'article' : type} />
      <meta property="og:site_name" content="Blitz World Affairs" />
      <meta property="og:locale" content="en_US" />

      {datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}

      {dateModified && (
        <meta property="article:modified_time" content={dateModified} />
      )}

      {/* article tags */}
      {Array.isArray(tags) && tags.map((t) => (
        <meta key={`tag-${t}`} property="article:tag" content={t} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      {metaImage && <meta name="twitter:image" content={metaImage} />}
      <meta name="twitter:site" content="@BlitzTechHub" />

      {/* Structured data */}
      <OrganizationLd />
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: b.name,
            item: b.url,
          })),
        }) }} />
      )}

      {articleLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(articleLd) }} />}
    </Head>
  );
}
