import express from 'express'
import { adminAuth } from '../middlewares/adminAuth';
import { getAllUsers } from '../controllers/adminControllers';

const adminRouter = express.Router();

adminRouter.get('/users', adminAuth, getAllUsers);
// adminRouter.get('/users/:id', adminAuth, );
// adminRouter.get('/users/:id/block', adminAuth, );

export default adminRouter