import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  isVerified: boolean;
  otp?: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;