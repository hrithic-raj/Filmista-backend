import mongoose, { Schema} from 'mongoose';
import IRating from '../interfaces/ratingInterface';

const RatingSchema = new Schema<IRating>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
      },
      { timestamps: true }
);

const Rating = mongoose.model<IRating>('Rating', RatingSchema);

export default Rating;