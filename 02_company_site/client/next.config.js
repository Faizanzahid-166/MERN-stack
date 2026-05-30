/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Redirect bare paths if needed (none required for this project)
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
