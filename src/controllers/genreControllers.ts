import { NextFunction, Request, Response } from 'express';
import * as genreServices from '../services/genreServices';
import CustomError from '../utils/customErrorHandler';
import catchAsync from '../utils/catchAsync';
import Genre from '../models/genreModel';

export const getGenres = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10; 

    const skip = (page - 1) * limit;
    const genres = await Genre.find().skip(skip).limit(Number(limit));
  
    const totalGenres = await Genre.countDocuments();
    const totalPages = Math.ceil(totalGenres / limit);
  
    res.status(200).json({
        status: "success",
        message: "genre fetched",
        currentPage: Number(page),
        totalPages,
        genres,
    });
});

export const getAllGenres = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const genres = await Genre.find();
    res.status(200).json({
        status: "success",
        message: "genre fetched",
        genres,
    });
})

export const addGenre = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // const newGenreData = {genre: req.body.genre, isArchive: req.body.isArchive, posterUrl: req.file?.path}
    const data = JSON.parse(req.body.data)
    const newGenreData = {
        genre: data.genre,
        isArchive: data.isArchive,
        posterUrl: req.file?.path,
    };

    if(!newGenreData.posterUrl) throw new CustomError('Poster image is required', 400);

    const newGenre = await genreServices.addGenre(newGenreData);

    res.status(201).json({
        status: "success",
        message: "New genre added",
        genre: newGenre,
    });
})

export const updateGenre = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {genreId} = req.params;
    // const updatedData = {genre: req.body.genre, isArchive: req.body.isArchive, posterUrl: req.file?.path}
    const data = JSON.parse(req.body.data);
    const updatedData = {
        genre: data.genre, 
        isArchive: data.isArchive,
        posterUrl: req.file?.path
    }

    const updatedGenre = await genreServices.updateGenre(genreId, updatedData);
    if(!updatedGenre) throw new CustomError('Genre not found', 404);

    res.status(200).json({
        status: "success",
        message: "genre updated",
        genre: updatedGenre,
    });
});

export const archiveGenre = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { genreId } = req.params;
    const archivedGenre = await genreServices.archiveGenre(genreId);

    if (!archivedGenre) throw new CustomError('Genre not found', 404);

    res.status(200).json({
        status: "success",
        message: "genre archived",
        genre: archivedGenre,
    });
});


export const getMoviesByGenre = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { genreId } = req.params;
    const genreWithMovies = await genreServices.getMoviesByGenre(genreId);

    if (!genreWithMovies) throw new CustomError('Genre not found', 404);

    res.status(200).json({
        status: "success",
        message: "genre updated",
        genre:genreWithMovies,
    });
});