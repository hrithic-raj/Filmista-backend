import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/confiq';
import CustomError from '../utils/customErrorHandler';
import { NextFunction, Request, Response } from 'express';
import Admin from '../models/adminModel';
import IAdmin from '../interfaces/adminInterface';

interface DecodedToken extends JwtPayload{
    id: string;
    role: string;
}

export const adminAuth = async (req: Request, res: Response, next: NextFunction ): Promise<void>=>{
    // const token = req.headers['authorization']?.split(' ')[1];
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) next(new CustomError('Access denied, no token provided', 401));
    try{
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET) as DecodedToken;
        const admin = await Admin.findById(decoded.id);
        if (!admin || decoded.role!=='admin') next(new CustomError('Access Forbidden', 403));
        // console.log(admin)
        req.user = admin as IAdmin;
        next();
    }catch(error){
        res.status(401).json({ message: 'Invalid token' });
    }
};