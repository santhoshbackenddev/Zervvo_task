const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const AppError = require('../utils/AppError');

const uploadDir = path.join(__dirname, '..', 'uploads');

const processImage = async (file) => {
  if (!file) {
    throw new AppError('Image file is required', 400);
  }

  await fs.mkdir(uploadDir, { recursive: true });

  const extension = 'webp';
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`;
  const outputPath = path.join(uploadDir, filename);

  const metadata = await sharp(file.buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath);

  return {
    originalName: file.originalname,
    filename,
    mimetype: 'image/webp',
    size: metadata.size,
    width: metadata.width,
    height: metadata.height,
    path: `/uploads/${filename}`,
  };
};

module.exports = {
  processImage,
};
