// src/lib/response.js

// -------------------- Success response --------------------
export function successResponse(res, message, data = null, status = 200) {
  return res.status(status).json({
    status: "success",
    message,
    data,
  });
}

// -------------------- Error response --------------------
export function errorResponse(res, message = "Something went wrong", status = 400) {
  return res.status(status).json({
    status: "error",
    message,
  });
}

// -------------------- Generic JSON response --------------------
export function jsonResponse(res, payload, status = 200) {
  return res.status(status).json(payload);
}
