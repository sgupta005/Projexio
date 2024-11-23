import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../utils/asyncHandler';
import CustomError from '../utils/CustomError';
import MembershipModel from '../models/membership.model';

export const verifyMember = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const membership = await MembershipModel.findOne({
    userId: req.userId,
    organisationId: req.params.orgId,
  });
  if (!membership)
    throw new CustomError('You are not a member of this organisation.', 401);
  next();
});
