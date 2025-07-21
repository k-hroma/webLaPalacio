import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
const Layout = ({ children }) => { 
  return (
    <>
      <div>
        <header>
          <Header/>
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