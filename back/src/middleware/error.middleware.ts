import { NextFunction, Request, Response } from 'express';
import  ApiError from '../exceptions/api.error';

function errorMiddleware(error: any, request: Request, response: Response, next: NextFunction) {
  if (!(error instanceof ApiError)) {
    error = ApiError.Internal(String(error))
  }
  const status = error.status
  const message = error.message
  response
    .status(status)
    .json({
      message,
    })
}

export default errorMiddleware;