// src/api/apiConfig.js
// ✅ Replaced import.meta.env.VITE_* with process.env.NEXT_PUBLIC_*

const apiConfig = {
  backendURL: process.env.NEXT_PUBLIC_RENDER_BACKEND_API_URL,
  nodeURL:    process.env.NEXT_PUBLIC_NODE_BACKEND_API_URL,
};

export default apiConfig;
