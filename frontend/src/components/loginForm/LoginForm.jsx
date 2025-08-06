import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'
import { setLogRequest } from '../../services/loginServices';
import { toast } from "react-toastify";

const LoginForm = () => { 
  const { handleToken } = useAuth()
  
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    email: "",
    password:""
})

  
  const [error, setError] = useState("")

  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) { 
      setError("Debe ingresar todos los campos")
      //faltan validaciones
      return
    }
    
    try {
      const dataLogUser = {
        email: formData.email,
        password: formData.password
      }
      const loginResponse = await setLogRequest(dataLogUser)
      handleToken(loginResponse.token)
      if (loginResponse.data.role === "admin") {
        navigate("/dashboard")
      } else if (loginResponse.data.role === "user") {
        toast.success(`Usuario: ${loginResponse.data.email} logeado exitosamente`)
        navigate('/')
      } else {
        toast.error(`${loginResponse.message}`)
       }
      

      setFormData({email: "", password: ""})
    
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error(errMsg);
      setError("Contraseña o usuario incorrecto")
      setFormData({email: "", password: ""})
  }}
  
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
      <h1 className="form-title">Login</h1>
      <form onSubmit={handleSubmit} className="form-wrapper">
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
        <button type="submit" className="form-button">Aceptar</button>
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
export { LoginForm }