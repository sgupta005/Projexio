import { Request, NextFunction, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { signupSchema } from '../schemas/signup.schema';
import UserModel, { User } from '../models/user.model';
import CustomError from '../utils/CustomError';
import ApiResponse from '../utils/ApiResponse';
import generateTokenSetCookie from '../utils/generateTokenSetCookie';
import { loginSchema } from '../schemas/login.schema';
import bcrypt from 'bcryptjs';

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

  const user = new UserModel({
    email,
    password,
    firstName,
    lastName,
  });
  user.save();
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
