const express = require('express');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');
const validateRequest = require('../middleware/validateRequest');
const { idParamValidator, createBookValidator, updateBookValidator, } = require('../validators/bookValidators');

const router = express.Router();
const protectedMiddleware = [authMiddleware, rateLimiter];

router.get('/', bookController.getBooks);
router.get('/:id', validateRequest(idParamValidator), bookController.getBookById);
router.post('/', protectedMiddleware, validateRequest(createBookValidator), bookController.createBook);
router.put('/:id', protectedMiddleware, validateRequest(updateBookValidator), bookController.updateBook);
router.delete('/:id', protectedMiddleware, validateRequest(idParamValidator), bookController.deleteBook);

module.exports = router;
