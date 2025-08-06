import { createContext, useContext, useState } from 'react';

//crea el contexto global para manejar la búsqueda de libros 
const SearchContext = createContext();

//Te permite usar useSearch() en cualquier componente para acceder fácilmente al contexto (en lugar de escribir useContext(SearchContext) cada vez).
const useSearch = () => useContext(SearchContext);

//Define el componente proveedor del contexto (Provider).
//Recibe children, es decir, los componentes hijos que van a poder acceder al contexto.
const SearchProvider = ({ children }) => {
  //Crea el estado searchTerm con valor inicial vacío ('').
  //Guarda lo que escribe el usuario en el campo de búsqueda.
  const [searchTerm, setSearchTerm] = useState('');
  //Crea el estado results, que arranca como un array vacío ([]).
  //Guarda los resultados devueltos por la búsqueda 
  const [results, setResults] = useState([]);

  return (
    //Retorna el Provider del contexto.
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, results, setResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export {useSearch, SearchProvider }