import { getUserFromRequest } from "../lib/getUserFromRequest.js";
import { errorResponse } from "../lib/response.js";

export const protectRoute = async (req, res, next) => {
  try {
    const user = await getUserFromRequest(req);

    if (!user) {
      return errorResponse(res, "Not authorized, please login", 401);
    }

    // The user object is already attached to req.user by getUserFromRequest
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return errorResponse(res, "Authentication failed", 401);
  }
};
