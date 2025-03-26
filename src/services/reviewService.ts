import mongoose from 'mongoose';
import { IReview } from '../interfaces/reviewInterface';
import Review from '../models/reviewModel';

export const addReview = async (userId: string, movieId: string, title: string, content: string): Promise<IReview> => {
    return await Review.create({ user: userId, movie: movieId, title, content });
};

export const getAllReviews = async (movieId: string): Promise<IReview[]> => {
    return await Review.find({ movie: movieId }).sort({ createdAt: -1 }).populate('user', 'name profilePicture');

//     const reviews = await Review.find({ movie: movieId })
//     .sort({ createdAt: -1 })
//     .populate('user', 'name profilePicture')
//     .lean();

// const userObjectId = new mongoose.Types.ObjectId(userId);

// const updatedReviews = reviews.map((review) => ({
//     ...review,
//     userLiked: userId ? review.likes.some(id => id.toString() === userObjectId.toString()) : false,
//     userDisliked: userId ? review.dislikes.some(id => id.toString() === userObjectId.toString()) : false,
// }));
};


export const likeReview = async (reviewId: string, userId: string): Promise<IReview | null> => {
    const review = await Review.findById(reviewId);
    if (!review) return null;

    const userObjectId = new mongoose.Types.ObjectId(userId);

    if (review.likes.some(id => id.equals(userObjectId))) {
        review.likes = review.likes.filter(id => !id.equals(userObjectId));
      } else {
        review.likes.push(userObjectId);
        review.dislikes = review.dislikes.filter(id => !id.equals(userObjectId));
      }
  
    return await review.save();
};

export const dislikeReview = async (reviewId: string, userId: string): Promise<IReview | null> => {
    const review = await Review.findById(reviewId);
    if (!review) return null;

    const userObjectId = new mongoose.Types.ObjectId(userId);

    if (review.dislikes.some(id => id.equals(userObjectId))) {
      review.dislikes = review.dislikes.filter(id => !id.equals(userObjectId));
    } else {
      review.dislikes.push(userObjectId);
      review.likes = review.likes.filter(id => !id.equals(userObjectId));
    }
  
    return await review.save();
  };