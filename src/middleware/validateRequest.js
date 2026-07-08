const AppError = require('../utils/AppError');

const formatZodErrors = (error) => {
  return error.errors.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));
};

const validateRequest = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    return next(new AppError('Validation failed', 400, formatZodErrors(result.error)));
  }

  req.body = result.data.body || req.body;
  req.params = result.data.params || req.params;
  req.query = result.data.query || req.query;

  return next();
};

module.exports = validateRequest;
