import mongoose, { Document, Schema, ObjectId} from 'mongoose';
import IUser from '../interfaces/userInterface';

// export type IUserDocument = IUser & Document;

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    profilePicture: { type: String},
    otp: { type: String },
    refreshToken: { type: String },
    role: {type: String, default: 'user'},
    isBlocked: { type: Boolean, default: false},
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    languages: [{ type: Schema.Types.ObjectId, ref: 'Language' }]
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;