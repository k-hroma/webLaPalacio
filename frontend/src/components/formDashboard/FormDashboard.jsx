import './formDashboard.css'
import searchIcon from '../../assets/icons/lupa.svg'
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const FormDashboard = () => {
  const { handleLogOut } = useAuth()
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    img: "",
    isbn: "",
    title: "",
    lastName: "",
    firstName: "",
    editorial: "",
    price: 0,
    stock: 0,
    latestBook:false
  })

  const handleSubmit = (e) => { 
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

      console.log(newBook)

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
      setError(""); // Limpiar error si todo salió bien

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
  
  const handleClick = () => { 
    handleLogOut()
    navigate("/");
  }

  return (
    <div className="dashboard-container">
      <div>
        <button type='button' onClick={handleClick} className="logout-button">Cerrar sesión</button>
        <h2 className="dashboard-title">Ingreso de Libros</h2>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar libro por título, autor o ISBN"
          className="search-input-dash"
        />
        <button className="search-button-dash">
          <img src={searchIcon} alt="Buscar" className="search-icon" />
        </button>
      </div>

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

        {/* Precio y Stock en la misma fila */}
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
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn add">Ingresar</button>
          <button type="button" className="btn update">Modificar</button>
          <button type="button" className="btn delete">Eliminar</button>
        <div className="form-group checkbox-group">
            <input type="checkbox" id="latestBook" name="latestBook" checked={formData.latestBook} onChange={handleChange} />
            <label htmlFor="latestBook">Novedad</label>
          </div>
        </div>
      </form>
      {/* Mini ventana flotante de error */}
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
