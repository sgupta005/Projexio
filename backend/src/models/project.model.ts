import { model, Schema } from 'mongoose';

export interface Project {
  organisationId: string;
  name: string;
  avatar: string;
}

export const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    organisationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organisation',
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProjectModel = model<Project>('Project', ProjectSchema);
export default ProjectModel;
