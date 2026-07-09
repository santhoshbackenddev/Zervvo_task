const bookService = require('../services/bookService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');

const getBooks = asyncHandler(async (_req, res) => {
  const books = await bookService.getBooks();
  return successResponse(res, 200, 'Books retrieved successfully', books);
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await bookService.getBookById(Number(req.params.id));
  return successResponse(res, 200, 'Book retrieved successfully', book);
});

const getBooksByAuthorId = asyncHandler(async (req, res) => {
  const books = await bookService.getBooksByAuthorId(Number(req.params.authorId));
  return successResponse(res, 200, 'Author books retrieved successfully', books);
});

const createBook = asyncHandler(async (req, res) => {
  const book = await bookService.createBook({
    ...req.body,
    price: Number(req.body.price),
    authorId: Number(req.body.authorId),
  });
  return successResponse(res, 201, 'Book created successfully', book);
});

const updateBook = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (payload.price !== undefined) {
    payload.price = Number(payload.price);
  }

  if (payload.authorId !== undefined) {
    payload.authorId = Number(payload.authorId);
  }

  const book = await bookService.updateBook(Number(req.params.id), payload);
  return successResponse(res, 200, 'Book updated successfully', book);
});

const deleteBook = asyncHandler(async (req, res) => {
  await bookService.deleteBook(Number(req.params.id));
  return successResponse(res, 200, 'Book deleted successfully', {});
});

module.exports = {
  getBooks,
  getBookById,
  getBooksByAuthorId,
  createBook,
  updateBook,
  deleteBook,
};
