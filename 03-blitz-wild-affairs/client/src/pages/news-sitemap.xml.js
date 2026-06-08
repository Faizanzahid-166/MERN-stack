import { blogAPI } from '@/api/APIs';

function escapeXml(s) {
  if (!s) return '';
  return s.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/'/g, '&apos;');
}

function buildNewsSitemap(items, siteUrl) {
  const urls = items.map((b) => `
  <url>
    <loc>${escapeXml(`${siteUrl}/blogs/${b.slug}`)}</loc>
    <news:news>
      <news:publication>
        <news:name>Blitz World Affairs</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(b.created_at).toISOString()}</news:publication_date>
      <news:title>${escapeXml(b.title)}</news:title>
    </news:news>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${urls}\n</urlset>`;
}

export async function getServerSideProps({ req, res }) {
  try {
    const { data } = await blogAPI.getAll({ published: true, limit: 500 });
    const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
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
