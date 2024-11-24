import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import CustomError from '../utils/CustomError';
import ApiResponse from '../utils/ApiResponse';
import ProjectModel from '../models/project.model';
import uploadOnCloudinary from '../utils/cloudinary';

export const createProject = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name } = req.body;

  if (!name) throw new CustomError('Name is required.', 400);

  const localeFilePath = req?.file?.path;
  const avatar = localeFilePath ? await uploadOnCloudinary(localeFilePath) : '';

  const project = await ProjectModel.create({
    name,
    organisationId: req.params.orgId,
    avatar,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, { project: project as object }));
});

export const getProjects = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { orgId } = req.params;
  const projects = await ProjectModel.find({ organisationId: orgId });
  return res.status(200).json(new ApiResponse(200, projects));
});

export const getProjectDetails = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { projectId } = req.params;
  const project = await ProjectModel.findById(projectId);
  if (!project) throw new CustomError('Project not found', 404);
  return res.status(200).json(new ApiResponse(200, project));
});
