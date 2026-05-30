// utils/AppError.js
// Custom error class that includes an HTTP status code.
// Usage: throw new AppError('Not found', 404);

export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distinguishes known errors from unexpected crashes
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
