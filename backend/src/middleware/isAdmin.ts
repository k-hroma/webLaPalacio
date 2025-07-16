import { Request, Response, NextFunction } from "express";
import { ErrorResult } from "../types/errorResult";

// Middleware que permite el acceso solo a usuarios con rol "admin"
const isAdmin = async (req: Request, res: Response<ErrorResult>, next: NextFunction): Promise<void> => {
  try {
    if (req.user?.role !== "admin") {
      const errMsg = "Access denied: admin privileges required.";
      res.status(403).json({
        success: false,
        message: errMsg
      });
      console.error(`[AUTHORIZATION ERROR] ${errMsg}`);
      return;
    }
    // El usuario tiene rol admin, continúa con la ejecución
    next();
  } catch (error: unknown) {
    // Manejo de errores inesperados
    console.error("[UNEXPECTED ERROR - isAdmin]", error);
    next(error);
  }
};

export { isAdmin }