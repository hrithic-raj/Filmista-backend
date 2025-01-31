import mongoose, { Document } from "mongoose";

export interface IRating extends Document {
  userId: mongoose.Types.ObjectId;
  movieId: mongoose.Types.ObjectId;
  rating: number;
  createdAt: Date;
}

export default IRating;