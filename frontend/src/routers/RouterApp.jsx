//import {BrowserRouter, Routes, Route } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../views/Home'
import { Novedades } from '../views/Novedades'
import { ScrollToTop } from '../utils/ScrollToTop'
import { Escritorxs } from '../views/Escritorxs'
import {Libros } from '../views/Libros'
import { ResultadosBusqueda } from '../views/ResultadosBusqueda'


const RouterApp = () => { 
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/novedades' element={<Novedades/>}/>
        <Route path='/escritorxs' element={<Escritorxs/>}/>
        <Route path='/libros' element={<Libros />} />
        <Route path='/resultados' element={<ResultadosBusqueda/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export { RouterApp }