import { Request, Response, NextFunction } from "express"
import { ErrorResult } from "../types/errorResult"

const handleErrors = async (error: unknown, req: Request, res: Response<ErrorResult>, next: NextFunction): Promise<void> => {
  const errMsg = error instanceof Error ? error.message : "Unknown error"
  const errCode = (error as any).statusCode || 500

  res.status(errCode).json({ 
    success: false,
    message: errMsg, 
    errorCode:errCode
  })
  return
 }

export { handleErrors }



// ---------------------------------------------version sugerida de chatGPT---------------------------------------------------------------
// import { Request, Response, NextFunction } from "express";
// import { ZodError } from "zod";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import { ErrorResult } from "../types/errorResult";

// const handleErrors = async (
//   error: unknown,
//   req: Request,
//   res: Response<ErrorResult>,
//   next: NextFunction
// ): Promise<void> => {
//   // Fallback por defecto
//   let statusCode = 500;
//   let message = "Internal Server Error";
//   let errorDetails: any = undefined;

//   // 1. Zod validation error
//   if (error instanceof ZodError) {
//     statusCode = 400;
//     message = "Validation failed.";
//     errorDetails = error.format();
//   }

//   // 2. Mongoose: ID inválido
//   else if (error instanceof mongoose.Error.CastError) {
//     statusCode = 400;
//     message = `Invalid value for field "${error.path}"`;
//   }

//   // 3. Mongoose: error de validación
//   else if (error instanceof mongoose.Error.ValidationError) {
//     statusCode = 400;
//     message = "Mongoose validation error";
//     errorDetails = Object.values(error.errors).map((e) => e.message);
//   }

//   // 4. Error de JWT (token inválido, expirado, etc.)
//   else if (error instanceof jwt.JsonWebTokenError) {
//     statusCode = 401;
//     message = "Invalid token";
//   } else if (error instanceof jwt.TokenExpiredError) {
//     statusCode = 401;
//     message = "Token expired";
//   }

//   // 5. Otros errores personalizados con .statusCode
//   else if (error instanceof Error) {
//     message = error.message;
//     statusCode = (error as any).statusCode || 500;
//   }

//   // 6. Error desconocido (no instanceof Error)
//   else {
//     message = "Unknown error";
//   }

//   res.status(statusCode).json({
//     success: false,
//     message,
//     errorCode: statusCode,
//     ...(errorDetails && { error: errorDetails }),
//   });
// };

// export { handleErrors };
