import mongoose, { Schema } from "mongoose";
import IPost from "../interfaces/postInterface";

const PostSchema = new Schema<IPost>({
    celebrityId: { type: Schema.Types.ObjectId, ref: 'Celebrity', required: true },
    posts: [
        {
        content: { type: String },
        media: { type: String },
        createdAt: { type: Date, default: Date.now },
        },
    ],
});

export const Post = mongoose.model<IPost>('Post', PostSchema);