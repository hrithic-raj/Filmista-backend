import { NextFunction, Request, Response } from 'express';

// import * as genreServices from '../services/genreServices';
import CustomError from '../utils/customErrorHandler';
import catchAsync from '../utils/catchAsync';
import * as movieServices from '../services/movieServices';
import IMovie from '../interfaces/movieInterface';

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
        language: data.languages,
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
    console.log(newMovie);
    res.status(201).json({
        status: "success",
        message: "New movie added",
        newMovie,
    });
})