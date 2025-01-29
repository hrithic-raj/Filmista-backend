import mongoose from "mongoose";
import IMovie from "../interfaces/movieInterface";
import Movie from "../models/movieModel";

export const addMovies = async (newMovieData:IMovie): Promise<IMovie> => {
    const newMovie = await Movie.create(newMovieData);
    return newMovie;
};

export const getMovieById = async (movieId: string): Promise<IMovie> => {
    const movie = await Movie.findById(movieId);
    return movie;
};

export const updateMovie = async (movieId: string, updatedData: Partial<IMovie>): Promise<IMovie | null> => {
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
        throw new Error("Invalid movie ID");
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
        movieId,
        { $set: updatedData },
        { new: true, runValidators: true }
    );

    return updatedMovie;
};