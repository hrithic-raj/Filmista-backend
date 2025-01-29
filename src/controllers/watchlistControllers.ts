import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import IUser from "../interfaces/userInterface";
import CustomError from "../utils/customErrorHandler";
import * as watchlistServices from '../services/watchlistServices';
import { Watchlist } from "../models/watchlistModel";


export const getUserWaychlist = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const user = req.user as IUser;
    if (!user) throw new CustomError('User not authenticated', 401);
    const watchlist = await Watchlist.findOne({userId:user._id})
        .populate({
            path: "movies.movieId",
            model: "Movie",
            populate: [
                { path: "genres", model: "Genre", select: "genre -_id" },
                { path: "languages", model: "Language", select: "language -_id" }
            ]
        });

    res.status(201).json({
        status: "success",
        message: "movie added to watchlist",
        watchlist,
    });
});

export const addToWaychlist = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const user = req.user as IUser;
    const {movieId} = req.params;
    if (!user) throw new CustomError('User not authenticated', 401);
    if (!movieId) return next(new CustomError("Movie ID is required", 400));

    const watchlist = await watchlistServices.addToWaychlist(user._id as string, movieId);

    res.status(201).json({
        status: "success",
        message: "movie added to watchlist",
        watchlist,
    });
});

export const removeFromWaychlist = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const user = req.user as IUser;
    const {movieId} = req.params;
    if (!user) throw new CustomError('User not authenticated', 401);
    if (!movieId) return next(new CustomError("Movie ID is required", 400));
    
    const result = await watchlistServices.removeFromWaychlist(user._id as string, movieId);

    res.status(201).json({
        status: "success",
        message: result.message,
        watchlist: result.watchlist,
    });
});