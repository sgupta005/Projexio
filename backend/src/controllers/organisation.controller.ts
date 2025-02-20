import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import OrganisationModel from '../models/organisation.model';
import ApiResponse from '../utils/ApiResponse';
import uploadOnCloudinary from '../utils/cloudinary';
import MembershipModel, { Membership } from '../models/membership.model';
import { generateInviteCode } from '../utils/helper';
import CustomError from '../utils/CustomError';
import UserModel from '../models/user.model';

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

export const getOrganisationDetails = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { orgId } = req.params;
  const org = await OrganisationModel.findById(orgId);
  if (!org) throw new CustomError('Organisation not found', 404);
  return res.status(200).json(new ApiResponse(200, org));
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

export const getMembers = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  //get org id
  const organisationId = req.params.id;
  if (!organisationId)
    throw new CustomError('No organisation id provided.', 400);
  //find all memberships with that orgId
  const memberships = await MembershipModel.find({ organisationId });
  if (!memberships) throw new CustomError('Invalid organisationId.', 400);
  //get all users from the userIds of those memberships
  const members = await Promise.all(
    memberships.map(async (mem) => {
      const user = await UserModel.findById(mem.userId).select(
        '-googleId -password'
      );
      if (user) {
        return {
          ...user.toObject(), // Spread the user object
          role: mem.role, // Add the role from the membership
        };
      }
      return null; // Handle cases where the user might not exist
    })
  );
  if (!members) throw new CustomError('No members found', 400);

  return res
    .status(200)
    .json(new ApiResponse(200, members, 'Members fetched successfully.'));
});

export const removeMember = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  //get org id, memeber id
  const { orgId, memId } = req.params;
  //delete membership
  const result = await MembershipModel.deleteOne({
    userId: memId,
    organisationId: orgId,
  });
  if (result.deletedCount === 0) {
    throw new CustomError('Membership not found', 404);
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Member removed successfully'));
});

export const makeAdmin = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  //get org id, memeber id
  const { orgId, memId } = req.params;
  //find membership and set role to 'admin'
  const result = await MembershipModel.updateOne(
    { userId: memId, organisationId: orgId },
    { $set: { role: 'admin' } }
  );

  if (result.matchedCount === 0) {
    throw new CustomError('Membership not found', 404);
  }
  const membership = await MembershipModel.findOne({
    userId: memId,
    organisationId: orgId,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { membership },
        'Member promoted to admin successfully'
      )
    );
});
