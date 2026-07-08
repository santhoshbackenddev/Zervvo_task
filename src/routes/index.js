const express = require('express');
const authRoutes = require('./authRoutes');
const authorRoutes = require('./authorRoutes');
const bookRoutes = require('./bookRoutes');
const uploadRoutes = require('./uploadRoutes');

const router = express.Router();

router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Service is healthy',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
});

router.use(authRoutes);
router.use('/authors', authorRoutes);
router.use('/books', bookRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;
