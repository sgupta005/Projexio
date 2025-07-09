import { model, Schema } from 'mongoose';

export interface Task {
  organisationId: string;
  name: string;
  projectId: string;
  assigneeId: string;
  dueDate: Date;
  description?: string;
  status: 'BACKLOG' | 'TODO' | 'IN_REVIEW' | 'IN_PROGRESS' | 'DONE';
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export const TaskSchema = new Schema(
  {
    organisationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organisation',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    assigneeId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ['BACKLOG', 'TODO', 'IN_REVIEW', 'IN_PROGRESS', 'DONE'],
    },
    position: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const TaskModel = model<Task>('Task', TaskSchema);
export default TaskModel;
