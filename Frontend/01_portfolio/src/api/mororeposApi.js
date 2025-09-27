// src/api/repoApi.js
import apiClient from "../configApi/apiClient.js";

// ✅ Get repos/projects from MongoDB
export async function fetchRepos() {
  const res = await apiClient.get("/mororepos"); // backend → /api/repos
  return res.data;
}

// ✅ Manually sync GitHub → MongoDB
export async function syncRepos() {
  const res = await apiClient.post("/mororepos/sync");
  return res.data;
}
