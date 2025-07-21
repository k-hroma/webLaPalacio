import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import { RouterApp } from './routers/RouterApp'

import './index.css'
import './styles/fonts.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterApp/>
    </AuthProvider>
  </StrictMode>,
)
