import { Request, Response, NextFunction } from "express";
import { authMiddleware } from "./authMiddleware";
import { isAdmin } from "./isAdmin";

// Este middleware decide si la ruta necesita protección según el método
const protectBooksRoutes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const protectedMethods = ["POST", "PATCH", "DELETE"];

  if (protectedMethods.includes(req.method)) {
    try {
      await authMiddleware(req, res, async (authErr) => {
        if (authErr) return next(authErr);
        return isAdmin(req, res, next);
      });
    } catch (error) {
      next(error);
    }
  } else {
    next(); 
  }
};

export {protectBooksRoutes }