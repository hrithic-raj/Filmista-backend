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
            try{
                const email = profile.emails?.[0]?.value || "";
                const name = profile.displayName || "";
                const picture = profile.photos?.[0]?.value || "";
                const sub = profile.id;
                const user = [email, name, picture, sub];
                return done(null, user);
            }catch(error){
                console.error("Error in Google Strategy:", error);
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done)=>{
    done(null, user);
});

passport.deserializeUser((user, done)=>{
    done(null, user);
});