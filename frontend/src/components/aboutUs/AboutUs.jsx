import { Link } from 'react-router-dom'
import './aboutUs.css'
const AboutUs = () => { 
  return (
    <section className="about-us-container">
      <div className="bg-img-container">
      <div className='about-us-txt-container'>
          <p>somos una librería virtual, marika y lesbiana</p>
          <p>vendemos libros y fanzines</p>
          <p className='contactanos'>contactanos:</p>
          <p className='contacto'>@lapalaciolibros</p>
          <p className='contacto'>lapalaciolibros@gmail.<span className='contact-dot-com'>com</span></p>
          <p className='contact-com'>com</p>
          <Link className='link-about-us' to='/nosotrxs'>ver más de nosotrxs +</Link>
      </div>
      </div>
    </section>
  )
}
export { AboutUs }