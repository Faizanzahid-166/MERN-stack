// src/lib/validation.js
import { z } from "zod";
import { errorResponse } from "./response.js";

// -------------------- Schemas --------------------
export const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// -------------------- Middleware --------------------
export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const message = result.error.errors
      .map((e) => e.message)
      .join(", ");

    return errorResponse(res, message, 400);
  }

  // replace body with sanitized data
  req.body = result.data;
  next();
};
