import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getRequest } from "../../services/bookServices"
import './writers.css'

const HomeWriters = () => {
  const [books, setBooks] = useState([])
  const [error, setError] = useState("")

  const getBooks = async () => { 
    try {
      const allBooks = await getRequest()
      if (Array.isArray(allBooks)) {
        const firstEightBooks = allBooks.slice(0, 9)
        setBooks(firstEightBooks)
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
    <section className="writers-section">
      <div className="writers-container">
        <div className="txt-writers-header-container">
          <p className="txt-writers">Escritorxs recomendados</p>
          <Link className="link-writers-top" to='/escritorxs'>Ver más escritorxs +</Link>
        </div>
        <div className="txt-writers-container">
          {books && books.map(book => (
            <div>
              <p className="txt-writers-container-authors" key={book.isbn}>{book.lastName} {book.firstName} <span className="txt-gender-container">{book.price}</span></p>
              <p className="txt-g-c-small">{book.price}</p>
            </div>
          ))
          }
        </div>
        <div className="ver-mas-writers">
        <Link className="link-writers" to='/escritorxs'>Ver más escritorxs +</Link>
        </div>
      </div>

    </section>

  )
 }

export { HomeWriters }