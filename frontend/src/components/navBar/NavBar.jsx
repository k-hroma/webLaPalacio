import animatednav from '../../assets/img/animation-header.png'
import menuicon from '../../assets/icons/menu cerrado.svg'
import lpicon from '../../assets/icons/lp-icon.svg'
import lineicon from '../../assets/icons/Line nav-search.svg'
import { UserAuth } from '../../utils/userAuth/UserAuth'
import { Search } from '../../utils/searchBooks/Search'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {OpenMenu } from '../openMenu/OpenMenu'
import './navbar.css'

const NavBar = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const handleOpenNavMenu = () => { 
    setOpen(true)
  }
  
  const handleCloseNavMenu = () => { 
    setOpen(false)
  }

  const handleGoHome = () => {
    navigate("/")
  }
  
  return (
    <section className="all-navbar-container">
      <div className='animate-nav'>
        <img className='animated-nav-img' src={animatednav} alt="animated-nav" />
        <img className='animated-nav-img' src={animatednav} alt="animated-nav" />
      </div>
      <div className='nav-bar-container'>
        <div className='left-nav'>
          {open === true ? (
            <OpenMenu onClose={handleCloseNavMenu} />
          ) : (
            <button className='btn-home-menu' onClick={handleOpenNavMenu}>
              <img src={menuicon} alt="menu-icon" width='22px' height='15px' />
            </button>
          )}
        </div>
        <div className='center-nav'>
          <button className='btn-home-menu' onClick={handleGoHome}>
            <img src={ lpicon } alt="lp-icon" width='51px' height='56px' />
          </button>
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

export { NavBar }