const express = require('express');
const uploadController = require('../controllers/uploadController');
const authMiddleware = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');
const uploadImage = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/', authMiddleware, rateLimiter, uploadImage.single('image'), uploadController.uploadImage);

module.exports = router;
