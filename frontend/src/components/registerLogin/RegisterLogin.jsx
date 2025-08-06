import { Link } from 'react-router-dom'
import closereglog from '../../assets/icons/icono menu abierto.svg'
import './registerLogin.css'

const RegisterLogin = ({ onClose }) => {
  return (
    <section className="open-register-login-container">
      <div className="menu-links-wrapper">
        <button onClick={onClose} className='close-button' type='button'>
          <img src={closereglog} alt="clos-nav-icon" width='28px' height='18px' />
        </button>
        <Link className='register-login-link' to='/login' onClick={onClose}>Login</Link>
        <Link className='register-login-link' to='/register' onClick={onClose}>Register</Link>
      </div>
    </section>
  )
}

export { RegisterLogin }
