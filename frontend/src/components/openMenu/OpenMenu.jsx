import { Link } from 'react-router-dom'
import closenavicon from '../../assets/icons/icono menu abierto.svg'
import './openMenu.css'

const OpenMenu = ({ onClose }) => { 
  
  return (
    <section className="open-nav-menu-container">
      <div className='links-container'>
        <button className='close-button' type='button' onClick={onClose}><img src={closenavicon} alt="clos-nav-icon" width='28px' height='18px' /></button>
        <div className="menu-links-wrapper">  
          <Link className='menu-link' to='/libros' onClick={onClose}>Libros</Link>
          <div className='sub-menu-container'>
          <Link className='sub-menu-link' to='/novedades' onClick={onClose}>Novedades</Link>
          <Link className='sub-menu-link' to='/usados' onClick={onClose}>Usados</Link>
          <Link className='sub-menu-link' to='/fanzines' onClick={onClose}>Fanzines</Link>  
          </div>
          <Link className='menu-link' to='/escritorxs' onClick={onClose}>Escritorxs</Link>
          <Link className='menu-link' to='/nosotrxs' onClick={onClose}>Nosotrxs</Link>
          <Link className='menu-link' to='/contacto' onClick={onClose}>Contacto</Link>
        </div>  
      </div>
    </section>
  )
}

export {OpenMenu}