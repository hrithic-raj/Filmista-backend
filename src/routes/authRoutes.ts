import express from 'express'
import { otpGenerator, signup, signin, refreshToken, googleAuth, signout} from '../controllers/authControllers';
// import passport from 'passport';

const authRouter = express.Router();

authRouter.post('/send-otp', otpGenerator);
authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/refresh-token', refreshToken);
authRouter.post('/signout', signout);
authRouter.post('/google', googleAuth);

export default authRouter