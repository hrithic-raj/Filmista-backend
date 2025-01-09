import { ObjectId } from "mongoose";

interface Icelebrity {
  _id?: ObjectId,
  name: string,
  email: string,
  password: string,
  googleId?: string,
  otp?: string,
  refreshToken?: string,
  isVerified: boolean;
  role: string,
  profilePicture?: string,
  isBlocked?:boolean,
}

export default Icelebrity