import { NextFunction, Request, Response } from 'express';

// import * as genreServices from '../services/genreServices';
import CustomError from '../utils/customErrorHandler';
import catchAsync from '../utils/catchAsync';
import * as movieServices from '../services/movieServices';
import IMovie from '../interfaces/movieInterface';
import Movie from '../models/movieModel';
import Language from '../models/languageModel';
import Genre from '../models/genreModel';
import mongoose from 'mongoose';

export const getAllMovies = catchAsync( async(req: Request, res: Response, next: NextFunction)=>{
    const movies = await Movie.find().populate(['genres', 'languages']);
    res.status(201).json({
        status: "success",
        message: "All movies fetched",
        movies,
    });
})
export const getMoviesById = catchAsync( async(req: Request, res: Response, next: NextFunction)=>{
    const {movieId} = req.params
    const movie = await Movie.findById(movieId).populate(['genres', 'languages']);
    res.status(201).json({
        status: "success",
        message: "Movie fetched successfully",
        movie,
    });
})

const updateGenresAndLanguages = async (movieId: mongoose.Types.ObjectId, genres: mongoose.Types.ObjectId[], languages: mongoose.Types.ObjectId[]) => {
    await Genre.updateMany(
        { _id: { $in: genres } },
        { $addToSet: { movies: movieId } }
    );

    await Language.updateMany(
        { _id: { $in: languages } },
        { $addToSet: { movies: movieId } }
    );
};

export const addMovies = catchAsync( async(req: Request, res: Response, next: NextFunction)=>{
    const data = JSON.parse(req.body.data);
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const posterUrl = files.poster?.[0]?.path || null;
    const horizontalPosterUrl = files.horizontalPoster?.[0]?.path || null;
    const otherImageUrls = files.otherImages?.map((file) => file.path) || [];

    if(!posterUrl) throw new CustomError('Poster image is required', 400);
    if(!horizontalPosterUrl) throw new CustomError('horizontalPoster image is required', 400);

    const newMovieData: IMovie = {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        duration: data.duration,
        genres: data.genres,
        languages: data.languages,
        cast: data.cast,
        images: {
            poster: posterUrl,
            horizontalPoster: horizontalPosterUrl,
            other: otherImageUrls,
        },
        videos: {
            trailer: data.trailer,
            others: data.videos,
        },
        reviews:[],
    }

    const newMovie = await movieServices.addMovies(newMovieData);
    
    await updateGenresAndLanguages(newMovie._id, data.genres, data.languages);
    
    res.status(201).json({
        status: "success",
        message: "New movie added",
        newMovie,
    });
})


export const updateMovie = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const data = JSON.parse(req.body.data);
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const existingMovie = await movieServices.getMovieById(id);
    if (!existingMovie) throw new CustomError('Movie not found', 404);

    const posterUrl = files.poster?.[0]?.path || existingMovie.images.poster;
    const horizontalPosterUrl = files.horizontalPoster?.[0]?.path || existingMovie.images.horizontalPoster;
    
    const existingOtherImages = data.otherImages || [];
    const newOtherImages = files.otherImages?.map((file) => file.path) || [];
    const updatedOtherImages = [...existingOtherImages, ...newOtherImages];

    const updatedMovieData: Partial<IMovie> = {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        duration: data.duration,
        genres: data.genres,
        languages: data.languages,
        cast: data.cast,
        images: {
            poster: posterUrl,
            horizontalPoster: horizontalPosterUrl,
            other: updatedOtherImages,
        },
        videos: {
            trailer: data.trailer,
            others: data.videos,
        },
    };

    const updatedMovie = await movieServices.updateMovie(id, updatedMovieData);

    const oldGenres = existingMovie.genres.map((genre: any) => genre.toString());
    const oldLanguages = existingMovie.languages.map((lang: any) => lang.toString());

    const newGenres = data.genres.map((genre: any) => genre.toString());
    const newLanguages = data.languages.map((lang: any) => lang.toString());

    const removedGenres = oldGenres.filter((genre) => !newGenres.includes(genre));
    const removedLanguages = oldLanguages.filter((lang) => !newLanguages.includes(lang));

    if (removedGenres.length) {
        await Genre.updateMany(
            { _id: { $in: removedGenres } },
            { $pull: { movies: id } }
        );
    }

    if (removedLanguages.length) {
        await Language.updateMany(
            { _id: { $in: removedLanguages } },
            { $pull: { movies: id } }
        );
    }

    await updateGenresAndLanguages(new mongoose.Types.ObjectId(id), data.genres, data.languages);

    res.status(200).json({
        status: "success",
        message: "Movie updated successfully",
        updatedMovie,
    });
});


export const searchMovies = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { query } = req.query;
    if (!query) throw new CustomError('Query is required', 400);
    // const movies = await Movie.find({ title: new RegExp(query as string, 'i') }).limit(10);
    const regex = new RegExp(query as string, 'i');
    console.log("Regex Pattern:", regex);

    const movies = await Movie.find({ title: regex }).limit(5);
    console.log("Movies Found:", movies);

    res.status(200).json({
        status: "success",
        message: "Movies fetched successfully",
        movies,
    });
});