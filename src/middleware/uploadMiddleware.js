const multer = require('multer');
const env = require('../config/env');
const AppError = require('../utils/AppError');

const storage = multer.memoryStorage();

const imageFileFilter = (_req, file, callback) => {
  if (!file.mimetype.startsWith('image/')) {
    return callback(new AppError('Only image files are allowed', 400));
  }

  return callback(null, true);
};

const uploadImage = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: env.uploadMaxFileSizeMb * 1024 * 1024,
  },
});

module.exports = uploadImage;
