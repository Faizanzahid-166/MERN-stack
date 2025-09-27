// src/api/apiClient.js
import axios from "axios";
import importenv from "./apiConfig.js";

// ✅ auto-switch between local and deployed backend
const apiClient = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? importenv.nodeURL        // Local dev backend
      : importenv.backendURL,    // Production backend
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ attach token automatically if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
