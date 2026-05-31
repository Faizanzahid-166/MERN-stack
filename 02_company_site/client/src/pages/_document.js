// src/pages/_document.js
// ✅ NEW FILE — sets <html lang>, preloads Inter font, sets dark meta theme.
// Only runs on the server; do NOT put any client-side logic here.

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Fonts — Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Favicon — replace with your actual icon */}
        <link rel="icon" href="/blitz-tech-logo.png" />

        {/* Theme colour for mobile browser chrome */}
        <meta name="theme-color" content="#0A0A0F" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
