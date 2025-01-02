import express, {Express, } from 'express';
import connectDB from './config/db';
import cors from 'cors';
import helmet from 'helmet';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
import { config } from './config/confiq';
import cookieParser from 'cookie-parser';
const app: Express = express();

// Database
connectDB()

// Middleware
app.use(cors());
app.use(cookieParser());
if (config.NODE_ENV === 'production') {
  app.use(helmet());
} else {
  app.use(helmet({ contentSecurityPolicy: false }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
// app.use("/api/users", userRouter);

export default app;