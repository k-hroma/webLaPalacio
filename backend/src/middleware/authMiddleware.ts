import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { ErrorResult } from "../types/errorResult"
import { AuthPayload } from "../types/authPayload"

const authMiddleware = async (req: Request, res: Response<ErrorResult>, next: NextFunction): Promise<void> => {
  const header = req.headers.authorization
  
  if (!header || !header.startsWith("Bearer")) {
    const errMsg = "Authorization header missing."
    res.status(401).json({
      success: false,
      message: errMsg
    });
    console.error(errMsg)
    return
  }
 
  const token = header.split(" ")[1];
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) { 
    const errMsg = "Server misconfiguration: JWT secret not set."
    res.status(500).json({
      success: false,
      message: errMsg
    });
    console.error(errMsg)
    return
  }
  
  try {
    const decoded = jwt.verify(token, secretKey) as AuthPayload
    //jwt.verify lanza un error si el token es inválido o expirado, así que if (!decoded) es innecesario.
    req.user = decoded
    console.log(`${decoded}: Authentication successful`)
    next()

  } catch (error: unknown) {
    next(error)
  }
 }

export { authMiddleware }