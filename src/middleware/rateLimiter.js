const env = require('../config/env');
const redis = require('../config/redis');
const AppError = require('../utils/AppError');

const memoryStore = new Map();

const applyMemoryRateLimit = (userId) => {
  const now = Date.now();
  const windowMs = env.rateLimitWindowSeconds * 1000;
  const key = String(userId);
  const current = memoryStore.get(key);

  if (!current || current.resetAt <= now) {
    memoryStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return true;
  }

  current.count += 1;
  return current.count <= env.rateLimitMaxRequests;
};

const rateLimiter = async (req, _res, next) => {
  if (!req.user?.userId) {
    return next(new AppError('Authenticated user is required for rate limiting', 401));
  }

  const key = `rate-limit:user:${req.user.userId}`;

  try {
    if (redis.status === 'wait' || redis.status === 'end') {
      await redis.connect();
    }

    const current = await redis.incr(key);

    console.log({
      key,
      count: current
    });

    if (current === 1) {
      await redis.expire(key, env.rateLimitWindowSeconds);
    }

    if (current > env.rateLimitMaxRequests) {
      return next(new AppError('Too many requests. Please try again later.', 429));
    }

    return next();
  } catch (error) {
    if (env.nodeEnv !== 'production' && env.rateLimitMemoryFallback) {
      const isAllowed = applyMemoryRateLimit(req.user.userId);

      if (!isAllowed) {
        return next(new AppError('Too many requests. Please try again later.', 429));
      }

      return next();
    }

    return next(new AppError('Rate limiter service unavailable', 503));
  }
};

module.exports = rateLimiter;
