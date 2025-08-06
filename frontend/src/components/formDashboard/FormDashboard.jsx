import './formDashboard.css'
import searchIcon from '../../assets/icons/lupa.svg'
import { useState } from 'react';
import { getSearchTerm, postNewBook, deleteRequest } from '../../services/bookServices';
import { toast } from "react-toastify";
import { useSearch } from '../../context/SearchContext';
import { ItemBook } from '../itemBook/ItemBook';

const FormDashboard = () => {

  const [error, setError] = useState("")
  const { setResults, setSearchTerm, results } = useSearch();
  const [inputValue, setInputValue] = useState('');

  const [formData, setFormData] = useState({
    img: "",
    isbn: "",
    title: "",
    lastName: "",
    firstName: "",
    editorial: "",
    price: 0,
    stock: 0,
    latestBook: false
  })

  const handleSubmit = async (e) => { 
    e.preventDefault()
    const { img, isbn, title, lastName, firstName, editorial, price, stock, latestBook } = formData;

    if (
      !img.trim() ||
      !isbn.trim() ||
      !title.trim() ||
      !lastName.trim() ||
      !firstName.trim() ||
      !editorial.trim() ||
      isNaN(price) || price <= 0 ||
      isNaN(stock) || stock <= 0
    ) {
      setError("Todos los campos deben estar completos y el stock y el precio deben ser mayor a 0")
      return
    }
    
    try {
      const newBook = {
        img,
        isbn,
        title,
        lastName,
        firstName,
        editorial,
        price: Number(price),
        stock: Number(stock),
        latestBook
      }
      
      const addNewBook = await postNewBook(newBook)
      if (addNewBook.success) {
        toast.success(`${addNewBook.message}`)
      }
      if (!addNewBook.success) { 
        toast.error(`${addNewBook.message}`)
      }

      setFormData({
        img: "",
        isbn: "",
        title: "",
        lastName: "",
        firstName: "",
        editorial: "",
        price: 0,
        stock: 0,
        latestBook: false
      });
      setError(""); 

    } catch (error) {
      const errMsg =
      error instanceof Error ? error.message : "Unknown error";
      console.log(error)
      setError(errMsg)
      setFormData({
        name: '',
        email: '',
        password: ''
      })
      return {
        success: false,
        message: errMsg,
      };
    }
  }

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" 
        ? checked 
        : type === "number" 
        ? Number(value) 
        : value,
    });
  };

  const handleDashSearch = async (e) => { 
    e.preventDefault();

    if (inputValue.trim() === '') {
      setError('La búsqueda no puede estar vacía.');
      setResults([]);
      return;
    }

    try {
      const resultFetch = await getSearchTerm(inputValue);
      if (!resultFetch.success) {
        setError(resultFetch.message || 'Error en la búsqueda.');
        setResults([]);
        return;
      }
      const results = Array.isArray(resultFetch.data) ? resultFetch.data : [];
      if (results.length > 0) {
        setSearchTerm(inputValue);
        setResults(results);
        setInputValue('');
        setError('');
      } else {
        setResults([]);
        setError(`No se encontraron resultados para "${inputValue}"`);
        setInputValue('');
      }
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : 'Error inesperado';
      console.error(errMsg);
      setError(`Ocurrió un error al buscar: ${errMsg}`);
      setResults([]); 
    }
  }

  const handleSearchTerm = (e) => {
    setInputValue(e.target.value);
    setError('');
  };

  const handleDeleteBook = async (id) => { 
    const confirmed = confirm("Eliminar")
    if (!confirmed) return
    try {
      const resDelBook = await deleteRequest(id)
      
    } catch (error) {
      const errMsg =
      error instanceof Error ? error.message : "Unknown error";
      console.log(error)
      setError(errMsg)
      return {
        success: false,
        message: errMsg,
      };
    }
  }
  
  return (
    <div className="dashboard-container">
      <div className="title-cont">
        <h2 className="dashboard-title">Panel de Administración</h2>
      </div>

      <form action="submit" onSubmit={handleDashSearch}>
        <div className="search-container">
          <input
            id='dashSearch'
            name='dasSearch'
            type="text"
            className="search-input-dash"
            placeholder="Buscar libro por título, autor o ISBN"
            value={inputValue}
            onChange={handleSearchTerm}
          />
          <button type='submit' className="search-button-dash">
            <img src={searchIcon} alt="Buscar" className="search-icon" />
          </button>
        </div>
      </form>

      <form className="book-form" onSubmit={handleSubmit}>
        <div className="form-fields">
          <div className="form-group">
            <label htmlFor="img">URL de Imagen</label>
            <input type="text" id="img" name="img" placeholder="https://..." value={formData.img} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="isbn">ISBN</label>
            <input type="text" id="isbn" name="isbn" placeholder="9783161484100" value={formData.isbn} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input type="text" id="title" name="title" placeholder="Título del libro" value={formData.title} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Apellido del Autor</label>
            <input type="text" id="lastName" name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="firstName">Nombre del Autor</label>
            <input type="text" id="firstName" name="firstName" placeholder="Nombre" value={formData.firstName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="editorial">Editorial</label>
            <input type="text" id="editorial" name="editorial" placeholder="Editorial" value={formData.editorial} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="price">Precio</label>
              <input type="number" id="price" name="price" min="0" step="0.01" value={formData.price} onChange={handleChange} />
            </div>

            <div className="form-group half">
              <label htmlFor="stock">Stock</label>
              <input type="number" id="stock" name="stock" min="0" value={formData.stock} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row form-actions">
            <div className="form-group checkbox-group">
              <input type="checkbox" id="latestBook" name="latestBook" checked={formData.latestBook} onChange={handleChange} />
              <label htmlFor="latestBook">Novedad</label>
            </div>
            <button type="submit" className="btn add">Agregar</button>
          </div>
        </div>
      </form>

      <div className='dash-search-results'>
        {results && results.map((book, index) => (
          <div className='dash-results-container' key={book._id}>
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
            <div className='admin-buttons'>
              <button className="btn-update">Actualizar</button>
              <button type='button' onClick={() => handleDeleteBook(book._id)} className="btn-delete">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="error-toast">
          <span>{error}</span>
          <button className="error-close" onClick={() => setError('')}>
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export { FormDashboard };
