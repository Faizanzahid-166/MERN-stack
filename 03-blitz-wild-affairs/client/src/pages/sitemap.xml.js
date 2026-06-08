import { blogAPI } from '@/api/APIs';

function escapeXml(s) {
  if (!s) return '';
  return s.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildSitemap(items, siteUrl) {
  const urls = items.map((b) => `
  <url>
    <loc>${escapeXml(`${siteUrl}/blogs/${b.slug}`)}</loc>
    <lastmod>${new Date(b.updated_at || b.created_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${escapeXml(siteUrl)}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n${urls}\n</urlset>`;
}

export async function getServerSideProps({ req, res }) {
  try {
    const { data } = await blogAPI.getAll({ published: true, limit: 1000 });
    const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
    const siteUrl = rawSiteUrl.replace(/\/$/, '');
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
