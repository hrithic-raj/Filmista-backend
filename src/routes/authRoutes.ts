import express from 'express'
import { otpGenerator } from '../controllers/authControllers';

const authRouter = express.Router();

authRouter.post('/generate-otp', otpGenerator);

export default authRouter