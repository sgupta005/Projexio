import { Request, NextFunction, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { signupSchema } from '../schemas/signup.schema';
import UserModel, { User } from '../models/user.model';
import CustomError from '../utils/CustomError';
import ApiResponse from '../utils/ApiResponse';
import generateTokenSetCookie from '../utils/generateTokenSetCookie';
import { loginSchema } from '../schemas/login.schema';
import bcrypt from 'bcryptjs';
import { oauth2client } from '../utils/googleOAuthConfig';
import uploadOnCloudinary from '../utils/cloudinary';

export const signup = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password, firstName, lastName } = signupSchema.parse(req.body);

  const existingUserByEmail: User | null = await UserModel.findOne({
    email,
  });
  if (existingUserByEmail)
    throw new CustomError('An user with that email already exists', 400);

  const user = await UserModel.create({
    email,
    password,
    firstName,
    lastName,
  });

  generateTokenSetCookie(res, user._id);
  return res
    .status(201)
    .json(new ApiResponse(201, { id: user._id, email, firstName, lastName }));
});

export const login = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = loginSchema.parse(req.body);

  const user = await UserModel.findOne({ email });
  if (!user) throw new CustomError('No user was found with that email', 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new CustomError('Wrong Password', 400);

  generateTokenSetCookie(res, user._id);
  return res.status(200).json(new ApiResponse(200, { userID: user.id }));
});

export const getCurrentUser = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await UserModel.findById(req.userId).select(
    '-password -googleId'
  );
  return res.status(200).json(new ApiResponse(200, user as object));
});

export const logout = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.cookie('accessToken', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Logged out successfully'));
});

export const updateUser = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    throw new CustomError('First name, last name, and email are required', 400);
  }

  // Check if email is already taken by another user
  const existingUser = await UserModel.findOne({
    email,
    _id: { $ne: req.userId },
  });

  if (existingUser) {
    throw new CustomError('An user with that email already exists', 400);
  }

  const localeFilePath = req?.file?.path;
  const avatar = localeFilePath
    ? await uploadOnCloudinary(localeFilePath)
    : undefined;

  const updateData: any = { firstName, lastName, email };
  if (avatar) updateData.avatar = avatar;

  const user = await UserModel.findByIdAndUpdate(req.userId, updateData, {
    new: true,
  }).select('-password -googleId');

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, 'Profile updated successfully'));
});

type userResT = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};
export const googleAuth = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { code } = req.body;
  if (!code) throw new CustomError('No Google Code Provided', 400);

  const googleRes = await oauth2client.getToken(code);
  oauth2client.setCredentials(googleRes.tokens);
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
  );
  const userRes = (await response.json()) as userResT;
  const {
    email,
    given_name: firstName,
    family_name: lastName,
    id: googleId,
  } = userRes;

  let user = await UserModel.findOne({ email });
  if (!user) {
    user = await UserModel.create({
      email,
      firstName,
      lastName,
      googleId,
    });
  }
  generateTokenSetCookie(res, user._id);
  return res.status(200).json(new ApiResponse(200, { userId: user.id }));
});
