import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import CustomError from '../utils/CustomError';
import ApiResponse from '../utils/ApiResponse';
import TaskModel from '../models/task.model';
import ProjectModel from '../models/project.model';
import UserModel from '../models/user.model';

export const createTask = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    organisationId,
    name,
    projectId,
    assigneeId,
    dueDate,
    description,
    status,
    position,
  } = req.body;

  if (
    !organisationId ||
    !name ||
    !projectId ||
    !assigneeId ||
    !dueDate ||
    !status ||
    position === undefined
  ) {
    throw new CustomError('All required fields must be provided.', 400);
  }

  const task = await TaskModel.create({
    organisationId,
    name,
    projectId,
    assigneeId,
    dueDate,
    description,
    status,
    position,
  });

  return res.status(201).json(new ApiResponse(201, task));
});

export const getTasks = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { projectId, orgId } = req.params;

  if (!projectId || !orgId) {
    throw new CustomError('Project ID and Organization ID are required', 400);
  }

  const tasks = await TaskModel.find({
    projectId,
    organisationId: orgId,
  })
    .populate([
      {
        path: 'assigneeId',
        model: UserModel,
        select: 'firstName lastName avatar',
      },
      {
        path: 'projectId',
        model: ProjectModel,
        select: 'name',
      },
    ])
    .sort({ position: 1 });

  const formattedTasks = tasks.map((task) => ({
    _id: task._id,
    name: task.name,
    projectName: (task.projectId as any).name,
    status: task.status,
    assignee: {
      _id: (task.assigneeId as any)._id,
      name: `${(task.assigneeId as any).firstName} ${
        (task.assigneeId as any).lastName
      }`,
      avatar: (task.assigneeId as any).avatar,
    },
    dueDate: task.dueDate,
  }));

  return res.status(200).json(new ApiResponse(200, formattedTasks));
});