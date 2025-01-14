import mongoose, { Schema, Document } from 'mongoose';
import ICelebrityRequest from '../interfaces/celebrityRequestInterface';


const CelebrityRequestSchema = new Schema<ICelebrityRequest>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  proofDocument: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export const CelebrityRequest = mongoose.model<ICelebrityRequest>('CelebrityRequest', CelebrityRequestSchema);