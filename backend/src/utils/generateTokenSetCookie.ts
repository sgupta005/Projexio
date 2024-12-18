import { Response } from 'express';
import jwt from 'jsonwebtoken';

export default function generateTokenSetCookie(res: Response, id: any) {
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return res.cookie('auth_token', token, {
    httpOnly: true,
    secure: true,
    maxAge: 86400000,
    sameSite: 'none',
  });
}
