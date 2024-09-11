import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Organisation } from './organisation.model';
import CustomError from '../utils/CustomError';

export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  googleId?: string;
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
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
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
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  next();
});

UserSchema.pre('save', function (next) {
  if (!this.googleId && !this.password) {
    next(
      new CustomError('Password is required unless using Google login', 400)
    );
  } else {
    next();
  }
});

const UserModel = mongoose.model<User>('User', UserSchema);
export default UserModel;
