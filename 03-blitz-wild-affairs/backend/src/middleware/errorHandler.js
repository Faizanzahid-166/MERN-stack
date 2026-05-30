// middleware/errorHandler.js
// Global Express error handler — must have 4 params to be recognised.
// Place AFTER all routes in server.js.

export const errorHandler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === 'development';

  // Log the error (replace with a proper logger like Winston in production)
  if (isDev) {
    console.error(`[Error] ${err.message}`);
    console.error(err.stack);
  } else {
    console.error(`[Error] ${err.message}`);
  }

  // Supabase / Postgres error codes
  if (err.code === '23505') {
    return res.status(409).json({ message: 'A record with this value already exists.' });
  }
  if (err.code === '23503') {
    return res.status(400).json({ message: 'Referenced record does not exist.' });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token. Please log in again.' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired. Please log in again.' });
  }

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'File too large. Maximum size is 50 MB.' });
  }

  // Operational errors (thrown with AppError)
  if (err.isOperational) {
    return res.status(err.statusCode || 400).json({ message: err.message });
  }

  // Unhandled / unexpected errors
  res.status(500).json({
    message: isDev ? err.message : 'Something went wrong. Please try again.',
    ...(isDev && { stack: err.stack }),
  });
};

// Handle 404 — place BEFORE errorHandler but AFTER all routes
export const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.originalUrl}`);
  err.statusCode = 404;
  err.isOperational = true;
  next(err);
};
