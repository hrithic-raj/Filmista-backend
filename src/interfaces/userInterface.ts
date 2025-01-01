import { ObjectId } from "mongoose";

interface IUser {
  _id?: ObjectId,
  name: string,
  email: string,
  password: string,
  googleId?: string,
  otp?: string,
  refreshToken?: string;
}

export default IUser