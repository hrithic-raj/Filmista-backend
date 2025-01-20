import { NextFunction, Request, Response } from 'express';
import * as languageServices from '../services/languageServices';
import CustomError from '../utils/customErrorHandler';
import catchAsync from '../utils/catchAsync';
import Language from '../models/languageModel';

export const getAllLanguages = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const languages = await Language.find();

    res.status(200).json({
        status: "success",
        message: "Languages fetched",
        languages,
    });
});

export const addLanguage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const data = JSON.parse(req.body.data)
    const newLanguageData = {
        language: data.language,
        isArchive: data.isArchive,
        posterUrl: req.file?.path,
    };

    if(!newLanguageData.posterUrl) throw new CustomError('Poster image is required', 400);

    const newLanguage = await languageServices.addLanguage(newLanguageData);

    res.status(201).json({
        status: "success",
        message: "New language added",
        language: newLanguage,
    });
})

export const updateLanguage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {langId} = req.params;
    const data = JSON.parse(req.body.data);
    const updatedData = {
        language: data.language, 
        isArchive: data.isArchive,
        posterUrl: req.file?.path
    }

    const updatedLanguage = await languageServices.updateLanguage(langId, updatedData);
    if(!updatedLanguage) throw new CustomError('Language not found', 404);

    res.status(200).json({
        status: "success",
        message: "language updated",
        language: updatedLanguage,
    });
});

export const archiveLanguage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { langId } = req.params;
    const archivedLanguage = await languageServices.archiveLanguage(langId);

    if (!archivedLanguage) throw new CustomError('Language not found', 404);

    res.status(200).json({
        status: "success",
        message: "Language archived",
        language: archivedLanguage,
    });
});


export const getMoviesByLanguage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { langId } = req.params;
    const languageWithMovies = await languageServices.getMoviesByLanguage(langId);

    if (!languageWithMovies) throw new CustomError('Language not found', 404);

    res.status(200).json({
        status: "success",
        message: "Language updated",
        language:languageWithMovies,
    });
});