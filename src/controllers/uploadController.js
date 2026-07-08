const uploadService = require('../services/uploadService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');

const uploadImage = asyncHandler(async (req, res) => {
  const fileInfo = await uploadService.processImage(req.file);
  return successResponse(res, 201, 'Image uploaded successfully', fileInfo);
});

module.exports = {
  uploadImage,
};
