import { blogAPI } from '@/api/APIs';

function buildSitemap(items, siteUrl) {
  const urls = items.map((b) => `
  <url>
    <loc>${siteUrl}/blogs/${b.slug}</loc>
    <lastmod>${new Date(b.updated_at || b.created_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls}
  </urlset>`;
}

export async function getServerSideProps({ res }) {
  try {
    const { data } = await blogAPI.getAll({ published: true, limit: 1000 });
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
    const xml = buildSitemap(data.blogs || [], siteUrl);
    res.setHeader('Content-Type', 'application/xml');
    res.write(xml);
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.end('');
  }

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
