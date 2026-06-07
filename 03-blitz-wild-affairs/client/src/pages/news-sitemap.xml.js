import { blogAPI } from '@/api/APIs';

function buildNewsSitemap(items, siteUrl) {
  const urls = items.map((b) => `
  <url>
    <loc>${siteUrl}/blogs/${b.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Blitz World Affairs</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(b.created_at).toISOString()}</news:publication_date>
      <news:title>${b.title}</news:title>
    </news:news>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${urls}
  </urlset>`;
}

export async function getServerSideProps({ res }) {
  try {
    const { data } = await blogAPI.getAll({ published: true, limit: 500 });
    const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
    const siteUrl = rawSiteUrl.replace(/\/$/, '');
    const articles = (data.blogs || []).filter(b => b.featured || b.tags?.includes('news'));
    const xml = buildNewsSitemap(articles, siteUrl);
    res.setHeader('Content-Type', 'application/xml');
    res.write(xml);
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.end('');
  }

  return { props: {} };
}

export default function NewsSitemap() {
  return null;
}
