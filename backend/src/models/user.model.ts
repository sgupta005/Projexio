import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Organisation } from './organisation.model';

export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organisations: [Organisation['_id']];
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    organisations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organisation',
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const UserModel = mongoose.model<User>('User', UserSchema);
export default UserModel;
