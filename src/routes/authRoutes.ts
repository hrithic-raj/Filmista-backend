import express from 'express'
import { otpGenerator } from '../controllers/authControllers';

const authRouter = express.Router();

authRouter.post('/generate-otp', otpGenerator);
authRouter.post('/signup', otpGenerator);

export default authRouter