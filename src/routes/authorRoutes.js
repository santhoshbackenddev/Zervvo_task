const express = require('express');
const authorController = require('../controllers/authorController');
const authMiddleware = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');
const validateRequest = require('../middleware/validateRequest');
const {
  idParamValidator,
  createAuthorValidator,
  updateAuthorValidator,
} = require('../validators/authorValidators');

const router = express.Router();
const protectedMiddleware = [authMiddleware, rateLimiter];

router.get('/', authorController.getAuthors);
router.get('/:id', validateRequest(idParamValidator), authorController.getAuthorById);
router.post('/', protectedMiddleware, validateRequest(createAuthorValidator), authorController.createAuthor);
router.put('/:id', protectedMiddleware, validateRequest(updateAuthorValidator), authorController.updateAuthor);
router.delete('/:id', protectedMiddleware, validateRequest(idParamValidator), authorController.deleteAuthor);

module.exports = router;
