const authorService = require('../services/authorService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');

const getAuthors = asyncHandler(async (_req, res) => {
  const authors = await authorService.getAuthors();
  return successResponse(res, 200, 'Authors retrieved successfully', authors);
});

const getAuthorById = asyncHandler(async (req, res) => {
  const author = await authorService.getAuthorById(Number(req.params.id));
  return successResponse(res, 200, 'Author retrieved successfully', author);
});

const createAuthor = asyncHandler(async (req, res) => {
  const author = await authorService.createAuthor(req.body);
  return successResponse(res, 201, 'Author created successfully', author);
});

const updateAuthor = asyncHandler(async (req, res) => {
  const author = await authorService.updateAuthor(Number(req.params.id), req.body);
  return successResponse(res, 200, 'Author updated successfully', author);
});

const deleteAuthor = asyncHandler(async (req, res) => {
  await authorService.deleteAuthor(Number(req.params.id));
  return successResponse(res, 200, 'Author deleted successfully', {});
});

module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
