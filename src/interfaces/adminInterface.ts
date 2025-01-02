import { ObjectId } from "mongoose";

interface IAdmin {
  _id?: ObjectId,
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