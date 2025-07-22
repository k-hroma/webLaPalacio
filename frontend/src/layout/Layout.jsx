import { Footer } from '../components/footer/Footer'
import { NavBar } from '../components/navBar/NavBar'
const Layout = ({ children }) => { 
  return (
    <>
      <div>
        <header>
          <NavBar/>
        </header>
        <main>
          { children }
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  )
}

export { Layout }