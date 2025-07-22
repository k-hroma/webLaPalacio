import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getRequest } from "../../services/bookServices"
import './writers.css'


const AllWriters = () => {
  const [books, setBooks] = useState([])
  const [error, setError] = useState("")

  const getBooks = async () => { 
    try {
      const allBooks = await getRequest()
      if (Array.isArray(allBooks)) {
        setBooks(allBooks)
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
            <Link className="link-writers" to='/'>Volver</Link>
          </div>
          <div className="txt-writers-container">
            {books && books.map(book => (
              <p key={book.isbn}>{book.lastName} <span>{book.firstName }</span></p>
            ))
            }
          </div>
        </div>
      </section>
  )
 }

export { AllWriters }