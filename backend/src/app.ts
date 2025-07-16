import express from 'express'
import cors from 'cors'
import { handleErrors } from './middleware/handleErrors'
import { bookRouter } from './routes/bookRoutes'
import { authRouter } from './routes/authRoutes'
import { protectBooksRoutes } from './middleware/protectBooksRoutes'

// creo una instancia de express -> sirve para definir rutas, middlewares y manejar las peticiones HTTP
const app = express()

// permite que el servidor parsee automáticamente el body de las peticiones HTTP con contenido JSON
app.use(express.json())

// permite que el backend pueda recibir peticiones desde dominios diferentes al mio
app.use(cors())

// Monta el router bookRouter con un middleware condicional
app.use("/books", protectBooksRoutes, bookRouter)

//Monta el router authRouter en la ruta base /auth->
//Eso significa que todas las rutas definidas dentro de authRouter se accederán con prefijo /auth.
app.use("/auth", authRouter)

// middleware de manejo de errores
app.use(handleErrors)
// exporto la instancia de app para utilizarla en server.ts e inicializar el servidor
export { app }