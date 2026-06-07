import { blogAPI } from '@/api/APIs';

function buildRss(items, siteUrl) {
  const itemsXml = items.map(b => `
    <item>
      <title><![CDATA[${b.title}]]></title>
      <link>${siteUrl}/blogs/${b.slug}</link>
      <guid>${siteUrl}/blogs/${b.slug}</guid>
      <pubDate>${new Date(b.created_at).toUTCString()}</pubDate>
      <description><![CDATA[${b.excerpt || b.summary || b.title}]]></description>
    </item>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Blitz World Affairs</title>
      <link>${siteUrl}</link>
      <description>Latest articles from Blitz World Affairs</description>
      ${itemsXml}
    </channel>
  </rss>`;
}

export async function getServerSideProps({ res }) {
  try {
    const { data } = await blogAPI.getAll({ published: true, limit: 50 });
    const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
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
