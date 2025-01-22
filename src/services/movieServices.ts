import IMovie from "../interfaces/movieInterface";
import Movie from "../models/movieModel";

export const addMovies = async (newMovieData:IMovie): Promise<IMovie> => {
    const newMovie = await Movie.create(newMovieData);
    return newMovie;
};