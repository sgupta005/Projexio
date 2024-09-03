import { NextFunction, Request, Response } from 'express';
import CustomError from '../utils/CustomError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/user.model';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export default async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies['auth_token'];
  if (!token) next(new CustomError('Unauthorized', 401));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    const user = await UserModel.findById((decoded as JwtPayload).userId);
    if (!user) next(new CustomError('Unauthorized', 401));
    req.userId = user!.id;
    next();
  } catch (err) {
    next(new CustomError('Unauthorized', 401));
  }
}
