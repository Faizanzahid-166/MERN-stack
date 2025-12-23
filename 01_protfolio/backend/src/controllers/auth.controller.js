// src/controllers/auth.controller.js
import User from "../models/UserModel.js";
import {
  hashPassword,
  comparePassword,
  signToken,
  getAuthCookieHeader,
  clearAuthCookieHeader,
} from "../lib/auth.js";
import { successResponse, errorResponse } from "../lib/response.js";

// -------------------- Signup --------------------
export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, "All fields are required", 400);
    }

    if (password.length < 6) {
      return errorResponse(res, "Password must be at least 6 characters", 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "User already exists", 409);
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = signToken({ id: user._id });
    res.append("Set-Cookie", getAuthCookieHeader(token));

    return successResponse(res, "User registered", {
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    return errorResponse(res, "Signup failed", 500);
  }
}

// -------------------- Login --------------------
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, "Email and password are required", 400);
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const token = signToken({ id: user._id });
    res.append("Set-Cookie", getAuthCookieHeader(token));

    return successResponse(res, "Login successful", {
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return errorResponse(res, "Login failed", 500);
  }
}

// -------------------- Logout --------------------
export async function logout(req, res) {
  res.append("Set-Cookie", clearAuthCookieHeader());
  return successResponse(res, "Logged out successfully");
}

// -------------------- Get Current User --------------------
export async function getMe(req, res) {
  try {
    const user = req.user;
    return successResponse(res, "Current user", {
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("GetMe error:", err.message);
    return errorResponse(res, "Failed to fetch user", 500);
  }
}
