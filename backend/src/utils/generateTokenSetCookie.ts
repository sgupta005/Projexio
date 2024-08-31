import { Response } from 'express';
import jwt from 'jsonwebtoken';

export default function generateTokenSetCookie(res: Response, id: any) {
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '1d',
  });
  return res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    maxAge: 86400000,
  });
}