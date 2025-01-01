import express, {Express, } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import router from './routes/userRoutes';

const app: Express = express();
dotenv.config();

// Database
connectDB()

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", router);

export default app;