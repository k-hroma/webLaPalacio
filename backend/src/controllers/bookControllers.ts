import { Request, Response, NextFunction } from 'express'
import { QueryResponse } from '../types/queryResponse'
import { IBook } from '../types/bookInterface'
import { AddBookSchema, AddBookBody, UpdateBookSchema, UpdateBookBody } from '../schemas/bookSchema'
import { Book } from '../models/bookModel'
import mongoose from 'mongoose'

// Request es el tipo genérico de Express para una solicitud HTTP (req). Este tipo recibe hasta 4 parámetros genéricos: // Request<Params, ResBody, ReqBody, ReqQuery>
// Response<T> es el tipo de respuesta de Express (res).
// next es la función que se llama para pasar al siguiente middleware si hay uno.
// La función es async, por eso devuelve una Promise. Como no retorna nada directamente (no hay return algo), se especifica Promise<void>.
// La línea next(error) se utiliza en Express para delegar el manejo de errores al middleware de manejo de errores, que es una función especial al final de tu cadena de middlewares y rutas.

/**
 * Controlador para obtener todos los libros.
 * Devuelve un array vacío si no hay libros en la base de datos.
 */

const getBooks = async (req: Request, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  try {
    // .find() siempre devuelve un array, no es necesario verificar que exista
    const books: IBook[] = await Book.find()
    res.status(200).json({
      success: true,
      message: books.length > 0 ? "Books retrieved successfully." : "No books found in the database.",
      data: books
    });
    return
    
  } catch (error: unknown) {
    next(error)
  }
}
 
/**
 * Controlador para agregar un nuevo libro.
 * Valida los datos recibidos con Zod antes de guardarlos.
 */

const addBook = async (req: Request<{}, {}, AddBookBody>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => { 
  const parseResult = AddBookSchema.safeParse(req.body)
  
  if (!parseResult.success) {
    const errMsg = "Validation failed: Invalid input data."
    res.status(400).json({
      success: false,
      message:errMsg ,
      error: parseResult.error
    });
    console.error(`${errMsg}:`, parseResult.error)
    return;
  }
  const dataBook = parseResult.data;
  // const { img, isbn, title, lastName, firstName, editorial, price, stock } = parseResult.data;
  try {
    const newBook = await Book.create(dataBook)
    res.status(201).json({
      success: true,
      message: "New book added to database successfully.",
      data: newBook
    });
    return
    
  } catch (error: unknown) {
    if ((error as any).code === 11000) {
      const errMsg = "Duplicate ISBN error (code 11000)"
      res.status(409).json({
        success: false,
        message: "Duplicate entry: ISBN already exists.",
        error: 11000
      });
      console.error(errMsg);
      return;
    }
    next(error)
  }
}

/**
 * Controlador para actualizar un libro existente por ID.
 * Verifica el formato del ID y valida los datos con Zod.
 */

const updateBook = async (req: Request<{ id: string }, {}, UpdateBookBody>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  const { id } = req.params
  if (!id) {
    const errMsg = "Book ID is required."
    res.status(400).json({
      success: false,
      message: errMsg
    });
    console.error(errMsg)
    return
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const errMsg = "Invalid ID format."
    res.status(400).json({
      success: false,
      message: errMsg
    })
    console.error(errMsg)
    return
  }
  
  const parseResult = UpdateBookSchema.safeParse(req.body);
  if (!parseResult.success) {
    const errMsg = "Validation failed: Invalid input data."
    res.status(400).json({
      success: false,
      message: errMsg,
      error: parseResult.error
    });
    console.error(`${errMsg}:`, parseResult.error);
    return;
  }

  const updateDataBook = parseResult.data

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updateDataBook, { new: true });
    if (!updatedBook) {
      const errMsg = `No book found with ID: ${id}.`;
      res.status(404).json({
        success: false,
        message: errMsg,
      });
      console.error(errMsg)
      return;
    };

    res.status(200).json({
      success: true,
      message: "Book updated successfully.",
      data: updatedBook
    });
    return
    
  } catch (error: unknown) {
    next(error)
  }
};

/**
 * Controlador para eliminar un libro por ID.
 * Verifica el formato del ID antes de proceder con la eliminación.
 */

const deleteBook = async (req: Request<{ id: string }>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  const { id } = req.params
  if (!id) {
    const errMsg = "Book ID is required."
    res.status(400).json({
      success: false,
      message: errMsg
    });
    console.error(errMsg)
    return
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const errMsg = "Invalid ID format."
    res.status(400).json({
      success: false,
      message: errMsg
    })
    console.error(errMsg)
    return
  }
  try {
    const deletedBook = await Book.findByIdAndDelete(id)
    if (!deletedBook) {
      const errMsg = `Book with ID ${id} not found.`
      res.status(404).json({
        success: false,
        message: errMsg
      });
      console.error(errMsg)
      return;
    }
    res.status(200).json({
      success: true,
      message: "Book deleted from database successfully.",
      data: deletedBook
    });
    
  } catch (error: unknown) {
    next(error)
  }
};

export { getBooks, addBook, updateBook, deleteBook }  