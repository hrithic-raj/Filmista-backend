import mongoose from "mongoose";
import IWatchlist from "../interfaces/watchlistInterface";
import { Watchlist } from "../models/watchlistModel";
import CustomError from "../utils/customErrorHandler";

export const addToWaychlist = async (userId: string, movieId:string) =>{
    const userWatchlist = await Watchlist.findOne({userId});
    if(!userWatchlist){
        const newWatchlist = new Watchlist({
            userId: new mongoose.Types.ObjectId(userId),
            movies: [{ movieId: new mongoose.Types.ObjectId(movieId) }]
        });

        await newWatchlist.save();
        return newWatchlist;
    }else{
        const movieExist = userWatchlist.movies.some((movie)=> movie.movieId.toString()===movieId);
        if(!movieExist){
            userWatchlist.movies.push({ movieId: new mongoose.Types.ObjectId(movieId)});
            await userWatchlist.save();
        }
        return userWatchlist;
    }
};

export const removeFromWaychlist = async (userId: string, movieId:string) =>{
    const userWatchlist = await Watchlist.findOne({userId});
    if(!userWatchlist) throw new CustomError('User Watchlist not found', 404);
    
    const movieExist = userWatchlist.movies.some((movie)=> movie.movieId.toString()===movieId);
    if(!movieExist) throw new CustomError('movie not found in watchlist', 404);

    const updatedMovies = userWatchlist.movies.filter(movie=> movie.movieId.toString() !== movieId);
    if (updatedMovies.length === 0) {
        await Watchlist.deleteOne({ userId });
        return { message: "Watchlist deleted as no movies left" };
    }

    userWatchlist.movies = updatedMovies;
    await userWatchlist.save();
    const updatedWatchlist = await Watchlist.findOne({userId})
        .populate({
            path: "movies.movieId",
            model: "Movie",
            populate: [
                { path: "genres", model: "Genre", select: "genre -_id" },
                { path: "languages", model: "Language", select: "language -_id" }
            ]
        });
    return { message: "Movie removed from watchlist", watchlist: updatedWatchlist };
};