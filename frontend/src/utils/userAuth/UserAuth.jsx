import { useState } from 'react'
import usericon from '../../assets/icons/user.svg'
import { RegisterLogin } from '../../components/registerLogin/RegisterLogin'
import './userAuth.css'
const UserAuth = () => { 

  const [open, setOpen] = useState(false)
  
  const handleClick = () => {
    setOpen(true)
  }
  const handleonCloseUser = () => { 
    setOpen(false)
  }

  return (
    <section>
      {open === true ? <RegisterLogin onClose={handleonCloseUser}  /> :
        <button className='icon-user' onClick={handleClick}>
          <img src={usericon} alt="usericon" width='25px' height='25px' />
        </button>
      }
    </section>
  )
}

export { UserAuth }