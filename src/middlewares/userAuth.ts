import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/confiq';
import CustomError from '../utils/customErrorHandler';
import { NextFunction, Request, Response } from 'express';

interface DecodedToken extends JwtPayload{
    userid: string;
    role: string;
}

export const userAuth = async (req: Request, res: Response, next: NextFunction )=>{
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token);
    if(!token) next(new CustomError('Access denied, no token provided', 401));
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET) as DecodedToken;
    if(typeof decoded === 'object' && decoded.id && decoded.role==='user'){
        req.user = {
            userId: decoded.id,
            role: decoded.role,
        };
        return next();
    }else{
        next(new CustomError('Invalid or expired token', 403));
    }
};