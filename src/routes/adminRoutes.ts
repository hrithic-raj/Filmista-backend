import express from 'express'
import { adminAuth } from '../middlewares/adminAuth';
import { BlockUser, getAllUsers, getUserById } from '../controllers/adminControllers';
import { addGenre, archiveGenre, getAllGenres, updateGenre } from '../controllers/genreControllers';
import upload from '../utils/multer';

const adminRouter = express.Router();

//user manage routes
adminRouter.get('/users', adminAuth, getAllUsers);
adminRouter.get('/users/:userId', adminAuth, getUserById);
adminRouter.patch('/users/:userId/block', adminAuth, BlockUser);

//genre manage routes
adminRouter.get('/genres', adminAuth, getAllGenres);
adminRouter.post('/genres', adminAuth, upload.single('poster'), addGenre);
adminRouter.patch('/genres/:genreId', adminAuth, upload.single('poster'), updateGenre);
adminRouter.patch('/genres/:genreId/archive', adminAuth, archiveGenre);

//celebrity manage routes

//movie manage routes

export default adminRouter