export async function getServerSideProps({ res }) {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const siteUrl = rawSiteUrl.replace(/\/$/, '');
  const txt = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\nSitemap: ${siteUrl}/news-sitemap.xml`;
  res.setHeader('Content-Type', 'text/plain');
  res.write(txt);
  res.end();
  return { props: {} };
}

export default function Robots() { return null; }
