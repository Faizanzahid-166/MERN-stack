// src/api/apiClient.js
import axios from "axios";
import ENV from "./ENV.js";

const Client = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? ENV.nodeURL
      : ENV.backendURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 🔥 THIS IS THE KEY
});

// ── Response interceptor — surface error messages cleanly ──────
Client.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config?.url || "";
    // Don't redirect for session checks, admin data, or health checks.
    // Let the components handle their own empty/error states.
    const isSafeRoute =
      url.includes("/auth/me") ||
      url.includes("/admin/") ||
      url.includes("/health");

    if (err.response?.status === 401 && !isSafeRoute) {
      // Redirect to login without a full page reload loop
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default Client;
