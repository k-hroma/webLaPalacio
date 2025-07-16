import express from 'express'
import cors from 'cors'
import { handleErrors } from './middleware/handleErrors'
import { bookRouter } from './routes/bookRoutes'
import { authRouter } from './routes/authRoutes'
import { protectBooksRoutes } from './middleware/protectBooksRoutes'

// Instancia de Express para definir rutas, middlewares y manejar peticiones HTTP
const app = express()

// Middleware para parsear automáticamente cuerpos JSON en las peticiones HTTP
app.use(express.json())

// Middleware para permitir solicitudes CORS desde otros orígenes
app.use(cors())

// Monta el router de libros con middleware de protección previa
app.use("/books", protectBooksRoutes, bookRouter)

// Monta el router de autenticación en la ruta base /auth
// Todas las rutas internas se accederán con el prefijo /auth
app.use("/auth", authRouter)

// Middleware global de manejo de errores
app.use(handleErrors)

// Exporto la instancia de Express para inicializar el servidor en server.ts
export { app }
