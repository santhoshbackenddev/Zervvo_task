const app = require('./app');
const env = require('./config/env');
const prisma = require('./config/prisma');
const redis = require('./config/redis');

const server = app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully.`);

  server.close(async () => {
    await prisma.$disconnect();
    redis.disconnect();
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  shutdown('unhandledRejection');
});
