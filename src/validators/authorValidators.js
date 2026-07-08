const { z } = require('zod');

const idParamSchema = z.object({
  id: z.coerce.number().int('ID must be a positive integer').positive('ID must be a positive integer'),
});

const idParamValidator = z.object({
  params: idParamSchema,
});

const createAuthorValidator = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(1, 'Name is required')
      .max(100, 'Name cannot exceed 100 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Email must be valid')
      .toLowerCase(),
  }),
});

const updateAuthorValidator = z.object({
  params: idParamSchema,
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(1, 'Name cannot be empty')
        .max(100, 'Name cannot exceed 100 characters')
        .optional(),
      email: z.string().trim().email('Email must be valid').toLowerCase().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});

module.exports = {
  idParamValidator,
  createAuthorValidator,
  updateAuthorValidator,
};
