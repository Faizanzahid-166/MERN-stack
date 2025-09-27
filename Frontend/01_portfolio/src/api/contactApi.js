
// src/api/contactApi.js
import apiClient from "../configApi/apiClient.js";

export const sendContactForm = async (data) => {
  const res = await apiClient.post("/contact", data);
  return res.data;
};