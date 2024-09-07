import mongoose, { model, Schema } from 'mongoose';
import { User } from './user.model';

export interface Organisation {
  _id: string;
  name: string;
  admin: User['_id'];
}

export const OrganisationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const OrganisationModel = model<Organisation>(
  'Organisation',
  OrganisationSchema
);
export default OrganisationModel;
