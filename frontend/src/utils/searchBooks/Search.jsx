import { useState, useEffect } from 'react'
import searchicon from '../../assets/icons/lupa.svg'
import { getSearchTerm } from '../../services/bookServices'
import './search.css'

const Search = () => { 

  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value)
  }
  
  const handleSearchSubmit = async (e) => { 
    e.preventDefault()
    try {
      const resultFetch = await getSearchTerm(searchTerm)
      const resultsSearch = resultFetch.data 

      if (Array.isArray(resultsSearch)) {
        // los resultados se rendericen en SearchTermResults
       }
      else {
        throw new Error(resultFetch.message)
       }
    } catch (error) {
      const errMsg =
      error instanceof Error ? error.message : "Unexpected error";
      console.error(errMsg);
    }
  }
  
  return (
    <div className="search-container">
      <form className='search-form' onSubmit={handleSearchSubmit}>
        <input
          id='navSearch'
          name='navSearch'
          type="text"
          className="search-input"
          placeholder="Título, autorx, editorial, ISBN"
          value={searchTerm}
          onChange={handleSearchTerm}
        />
        <button type="submit" className="icon-lupa">
          <img src={ searchicon } alt="searchicon" width='16px' height='17px' />
        </button>
      </form>

    </div>
  )
}

export { Search }