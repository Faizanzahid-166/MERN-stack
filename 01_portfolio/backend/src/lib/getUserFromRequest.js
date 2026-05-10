// src/lib/getUserFromRequest.js
import User from "../models/UserModel.js";
import { verifyToken } from "./auth.js";
import { parseCookies, COOKIE_NAME } from "./cookie.js";

export async function getUserFromRequest(req) {
  try {
    // If user is already attached to the request, return it immediately
    if (req.user) return req.user;

    const cookies = parseCookies(req.headers.cookie || "");
    const token = cookies[COOKIE_NAME];
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload?.id) return null;

    const user = await User.findById(payload.id)
      .select("-password")
      .lean();

    // Cache the user on the request object for future use in the same request cycle
    req.user = user || null;
    return req.user;
  } catch (err) {
    console.error("getUserFromRequest error:", err.message);
    return null;
  }
}
