import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import { SearchProvider } from './context/SearchContext'
import { RouterApp } from './routers/RouterApp'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import './styles/fonts.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>
    <AuthProvider>
      <RouterApp />
      <ToastContainer/>
    </AuthProvider>
    </SearchProvider>
  </StrictMode>,
)
