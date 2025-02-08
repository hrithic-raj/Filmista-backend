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
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);

app.use(cookieParser());

if (config.NODE_ENV === 'production') {
  app.use(helmet());
} else {
  app.use(helmet({ contentSecurityPolicy: false }));
}

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
      // origin: 'http://localhost:5173',
      // origin: 'https://filmista-frontend.vercel.app',
      origin: 'https://lovely-caramel-5ed216.netlify.app',
      methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      credentials: true,
  })
);
app.options('*', cors());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
// app.use("/api/users", userRouter);

export default app;