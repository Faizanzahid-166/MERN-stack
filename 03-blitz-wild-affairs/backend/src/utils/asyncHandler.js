// utils/asyncHandler.js
// Wraps async route handlers to automatically forward errors to Express error middleware.
// Usage: router.get('/route', asyncHandler(async (req, res) => { ... }))

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
