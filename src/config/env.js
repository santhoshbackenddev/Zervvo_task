const dotenv = require('dotenv');

dotenv.config();

const requiredEnv = ['DATABASE_URL', 'JWT_SECRET'];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  rateLimitWindowSeconds: Number(process.env.RATE_LIMIT_WINDOW_SECONDS || 60),
  rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS || 10),
  rateLimitMemoryFallback: process.env.RATE_LIMIT_MEMORY_FALLBACK !== 'false',
  uploadMaxFileSizeMb: Number(process.env.UPLOAD_MAX_FILE_SIZE_MB || 5),
};

module.exports = env;
