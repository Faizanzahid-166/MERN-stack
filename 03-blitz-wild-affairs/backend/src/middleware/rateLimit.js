// middleware/rateLimit.js
// Simple in-memory rate limiter for auth routes.
// For production use express-rate-limit with Redis store.

const requests = new Map();

/**
 * Rate limiter factory.
 * @param {number} maxRequests - Max requests per window.
 * @param {number} windowMs - Window in milliseconds.
 */
export const rateLimit = (maxRequests = 10, windowMs = 60_000) => {
  return (req, res, next) => {
    const key = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const now = Date.now();

    if (!requests.has(key)) {
      requests.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    const record = requests.get(key);

    if (now > record.resetAt) {
      // Window expired — reset
      requests.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      const retryAfter = Math.ceil((record.resetAt - now) / 1000);
      res.setHeader('Retry-After', retryAfter);
      return res.status(429).json({
        message: `Too many requests. Please wait ${retryAfter}s and try again.`,
      });
    }

    record.count++;
    next();
  };
};

// Clean up expired entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of requests.entries()) {
    if (now > record.resetAt) requests.delete(key);
  }
}, 5 * 60_000);

export default rateLimit;
