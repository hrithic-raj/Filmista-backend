import express from 'express'
import upload from '../utils/multer';
import { addUserGenres, addUserLanguages, getProfile, submitCelebrityRequest } from '../controllers/userControllers';
import { userAuth } from '../middlewares/userAuth';
import { auth } from '../middlewares/auth';
import { getAllGenres, getGenres, getMoviesByGenre } from '../controllers/genreControllers';
import { getAllLanguages, getMoviesByLanguage } from '../controllers/languageControllers';
import { getAllMovies } from '../controllers/movieControllers';

const userRouter = express.Router();

userRouter.post('/profile', auth, getProfile);
userRouter.get('/movies', auth, getAllMovies);

//genre routes
userRouter.get('/genres', auth, getAllGenres);
userRouter.post('/genres', auth, addUserGenres);
userRouter.get('/genres/:genreId', auth, getMoviesByGenre);

//language routes
userRouter.get('/languages', auth, getAllLanguages);
userRouter.post('/languages', auth, addUserLanguages);
userRouter.get('/languages/:langId', auth, getMoviesByLanguage);

// celebrity route
userRouter.post('/celebrity-request', userAuth, upload.single('proofDocument'), submitCelebrityRequest);
export default userRouter