// src/api/videoCollection.js
import validateURL from "../config/validateURL.js";

/**
 * Upload video to backend
 * @param {FormData} formData
 */
export const videoAPI = async (formData) => {
  try {
    const response = await validateURL.post(
      "/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Video upload error:", error.response?.data || error.message);
    throw error;
  }
};
