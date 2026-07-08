const { z } = require('zod');

const registerValidator = z.object({
  body: z.object({
    username: z
      .string({ required_error: 'Username is required' })
      .trim()
      .min(3, 'Username must be between 3 and 50 characters')
      .max(50, 'Username must be between 3 and 50 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Email must be valid')
      .toLowerCase(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters long'),
  }),
});

const loginValidator = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Email must be valid')
      .toLowerCase(),
    password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
  }),
});

module.exports = {
  registerValidator,
  loginValidator,
};
