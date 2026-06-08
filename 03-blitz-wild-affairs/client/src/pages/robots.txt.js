export async function getServerSideProps({ req, res }) {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
  const siteUrl = rawSiteUrl.replace(/\/$/, '');
  const txt = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\nSitemap: ${siteUrl}/news-sitemap.xml\nSitemap: ${siteUrl}/rss.xml`;
  res.setHeader('Content-Type', 'text/plain');
  res.write(txt);
  res.end();
  return { props: {} };
}

export default function Robots() { return null; }
