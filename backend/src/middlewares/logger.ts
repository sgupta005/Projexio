import { Request, NextFunction, Response } from 'express';

export default function logger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );
  next();
}
