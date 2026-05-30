// src/api/ENV.js
// Uses Next.js public env vars (NEXT_PUBLIC_* prefix required for browser access).
// Set these in your .env.local file:
//   NEXT_PUBLIC_BACKEND_URL=https://your-production-api.com
//   NEXT_PUBLIC_NODE_URL=http://localhost:5000
const ENV = {
  backendURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  nodeURL:    process.env.NEXT_PUBLIC_NODE_URL,
};

export default ENV;
