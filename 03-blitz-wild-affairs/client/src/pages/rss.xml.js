import { blogAPI } from '@/api/APIs';

function escapeXml(s) {
  if (!s) return '';
  return s.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildRss(items, siteUrl) {
  const itemsXml = items.map(b => `
    <item>
      <title><![CDATA[${b.title}]]></title>
      <link>${escapeXml(`${siteUrl}/blogs/${b.slug}`)}</link>
      <guid>${escapeXml(`${siteUrl}/blogs/${b.slug}`)}</guid>
      <pubDate>${new Date(b.created_at).toUTCString()}</pubDate>
      <description><![CDATA[${b.excerpt || b.summary || b.title}]]></description>
    </item>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0">\n  <channel>\n    <title>Blitz World Affairs</title>\n    <link>${escapeXml(siteUrl)}</link>\n    <description>Latest articles from Blitz World Affairs</description>\n    ${itemsXml}\n  </channel>\n</rss>`;
}

export async function getServerSideProps({ req, res }) {
  try {
    const { data } = await blogAPI.getAll({ published: true, limit: 50 });
    const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
    const siteUrl = rawSiteUrl.replace(/\/$/, '');
    const xml = buildRss(data.blogs || [], siteUrl);
    res.setHeader('Content-Type', 'application/xml');
    res.write(xml);
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.end();
  }
  return { props: {} };
}

export default function RSS() { return null; }
