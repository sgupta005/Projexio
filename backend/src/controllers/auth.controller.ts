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

export const verifyLogin = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(200).json({ userId: req.userId });
});

export const logout = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res
    .clearCookie('auth_token')
    .json(new ApiResponse(200, {}, 'User logged out successfully.'));
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
