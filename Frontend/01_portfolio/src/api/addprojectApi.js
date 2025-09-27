// src/api/projectApi.js
import apiClient from "../configApi/apiClient.js";

// base endpoint for projects
const API = "/projects";  

// ✅ Create project (needs token)
export const createProject = async (data) => {
  return apiClient.post(API, data);
};

// ✅ Delete project (needs token)
export const deleteProject = async (id) => {
  return apiClient.delete(`${API}/${id}`);
};

// ✅ Get all projects (public)
export const getProjects = async () => {
  const res = await apiClient.get(API);
  return res.data;
};
