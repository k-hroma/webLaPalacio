import './footer.css'
import { Links } from '../../utils/Links'

const Footer = () => { 
  return (
    <section className='footer-container'>
      <div className='bg-footer'></div>
      <div className='footer-content'>
        <div className='left-content'>
          <p className='footer-main-txt'>Libros:</p>
          <p className='footer-main-txt'>Usados</p>
          <p className='footer-main-txt'>Recomendados</p>
          <p className='footer-main-txt'>Novedaeds</p>
        </div>
        <div className='right-content'>
          <p className='footer-main-txt'>Escritorxs</p>
          <p className='footer-main-txt'>Nosotrxs</p>
          <p className='footer-main-txt'>Contacto</p>
          <p className='footer-main-txt'>-</p>
          <p className='footer-main-txt'>Tienda</p>
        </div>
        <div className='copy-texts'>
          <p className='cr-text'>@lapalaciolibros. Copyright - All rights reserved</p>
        </div>
        <div className='khroma-container'>
          <Links
          className='small-credits link-kroma'
          url="https://k-hroma.github.io/Portfolio/pages/index.html" text="desarrollo web: k-roma"
          newTag="true">
          </Links>
        </div>
        <div className='rofuks-container'>
          <Links
              className='small-credits'
              url="https://www.behance.net/rociofuks"
              text="diseño web: rofuks"
              newTag="true">    
          </Links>
        </div>
      </div>
    </section>
  )
}

export { Footer }