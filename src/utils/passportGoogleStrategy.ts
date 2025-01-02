import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from "../config/confiq";


passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done)=>{
            const { email, name, picture, sub} = profile._json;
            const user = [email, name, picture, sub];
            return done(null, user);
        }
    )
);

passport.serializeUser((user, done)=>{
    done(null, user);
});

passport.deserializeUser((user, done)=>{
    done(null, user);
});