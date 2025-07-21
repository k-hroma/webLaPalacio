import './header.css'
import animatednav from '../../assets/img/animation-header.png'
import menuicon from '../../assets/icons/menu cerrado.svg'
import lpicon from '../../assets/icons/lp-icon.svg'
import lineicon from '../../assets/icons/Line nav-search.svg'
import { UserAuth } from '../../utils/userAuth/UserAuth'
import { Search } from '../../utils/searchBooks/Search'
const Header = () => { 
  return (
      <section className='header-container'>
        <div className="header-bg-img-container">

        </div>
        <div className='animate-nav'>
          <img className='animated-nav-img' src={animatednav} alt="animated-nav" />
          <img className='animated-nav-img' src={animatednav} alt="animated-nav" />
        </div>
        <div className='nav-bar-container'>
          <div className='left-nav'>
            <img src={ menuicon } alt="menu-icon" width='22px' height='15px' />
          </div>
          <div className='center-nav'>
            <img src={ lpicon } alt="lp-icon" width='51px' height='56px' />
          </div>
          <div className='right-nav'>
            <UserAuth/>
            <img src={lineicon} alt="lineicon" height='25px' />
            <Search />
          </div>
        </div>
      </section>
  )
}

export {Header} 