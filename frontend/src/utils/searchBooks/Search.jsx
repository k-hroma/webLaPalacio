import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchicon from '../../assets/icons/lupa.svg';
import { getSearchTerm } from '../../services/bookServices';
import { useSearch } from '../../context/SearchContext';
import './search.css';

const Search = () => {
  const navigate = useNavigate();
  const { setResults, setSearchTerm } = useSearch();

  const [inputValue, setInputValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearchTerm = (e) => {
    setInputValue(e.target.value);
    setErrorMsg('');
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      setErrorMsg('La búsqueda no puede estar vacía.');
      setResults([]);
      return;
    }

    try {
      const resultFetch = await getSearchTerm(inputValue);

      if (!resultFetch.success) {
        setErrorMsg(resultFetch.message || 'Error en la búsqueda.');
        setResults([]);
        return;
      }

      const results = Array.isArray(resultFetch.data) ? resultFetch.data : [];

      if (results.length > 0) {
        setSearchTerm(inputValue);
        setResults(results);
        setInputValue('');
        setErrorMsg('');
        navigate('/resultados');
      } else {
        setResults([]);
        setErrorMsg(`No se encontraron resultados para "${inputValue}"`);
        setInputValue('');
      }
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : 'Error inesperado';
      console.error(errMsg);
      setErrorMsg(`Ocurrió un error al buscar: ${errMsg}`);
      setResults([]);
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          id="navSearch"
          name="navSearch"
          type="text"
          className="search-input"
          placeholder="Título, autorx, editorial, ISBN"
          value={inputValue}
          onChange={handleSearchTerm}
          aria-label="Buscar libro"
        />
        <button type="submit" className="icon-lupa">
          <img src={searchicon} alt="Icono de búsqueda" width="16" height="17" />
        </button>
      </form>

      {/* Mini ventana flotante de error */}
      {errorMsg && (
        <div className="search-toast">
          <span>{errorMsg}</span>
          <button className="toast-close" onClick={() => setErrorMsg('')}>
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export { Search };
