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

const getBooks = async (req: Request, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  try {
    // .find() siempre devuelve un array, no es necesario verificar que exista
    const books: IBook[] = await Book.find()
    res.status(200).json({
      success: true,
      message: books.length > 0 ? "Books found" : "Database is empty",
      data: books
    });
    return
    
  } catch (error: unknown) {
    next(error)
  }
 }

const addBook = async (req: Request<{}, {}, AddBookBody>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => { 
  // valido los datos recibidos en el body usando Zod-> devuelve un objeto {success/data o success/erros}
  const parseResult = AddBookSchema.safeParse(req.body)
  
  if (!parseResult.success) {
    const errMsg = "Invalid input data"
    res.status(400).json({
      success: false,
      message:errMsg ,
      error: parseResult.error
    });
    console.error(errMsg)
    return;
  }
  const dataBook = parseResult.data;
  // const { img, isbn, title, lastName, firstName, editorial, price, stock } = req.body
  // const dataBook = {img, isbn, title, lastName, firstName, editorial, price, stock}
  try {
    const newBook = await Book.create(dataBook)
    res.status(201).json({
      success: true,
      message: "Book successfully created.",
      data: newBook
    });
    return
    
  } catch (error: unknown) {
    if ((error as any).code === 11000) {
      res.status(409).json({
        success: false,
        message: "The ISBN already exists in the database.",
        error: 11000
      });
      return;
    }
    next(error)
  }
}

const updateBook = async (req: Request<{ id: string }, {}, UpdateBookBody>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  // desestructurar id
  const { id } = req.params
  // verificar que el id exista
  if (!id) {
    const errMsg = "Book ID is required."
    res.status(400).json({
      success: false,
      message: errMsg
    });
    console.error(errMsg)
    return
  }
  // verificar que el ID tenga el formato correcto
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const errMsg = "Invalid ID format."
    res.status(400).json({
      success: false,
      message: errMsg
    })
    console.error(errMsg)
    return
  }
  
  // valido que los datos tengan el formato del updateBookSchema con zod
  const parseResult = UpdateBookSchema.safeParse(req.body);
  if (!parseResult.success) {
    const errMsg = "Invalid input data"
    res.status(400).json({
      success: false,
      message: errMsg,
      error: parseResult.error
    });
    console.error(errMsg)
    return;
  }

  //si el formato es correcto almaceno en una variable los datos recibidos en el body
  const updateDataBook = parseResult.data

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updateDataBook, { new: true });
    if (!updatedBook) {
      const errMsg = `Book with ID ${id} not found.`
      res.status(404).json({
        success: false,
        message: errMsg,
      });
      console.error(errMsg)
      return;
    };

    res.status(200).json({
      success: true,
      message: "Book successfully updated",
      data: updatedBook
    });
    return
    
  } catch (error: unknown) {
    next(error)
  }
};

const deleteBook = async (req: Request<{ id: string }>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  // desestructurar id
  const { id } = req.params
  // verificar que el id exista
  if (!id) {
    const errMsg = "Book ID is required."
    res.status(400).json({
      success: false,
      message: errMsg
    });
    console.error(errMsg)
    return
  }
  // verificar que el ID tenga el formato correcto
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
      message: "Book successfully deleted.",
      data: deletedBook
    });
    
  } catch (error: unknown) {
    next(error)
  }
};

export { getBooks, addBook, updateBook, deleteBook }  