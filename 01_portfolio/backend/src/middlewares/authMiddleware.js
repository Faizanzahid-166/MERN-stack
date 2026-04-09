// src/middleware/authMiddleware.js
import User from "../models/UserModel.js";
import { verifyToken } from "../lib/auth.js";
import { parseCookies, COOKIE_NAME } from "../lib/cookie.js";

export const protectRoute = async (req, res, next) => {
  try {
    const cookies = parseCookies(req.headers.cookie || "");
    const token = cookies[COOKIE_NAME];

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Authentication required",
      });
    }

    const decoded = verifyToken(token);
    if (!decoded?.id) {
      return res.status(401).json({
        status: "error",
        message: "Invalid or expired token",
      });
    }

    const user = await User.findById(decoded.id)
      .select("-password")
      .lean();

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User no longer exists",
      });
    }

    req.user = user; // full user object
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({
      status: "error",
      message: "Authentication failed",
    });
  }
};
