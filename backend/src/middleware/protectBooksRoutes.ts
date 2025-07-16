import { Request, Response, NextFunction } from "express"
import { authMiddleware } from "./authMiddleware"
import { isAdmin } from "./isAdmin"

// Middleware que protege ciertas rutas según el método HTTP
const protectBooksRoutes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const protectedMethods = ["POST", "PATCH", "DELETE"]

  // Si el método requiere protección, aplico autenticación y verificación de rol admin
  if (protectedMethods.includes(req.method)) {
    try {
      await authMiddleware(req, res, async (authErr) => {
        if (authErr) return next(authErr)
        return isAdmin(req, res, next)
      })
    } catch (error) {
      next(error)
    }
  } else {
    // Métodos no protegidos (GET, etc.) continúan sin validación
    next()
  }
}
export { protectBooksRoutes }
