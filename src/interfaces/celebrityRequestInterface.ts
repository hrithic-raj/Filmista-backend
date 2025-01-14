import mongoose from "mongoose";

interface ICelebrityRequest extends Document {
  userId: mongoose.Types.ObjectId;
  proofDocument: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export default ICelebrityRequest;