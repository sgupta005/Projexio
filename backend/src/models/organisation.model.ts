import { model, Schema } from 'mongoose';

export interface Organisation {
  _id: string;
  name: string;
  avatar: string;
  inviteCode: string;
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
    inviteCode: {
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
