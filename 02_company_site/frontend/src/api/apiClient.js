// src/api/apiClient.js
import axios from "axios";
import importenv from "./apiConfig.js";

const apiClient = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? importenv.nodeURL
      : importenv.backendURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 🔥 THIS IS THE KEY
});

export default apiClient;
