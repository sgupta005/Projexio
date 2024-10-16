import mongoose, { model, Schema } from 'mongoose';
import { User } from './user.model';
import { Organisation } from './organisation.model';

export interface Membership {
  userId: User['_id'];
  organisationId: Organisation['_id'];
  role: 'Admin' | 'Member';
}

export const MembershipSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    organisationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organisation',
      required: true,
    },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

const MembershipModel = model<Membership>('Membership', MembershipSchema);
export default MembershipModel;
