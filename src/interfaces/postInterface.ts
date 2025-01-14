import mongoose from "mongoose";

interface IPost extends Document {
    celebrityId: mongoose.Types.ObjectId;
    posts: Array<{
      content: string;
      media: string;
      createdAt: Date;
    }>;
}

export default IPost;