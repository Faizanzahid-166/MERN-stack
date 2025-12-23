// src/lib/getUserFromRequest.js
import User from "../models/UserModel.js";
import { verifyToken } from "./auth.js";
import { parseCookies, COOKIE_NAME } from "./cookie.js";

export async function getUserFromRequest(req) {
  try {
    const cookies = parseCookies(req.headers.cookie || "");
    const token = cookies[COOKIE_NAME];
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload?.id) return null;

    const user = await User.findById(payload.id)
      .select("-password")
      .lean();

    return user || null;
  } catch (err) {
    console.error("getUserFromRequest error:", err.message);
    return null;
  }
}
