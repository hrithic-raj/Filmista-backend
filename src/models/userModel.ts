import mongoose, { Document, Schema, ObjectId} from 'mongoose';
import IUser from '../interfaces/userInterface';

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String , unique: true},
    profilePicture: { type: String},
    otp: { type: String },
    refreshToken: { type: String },
    role: {type: String, default: 'user'}
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;