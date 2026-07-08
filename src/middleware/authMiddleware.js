const AppError = require('../utils/AppError');
const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Authorization token is required', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Authorization token has expired', 401));
    }

    return next(new AppError('Invalid authorization token', 401));
  }
};

module.exports = authMiddleware;
