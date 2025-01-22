import express from 'express'
import { adminAuth } from '../middlewares/adminAuth';
import { BlockCelebrity, BlockUser, getAllCelebrities, getAllCelebrityRequest, getAllUsers, getCelebrityById, getUserById, reviewCelebrityRequest } from '../controllers/adminControllers';
import { addGenre, archiveGenre, getAllGenres, getMoviesByGenre, updateGenre } from '../controllers/genreControllers';
import upload from '../utils/multer';
import { addLanguage, archiveLanguage, getAllLanguages, getMoviesByLanguage, updateLanguage } from '../controllers/languageControllers';
import { addMovies, getAllMovies } from '../controllers/movieControllers';

const adminRouter = express.Router();

//user manage routes
adminRouter.get('/users', adminAuth, getAllUsers);
adminRouter.post('/users/review-celebrity-request', adminAuth, reviewCelebrityRequest);
adminRouter.get('/users/:userId', adminAuth, getUserById);
adminRouter.patch('/users/:userId/block', adminAuth, BlockUser);

//genre manage routes
adminRouter.get('/genres', adminAuth, getAllGenres);
adminRouter.post('/genres', adminAuth, upload.single('poster'), addGenre);
adminRouter.patch('/genres/:genreId', adminAuth, upload.single('poster'), updateGenre);
adminRouter.get('/genres/:genreId', adminAuth, getMoviesByGenre);
adminRouter.patch('/genres/:genreId/archive', adminAuth, archiveGenre);

//language manage routes
adminRouter.get('/languages', adminAuth, getAllLanguages);
adminRouter.post('/languages', adminAuth, upload.single('poster'), addLanguage);
adminRouter.patch('/languages/:langId', adminAuth, upload.single('poster'), updateLanguage);
adminRouter.get('/languages/:langId', adminAuth, getMoviesByLanguage);
adminRouter.patch('/languages/:langId/archive', adminAuth, archiveLanguage);

//celebrity manage routes
adminRouter.get('/celebrities', adminAuth, getAllCelebrities);
adminRouter.get('/celebrities/requests', adminAuth, getAllCelebrityRequest);
adminRouter.patch('/celebrities/review-request', adminAuth, reviewCelebrityRequest);
adminRouter.get('/celebrities/:celebrityId', adminAuth, getCelebrityById);
adminRouter.patch('/celebrities/:celebrityId/block', adminAuth, BlockCelebrity);

//movie manage routes
adminRouter.get('/movies', adminAuth, getAllMovies);
adminRouter.post('/movies', adminAuth, upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'horizontalPoster', maxCount: 1 },
    { name: 'otherImages', maxCount: 10 },
  ]), addMovies);

export default adminRouter