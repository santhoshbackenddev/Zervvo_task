const prisma = require('../config/prisma');
const AppError = require('../utils/AppError');

const getBooks = async () => {
  return prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });
};

const getBookById = async (id) => {
  const book = await prisma.book.findUnique({
    where: { id },
    include: { author: true },
  });

  if (!book) {
    throw new AppError('Book not found', 404);
  }

  return book;
};

const ensureAuthorExists = async (authorId) => {
  const author = await prisma.author.findUnique({
    where: { id: authorId },
  });

  if (!author) {
    throw new AppError('Author not found', 404);
  }
};

const getBooksByAuthorId = async (authorId) => {
  await ensureAuthorExists(authorId);

  return prisma.book.findMany({
    where: { authorId },
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });
};

const createBook = async (data) => {
  await ensureAuthorExists(data.authorId);

  return prisma.book.create({
    data,
    include: { author: true },
  });
};

const updateBook = async (id, data) => {
  await getBookById(id);

  if (data.authorId) {
    await ensureAuthorExists(data.authorId);
  }

  return prisma.book.update({
    where: { id },
    data,
    include: { author: true },
  });
};

const deleteBook = async (id) => {
  await getBookById(id);

  await prisma.book.delete({
    where: { id },
  });
};

module.exports = {
  getBooks,
  getBookById,
  getBooksByAuthorId,
  createBook,
  updateBook,
  deleteBook,
};
