import usericon from '../../assets/icons/user.svg'
import './userAuth.css'
const UserAuth = () => { 
  return (
    <section>
      <button className='icon-user'>
        <img  src={usericon} alt="usericon" width='25px' height='25px' />
      </button>
    </section>
  )
}

export { UserAuth }