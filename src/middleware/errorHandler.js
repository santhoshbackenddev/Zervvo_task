const { Prisma } = require('@prisma/client');
const { errorResponse } = require('../utils/apiResponse');
const AppError = require('../utils/AppError');

const notFoundHandler = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

const errorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let data = err.details || null;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = 409;
      message = 'A record with this unique field already exists';
    } else if (err.code === 'P2025') {
      statusCode = 404;
      message = 'Requested record was not found';
    }
  }

  if (err.name === 'MulterError') {
    statusCode = 400;
    message = err.message;
  }

  if (process.env.NODE_ENV !== 'production' && statusCode === 500) {
    data = { stack: err.stack };
  }

  return errorResponse(res, statusCode, message, data);
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
