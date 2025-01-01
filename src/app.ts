import express, {Express, } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors';
import helmet from 'helmet';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';
const app: Express = express();
dotenv.config();

// Database
connectDB()

// Middleware
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
} else {
  app.use(helmet({ contentSecurityPolicy: false }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/", authRouter);
// app.use("/api/users", userRouter);

export default app;