import { model, Schema } from 'mongoose';

export interface Organisation {
  _id: string;
  name: string;
  avatar: string;
}

export const OrganisationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const OrganisationModel = model<Organisation>(
  'Organisation',
  OrganisationSchema
);
export default OrganisationModel;
