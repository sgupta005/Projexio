import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import OrganisationModel from '../models/organisation.model';
import ApiResponse from '../utils/ApiResponse';
import uploadOnCloudinary from '../utils/cloudinary';
import MembershipModel from '../models/membership.model';
import { generateInviteCode } from '../utils/helper';
import CustomError from '../utils/CustomError';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const createOrganisation = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name } = req.body;
  if (!name) throw new CustomError('Name is required.', 400);

  const localeFilePath = req?.file?.path;
  const avatar = localeFilePath ? await uploadOnCloudinary(localeFilePath) : '';

  const inviteCode = generateInviteCode(4);

  const org = await OrganisationModel.create({
    name,
    avatar,
    inviteCode,
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

export const joinOrganisation = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  //get invite code and userId from req
  console.log(req.body);
  const { inviteCode } = req.body;
  if (!inviteCode) throw new CustomError('Invite Code is required.', 400);
  //find organisationId from inviteCode
  const org = await OrganisationModel.findOne({
    inviteCode,
  });
  if (!org) throw new CustomError('Invalid invite code.', 400);
  //check if a membership already exists between the user and the organisation
  const existingMembership = await MembershipModel.findOne({
    userId: req.userId,
    organisationId: org._id,
  });
  if (existingMembership)
    throw new CustomError('You have already joined this organisation', 400);
  //create a membership using the orgId and userId and set role to member
  const membership = await MembershipModel.create({
    userId: req.userId,
    organisationId: org._id,
    role: 'member',
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { organisation: org, membership },
        'Joined Successfully.'
      )
    );
});
