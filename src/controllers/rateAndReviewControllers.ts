import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import CustomError from "../utils/customErrorHandler";
import Rating from "../models/ratingModel";
import IUser from "../interfaces/userInterface";
import Movie from "../models/movieModel";

export const RateMovie = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const user = req.user as IUser;
    const {movieId} = req.params;
    const {rating} = req.body;
    if (!user || !movieId || !rating) next(new CustomError("All fields are required", 400));

    const existingRating = await Rating.findOne({userId:user._id, movieId});
    if (existingRating) {
        existingRating.rating = rating;
        await existingRating.save();
    } else {
        await Rating.create({ userId: user._id, movieId, rating });
    }

    const ratings = await Rating.find({ movieId });
    const averageRating =
    ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

    await Movie.findByIdAndUpdate(movieId, { rating: averageRating });
    
    res.status(200).json({
        status: "success",
        message: "Rating submitted successfully",
        rating: averageRating,
    });
})

export const getMovieRatings = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const { movieId } = req.params;
    const ratings = await Rating.find({ movieId }).populate("userId", "name");
    res.status(200).json({
        status: "success",
        message: "Movie ratings fetched",
        ratings,
    });
})