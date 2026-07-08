const express = require('express');
const authController = require('../controllers/authController');
const validateRequest = require('../middleware/validateRequest');
const { registerValidator, loginValidator } = require('../validators/authValidators');

const router = express.Router();

router.post('/register', validateRequest(registerValidator), authController.register);
router.post('/login', validateRequest(loginValidator), authController.login);

module.exports = router;
