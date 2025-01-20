import express from 'express'
import upload from '../utils/multer';
import { getProfile, submitCelebrityRequest } from '../controllers/userControllers';
import { userAuth } from '../middlewares/userAuth';
import { auth } from '../middlewares/auth';
import { getAllGenres, getMoviesByGenre } from '../controllers/genreControllers';
import { getAllLanguages, getMoviesByLanguage } from '../controllers/languageControllers';

const userRouter = express.Router();

userRouter.post('/profile', auth, getProfile);

//genre routes
userRouter.get('/genres', auth, getAllGenres);
userRouter.get('/genres/:genreId', auth, getMoviesByGenre);

//language routes
userRouter.get('/languages', auth, getAllLanguages);
userRouter.get('/languages/:langId', auth, getMoviesByLanguage);

// celebrity route
userRouter.post('/celebrity-request', userAuth, upload.single('proofDocument'), submitCelebrityRequest);
export default userRouter