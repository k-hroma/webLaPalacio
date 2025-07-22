import { getRequest } from "../../services/bookServices"
import { useEffect, useState } from "react"
import { ItemBook } from "../itemBook/ItemBook"
import { Link } from "react-router-dom"
import './books.css'

const AllLatestBooks = () => {
  const [books, setBooks] = useState([])
  const [error, setError] = useState("")
  
  const getBooks = async () => { 
    try {
      const allLatestbooks = await getRequest()
      if (Array.isArray(allLatestbooks)) {
        setBooks(allLatestbooks)
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
      <div className="txt-alllatestbooks-container">
        <h2 className="novedades-section">Novedades</h2>
        <Link className="link-latest-books" to='/'>Volver</Link>
      </div>
      <div className="grid-container">
        {books && books.map((book, index) => (
          book.latestBook ?
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
            : null
        ))
        }
      </div>
    </section>
  )
}

export { AllLatestBooks }