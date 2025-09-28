// src/api/contactApi.js
import apiClient from "../configApi/apiClient.js";

export const sendContactForm = async (data) => {
  try {
    const res = await apiClient.post("/contact", data);

    return {
      success: res.data?.success || false,
      msg: res.data?.msg || "Something happened",
    };
  } catch (error) {
    console.error("sendContactForm error:", error.response?.data || error.message);

    return {
      success: false,
      msg: error.response?.data?.msg || "❌ Failed to send message",
    };
  }
};
