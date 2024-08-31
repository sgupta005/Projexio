import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch((err) => {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ err });
      } else {
        next(err);
      }
    });
}

export default asyncHandler;
