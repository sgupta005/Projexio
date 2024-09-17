import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import OrganisationModel from '../models/organisation.model';
import ApiResponse from '../utils/ApiResponse';
import UserModel from '../models/user.model';
import CustomError from '../utils/CustomError';
import uploadOnCloudinary from '../utils/cloudinary';

export const createOrganisation = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name } = req.body;

  const localeFilePath = req?.file?.path;
  const avatar = localeFilePath ? await uploadOnCloudinary(localeFilePath) : '';

  const org = await OrganisationModel.create({
    name,
    avatar,
    admin: req.userId,
  });

  const user = await UserModel.findByIdAndUpdate(
    req.userId,
    { $push: { organisations: org._id } },
    { new: true } // Return the updated user document
  );

  return res
    .status(201)
    .json(new ApiResponse(201, { name, avatar, admin: req.userId }));
});

export const getOrganisations = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await UserModel.findById(req.userId).populate('organisations');
  if (!user) throw new CustomError('User not found', 400);
  return res
    .status(200)
    .json(new ApiResponse(200, { organisations: user.organisations }));
});
