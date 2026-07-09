const { z } = require('zod');

const idParamSchema = z.object({
  id: z.coerce.number().int('ID must be a positive integer').positive('ID must be a positive integer'),
});

const idParamValidator = z.object({
  params: idParamSchema,
});

const authorIdParamValidator = z.object({
  params: z.object({
    authorId: z.coerce
      .number()
      .int('Author ID must be a positive integer')
      .positive('Author ID must be a positive integer'),
  }),
});

const createBookValidator = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is required' })
      .trim()
      .min(1, 'Title is required')
      .max(150, 'Title cannot exceed 150 characters'),
    description: z
      .string()
      .trim()
      .max(2000, 'Description cannot exceed 2000 characters')
      .nullable()
      .optional(),
    price: z.coerce.number().positive('Price must be a positive number'),
    authorId: z.coerce
      .number()
      .int('Author ID must be a positive integer')
      .positive('Author ID must be a positive integer'),
  }),
});

const updateBookValidator = z.object({
  params: idParamSchema,
  body: z
    .object({
      title: z
        .string()
        .trim()
        .min(1, 'Title cannot be empty')
        .max(150, 'Title cannot exceed 150 characters')
        .optional(),
      description: z
        .string()
        .trim()
        .max(2000, 'Description cannot exceed 2000 characters')
        .nullable()
        .optional(),
      price: z.coerce.number().positive('Price must be a positive number').optional(),
      authorId: z.coerce
        .number()
        .int('Author ID must be a positive integer')
        .positive('Author ID must be a positive integer')
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field is required',
    }),
});

module.exports = {
  idParamValidator,
  authorIdParamValidator,
  createBookValidator,
  updateBookValidator,
};
