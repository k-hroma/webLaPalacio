import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { ErrorResult } from "../types/errorResult"
import { AuthPayload } from "../types/authPayload"

// Middleware de autenticación: verifica el token JWT y añade los datos decodificados al objeto req
const authMiddleware = async (req: Request, res: Response<ErrorResult>, next: NextFunction): Promise<void> => {
  const header = req.headers.authorization
  
  // Verifico que exista el header de autorización y que comience con 'Bearer'
  if (!header || !header.startsWith("Bearer")) {
    const errMsg = "Authorization header missing."
    res.status(401).json({
      success: false,
      message: errMsg
    })
    console.error(errMsg)
    return
  }

  const token = header.split(" ")[1]
  const secretKey = process.env.JWT_SECRET

  // Verifico que la clave secreta esté definida en las variables de entorno
  if (!secretKey) {
    const errMsg = "Server misconfiguration: JWT secret not set."
    res.status(500).json({
      success: false,
      message: errMsg
    })
    console.error(errMsg)
    return
  }

  try {
    // Verifico y decodifico el token JWT
    // jwt.verify lanza un error si el token es inválido o ha expirado, por lo que no es necesario verificar si 'decoded' es falso
    const decoded = jwt.verify(token, secretKey) as AuthPayload
    req.user = decoded
    next()
  } catch (error: unknown) {
    // Paso el error al middleware de manejo de errores
    next(error)
  }
}

export { authMiddleware }
