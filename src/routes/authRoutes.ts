import express from 'express'
import { otpGenerator, signup, login, refreshToken} from '../controllers/authControllers';

const authRouter = express.Router();

authRouter.post('/generate-otp', otpGenerator);
authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/refresh-token', refreshToken);
authRouter.post('/logout', otpGenerator);

export default authRouter