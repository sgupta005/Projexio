import { NextFunction, Request, Response } from 'express';
import CustomError from '../utils/CustomError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/user.model';
import asyncHandler from '../utils/asyncHandler';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const verifyToken = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies['auth_token'];
  if (!token) throw new CustomError('Unauthorized', 401);
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  const user = await UserModel.findById((decoded as JwtPayload).userId);
  if (!user) throw new CustomError('Unauthorized', 401);
  req.userId = user!.id;
  return next();
});
