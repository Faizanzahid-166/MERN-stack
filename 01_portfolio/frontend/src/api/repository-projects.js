import apiClient from "../configApi/apiClient.js";


/**
 * Fetch repository projects
 * @param {Object} params - optional filters
 * @param {string} params.name
 * @param {string} params.project_name
 * @param {number} params.limit
 */
export const getRepositoryProjects = async (params = {}) => {
  const res = await apiClient.get("/api/repository/projects", {
    params, // axios auto converts this to query string
  });

  return res.data;
};

export const getRepositoryLists = async (params = {}) => {
  const res = await apiClient.get("/api/repository/lists", {
    params, // axios auto converts this to query string
  });

  return res.data;
};

export const createRepositoryProject = async (payload) => {
  const res = await apiClient.post("/api/repository/insert", payload); // match backend
  console.log(res.data);
  return res.data;
};

export const createRepositoryLists = async (payload) => {
  const res = await apiClient.post("/api/repository/insert/lists", payload); // match backend
  console.log(res.data);
  return res.data;
};

