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
