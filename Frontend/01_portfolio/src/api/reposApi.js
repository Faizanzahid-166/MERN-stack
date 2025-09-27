// src/api/repoApi.js
import apiClient from "../configApi/apiClient.js";

export const fetchRepos = async () => {
  try {
    const res = await apiClient.get("/repos"); 
    return res.data;
  } catch (err) {
    console.error("❌ Failed to fetch repos:", err);
    throw err;
  }
};
