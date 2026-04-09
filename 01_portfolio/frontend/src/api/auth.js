import apiClient from "../configApi/apiClient.js";

/**
 * Signup
 */
export const signup = async ({ name, email, password }) => {
  const res = await apiClient.post("/api/auth/signup", {
    name,
    email,
    password,
  });

  return res.data; // { status, message, data }
};

/**
 * Login
 */
export const login = async ({ email, password }) => {
  const res = await apiClient.post("api/auth/login", {
    email,
    password,
  });

  return res.data;
};

/**
 * Logout
 */
export const logout = async () => {
  const res = await apiClient.post("/api/auth/logout");
  return res.data;
};



/**
 * Get current logged-in user
 */
export const me = async () => {
  const res = await apiClient.get("/api/auth/me");
  return res.data;
};
