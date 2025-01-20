import { NextFunction, Request, Response } from 'express';

// import * as genreServices from '../services/genreServices';
import CustomError from '../utils/customErrorHandler';
import catchAsync from '../utils/catchAsync';


export const addMovies = catchAsync( async(req: Request, res: Response, next: NextFunction)=>{
    const movieData = req.body;
})