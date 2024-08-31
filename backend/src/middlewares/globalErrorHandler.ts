import { Response, NextFunction, Request } from 'express';
import CustomError from '../utils/CustomError';

export default function globalErrorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV == 'development' ? err.stack : '',
  });
}
