import { getRequest } from "../../services/bookServices"
import { useEffect, useState} from "react"
import { ItemBook } from "../itemBook/ItemBook"
import { Link } from "react-router-dom"

import './books.css'

const AllBooks = () => {
  const [books, setBooks] = useState([])
  const [error, setError] = useState("")
  
  const getBooks = async () => { 
    try {
      const books = await getRequest()
      if (Array.isArray(books)) {
        setBooks(books)
      } else {
        throw new Error("ERR_CONNECTION_REFUSED")
      }

    } catch (error) {
      const errMsg =
      error instanceof Error ? error.message : "Unexpected error";
      console.error(errMsg);
      setError(errMsg)
    }
  }

  useEffect(() => { getBooks() }, [])
  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])
    

  return (
    <section className="books-container">
      <div className="txt-all-books-container">
        <h2 className="libros-section">Libros</h2>
        <Link className="link-latest-books" to='/'>Volver</Link>
      </div>
      <div className="grid-container">
        {books && books.map((book, index) => (
          <ItemBook
            key={book.isbn}
            index={index}
            itemSrc={book.img}
            itemAlt={book.title}
            title={book.title}
            lastName={book.lastName}
            firstName={book.firstName}
            price={book.price}
            />
        ))
        }
      </div>

    </section>
  )
}

export { AllBooks }