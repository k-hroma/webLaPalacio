import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { setRequestRegisterUser } from '../../services/registerUserService'
import './registerForm.css'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password:""
  })

  const navigate = useNavigate(); 
  
  const [error, setError] = useState("")
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.password) {
      setError("Debe ingresar todos los campos")
      //FALTAN LAS VALIDACIONES
      return
    }

    try {
      const dataUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      }

      const registerUser = await setRequestRegisterUser(dataUser)
      if (registerUser.success) {
        alert(registerUser.message)
        setFormData({
          name: '',
          email: '',
          password: ''
        })
        navigate("/")
      } else { 
        throw new Error(registerUser.message)
      }
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
  
  const handleVisibilityPass = () => {
    setShowPass(!showPass)
  }
  
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]:value
    })
  }
  
  return (
    <section className="register-form-container">
      <h1 className="form-title">Nueva cuenta</h1>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <label htmlFor='name' className="form-label">
          Nombre 
          <input type="text" name="name" id='name' className="form-input" required value={formData.name} onChange={handleChange} />
        </label>
        <label htmlFor='email' className="form-label">
          Email
          <input type="email" name="email" id='email' className="form-input" required value={formData.email} onChange={handleChange} />
        </label>
        <label htmlFor='password' className="form-label">
          Contraseña
          <div>
          <input type={showPass ? "text": "password" } name="password" id='password' className="form-input" required value={formData.password} onChange={handleChange} />
          <button className='see-button' type='button' onClick={handleVisibilityPass}>ver</button>
          </div>
        </label>
        <button type="submit" className="form-button">Registrarse</button>
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
    </section>
  )
}

export { RegisterForm }