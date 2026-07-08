const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');

const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  return successResponse(res, 201, 'User registered successfully', user);
});

const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  return successResponse(res, 200, 'Login successful', data);
});

module.exports = {
  register,
  login,
};
