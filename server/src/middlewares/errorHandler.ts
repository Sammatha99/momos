import { Request, Response, NextFunction } from 'express'
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class HttpError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    
    this.statusCode = statusCode
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}

export function errorHandler(
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err instanceof HttpError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR
  const message = err.message || getReasonPhrase(status)

  res.status(status).json({
    success: false,
    error: message,
  })
}