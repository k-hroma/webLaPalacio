// Importa el framework Express para crear el servidor HTTP y manejar rutas.
import express from 'express'

// Importa el middleware CORS para permitir solicitudes desde otros dominios/orígenes.
import cors from 'cors'

// Importa el middleware global de manejo de errores desde la carpeta de middlewares.
import { handleErrors } from './middleware/handleErrors'

// Importa el router de libros que define todas las rutas relacionadas con books.
import { bookRouter } from './routes/bookRoutes'

// Importa el router de autenticación que define rutas de login/register.
import { authRouter } from './routes/authRoutes'

// Importa el middleware de protección que verifica autenticación antes de permitir acceso a libros.
import { protectBooksRoutes } from './middleware/protectBooksRoutes'

// tipar el app explícitamente (aunque TS infiere bien):
import type { Application } from 'express'

// Instancia de Express para definir rutas, middlewares y manejar peticiones HTTP.
// Crea una nueva aplicación Express que será el núcleo del servidor.
const app: Application = express();

// Middleware para parsear automáticamente cuerpos JSON en las peticiones HTTP.
// Convierte el body de las requests con Content-Type: application/json en objetos JavaScript accesibles via req.body.
app.use(express.json())

// Middleware para permitir solicitudes CORS desde otros orígenes.
// Habilita que el frontend (en otro dominio/puerto) pueda hacer peticiones a esta API.
app.use(cors())

// Monta el router de libros con middleware de protección previa.
// Todas las rutas que empiecen con "/books" pasarán primero por protectBooksRoutes (verifica JWT/token),
// y luego por las rutas definidas en bookRouter.
app.use("/books", protectBooksRoutes, bookRouter)

// Monta el router de autenticación en la ruta base /auth.
// Todas las rutas internas se accederán con el prefijo /auth (ej: /auth/login, /auth/register).
app.use("/auth", authRouter)

// Middleware global de manejo de errores.
// Se ejecuta cuando alguna ruta lanza un error o llama a next(error).
// Debe ir al final, después de todos los routers, para capturar errores de toda la aplicación.
app.use(handleErrors)

// Exporto la instancia de Express para inicializar el servidor en server.ts.
// Permite que otros archivos (como server.ts) importen esta app configurada y la inicien con app.listen().
export { app }