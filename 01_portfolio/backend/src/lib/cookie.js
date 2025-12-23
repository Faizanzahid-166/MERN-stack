// src/lib/cookie.js
import { serialize, parse } from "cookie";

const isProduction = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "access_token";

// -------------------- Set Cookie --------------------
export function setTokenCookie(token) {
  return serialize(COOKIE_NAME, token, {
    httpOnly: true,              // cannot be accessed by client JS
    secure: isProduction,        // HTTPS only in production
    sameSite: "lax",             // or "strict" if same-domain
    path: "/",                    // cookie accessible on all paths
    maxAge: 60 * 60 * 24 * 7,    // 7 days in seconds
  });
}

// -------------------- Clear Cookie --------------------
export function clearTokenCookie() {
  return serialize(COOKIE_NAME, "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),        // set cookie in the past to remove it
  });
}

// -------------------- Parse Cookies --------------------
// Accepts raw 'cookie' header from req.headers.cookie
export function parseCookies(cookieHeader) {
  return parse(cookieHeader || "");
}
