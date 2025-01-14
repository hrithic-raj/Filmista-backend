import { Document, ObjectId } from "mongoose";
import { Types } from 'mongoose';

interface IAdmin extends Document {
  // _id?: Types.ObjectId,
  name: string,
  email: string,
  password: string,
  googleId?: string,
  refreshToken?: string,
  role: string,
  isSuperAdmin?: boolean,
  profilePicture?: string,
}

export default IAdmin