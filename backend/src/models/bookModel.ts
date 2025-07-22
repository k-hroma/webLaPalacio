import { model, Schema } from 'mongoose'
import { IBook } from '../types/bookInterface'

const bookSchema = new Schema<IBook>({
  img: { type: String, required: true, trim: true },
  isbn: { type: String, required: true, trim: true, unique:true },
  title: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  editorial: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  latestBook: {type: Boolean, default: false, required:true}
}, {
  versionKey: false,
  timestamps: true,
});

const Book = model<IBook>("Book", bookSchema)

export { Book }