import IGenre from "../interfaces/genreInterface";
import Genre from "../models/genreModel";
import CustomError from "../utils/customErrorHandler";

export const addGenre = async (newGenreData: {genre?:string; isArchive?: boolean; posterUrl?: string}): Promise<IGenre> => {
    const newGenre = new Genre({
        genre: newGenreData.genre,
        poster: newGenreData.posterUrl,
        isArchive: newGenreData.isArchive,
        movies: [],
    });

    return await newGenre.save();
};

export const updateGenre = async (genreId: string, updatedData:{genre?:string; isArchive?:boolean; posterUrl?: string}): Promise<IGenre | null>=>{
    const genre = await Genre.findById(genreId);
    if(!genre) throw new CustomError('Genre not found 404', 404);
    if(updatedData.posterUrl) genre.poster = updatedData.posterUrl;
    genre.isArchive = updatedData.isArchive;
    if(updatedData.genre) genre.genre = updatedData.genre;
    
    console.log(genre)
    return await genre.save();
};

export const archiveGenre = async (id: string): Promise<IGenre | null> => {
    const genre = await Genre.findById(id);
    genre.isArchive = !genre.isArchive;
    await genre.save();
    return genre;
};

export const getMoviesByGenre = async (id: string): Promise<IGenre | null> => {
    return await Genre.findById(id).populate('movies');
};