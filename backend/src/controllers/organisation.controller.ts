import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import OrganisationModel from '../models/organisation.model';
import ApiResponse from '../utils/ApiResponse';
import uploadOnCloudinary from '../utils/cloudinary';
import MembershipModel from '../models/membership.model';

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
  });

  const newMembership = await MembershipModel.create({
    userId: req.userId,
    organisationId: org.id,
    role: 'admin',
  });

  return res.status(201).json(
    new ApiResponse(201, {
      organisation: org,
      membership: newMembership,
    })
  );
});

export const getOrganisations = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const memberships = await MembershipModel.find({ userId: req.userId });

  const organisationIds = memberships.map(
    (membership) => membership.organisationId
  );
  const organisations = await OrganisationModel.find({
    _id: { $in: organisationIds },
  });

  return res.status(200).json(new ApiResponse(200, { organisations }));
});
