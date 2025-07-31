import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import CustomError from '../utils/CustomError';
import ApiResponse from '../utils/ApiResponse';
import ProjectModel from '../models/project.model';
import uploadOnCloudinary from '../utils/cloudinary';
import TaskModel from '../models/task.model';

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

export const getProjectAnalytics = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { projectId } = req.params;
  const { userId } = req;

  if (!projectId || !userId)
    throw new CustomError('Organisation Id or User Id not provided.', 400);

  // Calculate this week's date range (Monday to Sunday)
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(today);
  startOfWeek.setDate(
    today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1)
  );
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const totalTasks = await TaskModel.countDocuments({
    projectId: projectId,
  });
  const thisWeekTasks = await TaskModel.countDocuments({
    projectId: projectId,
    createdAt: { $gte: startOfWeek, $lte: endOfWeek },
  });

  const assignedTasks = await TaskModel.countDocuments({
    projectId: projectId,
    assigneeId: userId,
  });
  const thisWeekAssignedTasks = await TaskModel.countDocuments({
    projectId: projectId,
    assigneeId: userId,
    createdAt: { $gte: startOfWeek, $lte: endOfWeek },
  });

  const completedTasks = await TaskModel.countDocuments({
    projectId: projectId,
    status: 'DONE',
  });
  const thisWeekCompletedTasks = await TaskModel.countDocuments({
    projectId: projectId,
    status: 'DONE',
    updatedAt: { $gte: startOfWeek, $lte: endOfWeek },
  });

  const overdueTasks = await TaskModel.countDocuments({
    projectId: projectId,
    dueDate: { $lt: new Date() },
    status: { $ne: 'DONE' },
  });
  const thisWeekOverdueTasks = await TaskModel.countDocuments({
    projectId: projectId,
    dueDate: { $gte: startOfWeek, $lte: endOfWeek, $lt: new Date() },
    status: { $ne: 'DONE' },
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        totalTasks,
        thisWeekTasks,
        assignedTasks,
        thisWeekAssignedTasks,
        completedTasks,
        thisWeekCompletedTasks,
        thisWeekOverdueTasks,
        overdueTasks,
      },
      'Analytics fetched successfully.'
    )
  );
});

export const deleteProject = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { projectId } = req.params;
  if (!projectId) throw new CustomError('Project Id not provided.', 400);
  //find project and delete it
  const project = await ProjectModel.findByIdAndDelete(projectId);
  if (!project) throw new CustomError('Project not found', 404);
  //delete all tasks
  await TaskModel.deleteMany({ projectId: projectId });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Project deleted successfully'));
});

export const updateProject = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { projectId } = req.params;
  const { name } = req.body;

  if (!projectId) throw new CustomError('Project Id not provided.', 400);
  if (!name) throw new CustomError('Name is required.', 400);

  const localeFilePath = req?.file?.path;
  const avatar = localeFilePath
    ? await uploadOnCloudinary(localeFilePath)
    : undefined;

  const updateData: any = { name };
  if (avatar) updateData.avatar = avatar;

  const project = await ProjectModel.findByIdAndUpdate(projectId, updateData, {
    new: true,
  });

  if (!project) throw new CustomError('Project not found', 404);

  return res
    .status(200)
    .json(new ApiResponse(200, { project }, 'Project updated successfully'));
});
