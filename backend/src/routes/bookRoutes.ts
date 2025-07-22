import { Router } from 'express'
import { getBooks, addBook, updateBook, deleteBook, searchTerm } from '../controllers/bookControllers'

const bookRouter = Router()

bookRouter.get("/", getBooks)
bookRouter.post("/", addBook)
bookRouter.patch("/:id", updateBook)
bookRouter.delete("/:id", deleteBook)

bookRouter.get("/search", searchTerm)

export { bookRouter}