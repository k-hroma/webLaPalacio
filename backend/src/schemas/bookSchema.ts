import { z } from 'zod'

const AddBookSchema = z.object({
  img: z.string().min(1),
  isbn: z.string(),
  title: z.string().min(1),
  lastName: z.string().min(1),
  firstName: z.string().min(1),
  editorial: z.string().min(1),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative().optional(),
}).strict()

type AddBookBody = z.infer<typeof AddBookSchema>;

const UpdateBookSchema = z.object({
  img: z.string().min(1).optional(),
  isbn: z.string().optional(),
  title: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  firstName: z.string().min(1).optional(),
  editorial: z.string().min(1).optional(),
  price: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional(),
}).strict()

type UpdateBookBody = z.infer<typeof UpdateBookSchema>;

export { AddBookBody, AddBookSchema, UpdateBookSchema, UpdateBookBody }