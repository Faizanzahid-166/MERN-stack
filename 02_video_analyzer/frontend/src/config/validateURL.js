// src/config/validateURL.js
import axios from "axios";
import importenv from "./configURL.js";

const validateURL = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? importenv.nodeURL
      : importenv.backendURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 🔥 THIS IS THE KEY
});

export default validateURL;
