import { Document, ObjectId } from "mongoose";

// interface Icelebrity {
//   _id?: ObjectId,
//   name: string,
//   email: string,
//   userId: ObjectId,
// }
interface Icelebrity extends Document{
  // _id?: ObjectId,
  name: string,
  email: string,
  password: string,
  googleId?: string,
  otp?: string,
  refreshToken?: string,
  bio?: string;
  role: string,
  profilePicture?: string,
  isBlocked?:boolean,
}

export default Icelebrity