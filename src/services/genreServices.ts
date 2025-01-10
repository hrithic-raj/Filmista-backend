import IGenre from "../interfaces/genreInterface";
import Genre from "../models/genreModel";
import CustomError from "../utils/customErrorHandler";

export const addGenre = async (genre: string, posterUrl: string): Promise<IGenre> => {
    const newGenre = new Genre({
        genre,
        poster: posterUrl,
        isArchive: false,
        movies: [],
    });

    return await newGenre.save();
};

export const updateGenre = async (genreId: string, updatedData:{genre?:string; posterUrl?: string}): Promise<IGenre | null>=>{
    const genre = await Genre.findById(genreId);
    if(!genre) throw new CustomError('Genre not found 404', 404);

    if(updatedData.posterUrl){
        genre.poster = updatedData.posterUrl;
    }

    if(updatedData.genre){
        genre.genre = updatedData.genre;
    }

    return await genre.save();
};

export const archiveGenre = async (id: string): Promise<IGenre | null> => {
    return await Genre.findByIdAndUpdate(id, { isArchive: true }, { new: true });
};

export const getMoviesByGenre = async (id: string): Promise<IGenre | null> => {
    return await Genre.findById(id).populate('movies');
};