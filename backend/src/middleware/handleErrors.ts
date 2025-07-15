import { Request, Response, NextFunction } from "express"
import { ErrorResult } from "../types/errorResult"

const handleErrors = async (error: unknown, req: Request, res: Response<ErrorResult>, next: NextFunction): Promise<void> => {
  const errMsg = error instanceof Error ? error.message : "Unknown error"
  const errCode = (error as any).code || 500

  res.status(500).json({ 
    success: false,
    message: errMsg, 
    errorCode:errCode
  })
  return
 }

export { handleErrors }