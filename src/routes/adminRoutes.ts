import express from 'express'
import { adminAuth } from '../middlewares/adminAuth';
import { BlockUser, getAllUsers, getUserById, reviewCelebrityRequest } from '../controllers/adminControllers';
import { addGenre, archiveGenre, getAllGenres, getMoviesByGenre, updateGenre } from '../controllers/genreControllers';
import upload from '../utils/multer';
import { addLanguage, archiveLanguage, getAllLanguages, getMoviesByLanguage, updateLanguage } from '../controllers/languageControllers';

const adminRouter = express.Router();

//user manage routes
adminRouter.get('/users', adminAuth, getAllUsers);
adminRouter.get('/users/:userId', adminAuth, getUserById);
adminRouter.patch('/users/:userId/block', adminAuth, BlockUser);
adminRouter.post('/users/review-celebrity-request', adminAuth, reviewCelebrityRequest);

//genre manage routes
adminRouter.get('/genres', adminAuth, getAllGenres);
adminRouter.get('/genres/:genreId', adminAuth, getMoviesByGenre);
adminRouter.post('/genres', adminAuth, upload.single('poster'), addGenre);
adminRouter.patch('/genres/:genreId', adminAuth, upload.single('poster'), updateGenre);
adminRouter.patch('/genres/:genreId/archive', adminAuth, archiveGenre);

//language manage routes
adminRouter.get('/languages', adminAuth, getAllLanguages);
adminRouter.get('/languages/:langId', adminAuth, getMoviesByLanguage);
adminRouter.post('/languages', adminAuth, upload.single('poster'), addLanguage);
adminRouter.patch('/languages/:langId', adminAuth, upload.single('poster'), updateLanguage);
adminRouter.patch('/languages/:langId/archive', adminAuth, archiveLanguage);

//celebrity manage routes

//movie manage routes

export default adminRouter