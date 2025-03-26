import mongoose, { Document } from "mongoose";

export interface IReview extends Document {
    user: mongoose.Types.ObjectId;
    movie: mongoose.Types.ObjectId;
    title: string;
    content: string;
    likes: mongoose.Types.ObjectId[];
    dislikes: mongoose.Types.ObjectId[];
    createdAt: Date;
}