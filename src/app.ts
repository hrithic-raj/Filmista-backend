import express, {Express, } from 'express';
import connectDB from './config/db';
import cors from 'cors';
import helmet from 'helmet';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import { config } from './config/confiq';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from "express-session";
import adminRouter from './routes/adminRoutes';
const app: Express = express();

// Database
connectDB()

// Middleware
app.use(cors({
  origin: 'https://filmista.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: 'none',
    },  
  })  
);  

app.use(passport.initialize());
app.use(passport.session());

if (config.NODE_ENV === 'production') {
  app.use(helmet());
} else {
  app.use(helmet({ contentSecurityPolicy: false }));
}    


// Routes

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

export default app;