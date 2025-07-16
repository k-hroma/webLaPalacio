import { Request, Response, NextFunction } from "express";
import { ErrorResult } from "../types/errorResult";

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
    console.log("Acceso autorizado")
    next();
  } catch (error: unknown) {
    console.error("[UNEXPECTED ERROR - isAdmin]", error);
    next(error);
  }
};

export { isAdmin }