import express from 'express'
import cors from 'cors'
import { handleErrors } from './middleware/handleErrors'
import { bookRouter } from './routes/bookRoutes'

// creo una instancia de express -> sirve para definir rutas, middlewares y manejar las peticiones HTTP
const app = express()

// permite que el servidor parsee autamiticamente el body de las peticiones HTTP con contenido JSON
app.use(express.json())

// permite que el backend pueda recibir peticiones desde dominios diferentes al mio
app.use(cors())

// ruta de la api
app.use("/books", bookRouter)

// middleware de manejo de errores
app.use(handleErrors)
// exporto la instancia de app para utilizarla en server.ts e inicializar el servidor
export { app }