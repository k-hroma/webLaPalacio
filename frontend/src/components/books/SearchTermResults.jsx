
import { Link } from "react-router-dom";
import { ItemBook } from "../itemBook/ItemBook";
import { useSearch } from "../../context/SearchContext";

const SearchTermResults = () => {
  const { results } = useSearch();

  return (
    <section className="books-container">
      <div className="txt-all-books-container">
        <Link className="link-latest-books" to='/libros'>Libros</Link>
        <Link className="link-latest-books" to='/'>Volver</Link>
      </div>
      <div className="grid-container">
        {results.map((book, index) => (
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
        ))}
      </div>
    </section>
  )
}

export { SearchTermResults }