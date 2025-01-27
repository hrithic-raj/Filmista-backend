import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/confiq';
import CustomError from '../utils/customErrorHandler';
import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import IUser from '../interfaces/userInterface';
import Celebrity from '../models/celebrityModel';

interface DecodedToken extends JwtPayload{
    userid: string;
    role: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction )=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) next(new CustomError('Access denied, no token provided', 401));
    try{
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET) as DecodedToken;
        if(decoded.role === 'celebrity'){
            // const user = await User.findById(decoded.id);
            // if(user){
            //     req.user = user;
            //     return next();
            // }
            const celebrity = await Celebrity.findById(decoded.id).populate('userId')
            if(celebrity){
                req.user = celebrity;
                return next();
            }
        }
        if(decoded.role === 'user'){
            const user = await User.findById(decoded.id);
            if(user){
                req.user = user;
                return next();
            }
        }

        next(new CustomError('Access Forbidden', 403));
    }catch(error){
        res.status(401).json({ message: 'Invalid token' });
    }
};