import express from 'express'
import upload from '../utils/multer';
import { submitCelebrityRequest } from '../controllers/userControllers';
import { userAuth } from '../middlewares/userAuth';

const userRouter = express.Router();

// userRouter.get('/', auth, getUserFromToken);
// userRouter.post('/auth/signup',userValidation, signup);
// userRouter.post('/auth/login', login);
userRouter.post('/celebrity-request', userAuth, upload.single('proofDocument'), submitCelebrityRequest);

export default userRouter