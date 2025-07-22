import { z } from 'zod'

const AddBookSchema = z.object({
  img: z.string().trim().min(1, "Image URL is required"),
  isbn: z.string().trim().min(1, "ISBN is required"),
  title: z.string().trim().min(1, "Title is required"),
  lastName: z.string().trim().min(1, "Author last name is required"),
  firstName: z.string().trim().min(1, "Author first name is required"),
  editorial: z.string().trim().min(1, "Editorial is required"),
  price: z.number().nonnegative("Price must be a positive number"),
  stock: z.number().int().nonnegative("Stock must be 0 or more").default(0).optional(),
  latestBook: z.boolean().default(false)
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
  latestBook: z.boolean().default(false).optional()
}).strict()

type UpdateBookBody = z.infer<typeof UpdateBookSchema>;

const SearchBookQuerySchema = z.object({
  term: z.string().trim().min(1, "Search term is required")
});

type SearchBookQuery = z.infer<typeof SearchBookQuerySchema>;


export { AddBookBody, AddBookSchema, UpdateBookSchema, UpdateBookBody, SearchBookQuery, SearchBookQuerySchema }