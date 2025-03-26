import mongoose, { Schema } from 'mongoose';
import { IReview } from '../interfaces/reviewInterface';

const ReviewSchema = new Schema<IReview>(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
      title: { type: String, required: true },
      content: { type: String, required: true },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
      dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    },
    { timestamps: true }
  );

const review = mongoose.model<IReview>("Review", ReviewSchema);

export default review;