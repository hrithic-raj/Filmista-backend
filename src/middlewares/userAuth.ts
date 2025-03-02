import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/confiq';
import CustomError from '../utils/customErrorHandler';
import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import IUser from '../interfaces/userInterface';

interface DecodedToken extends JwtPayload{
    id: string;
    role: string;
}

export const userAuth = async (req: Request, res: Response, next: NextFunction )=>{
    // const token = req.headers['authorization']?.split(' ')[1];
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) next(new CustomError('Access denied, no token provided', 401));
    try{
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET) as DecodedToken;
        const user = await User.findById(decoded.id);
        if(!user && decoded.role!=='user') next(new CustomError('Access Forbidden', 403));
        
        // console.log(user)
        req.user = user as IUser;
        next();
    }catch(error){
        res.status(401).json({ message: 'Invalid token' });
    }
};