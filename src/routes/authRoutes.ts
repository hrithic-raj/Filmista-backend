import express from 'express'
import { otpGenerator, signup, login, refreshToken, googleAuth} from '../controllers/authControllers';
import passport from 'passport';

const authRouter = express.Router();

authRouter.post('/generate-otp', otpGenerator);
authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/refresh-token', refreshToken);
authRouter.post('/logout', otpGenerator);
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleAuth
);

export default authRouter