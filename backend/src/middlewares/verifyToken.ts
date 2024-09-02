import { NextFunction, Request, Response } from 'express';
import CustomError from '../utils/CustomError';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies['auth_token'];
  if (!token) throw new CustomError('Unauthorized', 401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (err) {
    throw new CustomError('Unauthorized', 401);
  }
}
