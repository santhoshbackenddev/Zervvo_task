const prisma = require('../config/prisma');
const AppError = require('../utils/AppError');

const getAuthors = async () => {
  return prisma.author.findMany({
    orderBy: { createdAt: 'desc' },
    include: { books: true },
  });
};

const getAuthorById = async (id) => {
  const author = await prisma.author.findUnique({
    where: { id },
    include: { books: true },
  });

  if (!author) {
    throw new AppError('Author not found', 404);
  }

  return author;
};

const createAuthor = async (data) => {
  return prisma.author.create({
    data,
  });
};

const updateAuthor = async (id, data) => {
  await getAuthorById(id);

  return prisma.author.update({
    where: { id },
    data,
  });
};

const deleteAuthor = async (id) => {
  await getAuthorById(id);

  await prisma.author.delete({
    where: { id },
  });
};

module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
