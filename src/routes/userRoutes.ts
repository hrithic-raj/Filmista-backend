import express from 'express'
import upload from '../utils/multer';
import { addUserGenres, addUserLanguages, getProfile, submitCelebrityRequest } from '../controllers/userControllers';
import { userAuth } from '../middlewares/userAuth';
import { auth } from '../middlewares/auth';
import { getAllGenres, getGenres, getMoviesByGenre } from '../controllers/genreControllers';
import { getAllLanguages, getMoviesByLanguage } from '../controllers/languageControllers';
import { getAllMovies, getMoviesById } from '../controllers/movieControllers';
import { addToWaychlist, getUserWaychlist, removeFromWaychlist } from '../controllers/watchlistControllers';

const userRouter = express.Router();

userRouter.post('/profile', auth, getProfile);

// movie routes
userRouter.get('/movies', auth, getAllMovies);
userRouter.get('/movies/:movieId', auth, getMoviesById);

// genre routes
userRouter.get('/genres', auth, getAllGenres);
userRouter.post('/genres', auth, addUserGenres);
userRouter.get('/genres/:genreId', auth, getMoviesByGenre);

// language routes
userRouter.get('/languages', auth, getAllLanguages);
userRouter.post('/languages', auth, addUserLanguages);
userRouter.get('/languages/:langId', auth, getMoviesByLanguage);

// celebrity routes
userRouter.post('/celebrity-request', userAuth, upload.single('proofDocument'), submitCelebrityRequest);

// watchlist routes
userRouter.get('/watchlist', auth, getUserWaychlist);
userRouter.post('/watchlist/:movieId', auth, addToWaychlist);
userRouter.delete('/watchlist/:movieId', auth, removeFromWaychlist);

export default userRouter