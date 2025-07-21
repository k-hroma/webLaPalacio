import searchicon from '../../assets/icons/lupa.svg'
import './search.css'
const Search = () => { 
  return (
    <div className="search-container">
      <form className='search-form'>
        <input
          id='navSearch'
          name='navSearch'
          type="text"
          className="search-input"
          placeholder="Título, autorx, editorial, ISBN"
          value=''
        />
        <button type="submit" className="icon-lupa">
          <img src={ searchicon } alt="searchicon" width='16px' height='17px' />
        </button>
      </form>

    </div>
  )
}

export { Search }