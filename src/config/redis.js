const Redis = require('ioredis');
const env = require('./env');

const redis = new Redis(env.redisUrl, {
  lazyConnect: true,
  enableOfflineQueue: false,
  maxRetriesPerRequest: 1,
  retryStrategy: null,
});

redis.on('error', () => {});

module.exports = redis;
