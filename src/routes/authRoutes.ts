import express from 'express'
import { otpGenerator, signup, signin, refreshToken, googleAuth} from '../controllers/authControllers';
import passport from 'passport';

const authRouter = express.Router();

authRouter.post('/send-otp', otpGenerator);
authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/refresh-token', refreshToken);
authRouter.post('/logout', otpGenerator);
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  googleAuth
);

export default authRouter