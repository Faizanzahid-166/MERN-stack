import express from "express";
import { signup, login, logout, getMe } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/authMiddleware.js"; // fixed path
import { validateBody, signupSchema, loginSchema } from "../lib/validation.js"; // optional validation

const router = express.Router();

// -------------------- Signup route --------------------
router.post("/signup", validateBody(signupSchema), signup);

// -------------------- Login route --------------------
router.post("/login", validateBody(loginSchema), login);

// -------------------- Logout route --------------------
router.post("/logout", logout);

// -------------------- Get current user --------------------
router.get("/me", protectRoute, getMe);

export default router;
