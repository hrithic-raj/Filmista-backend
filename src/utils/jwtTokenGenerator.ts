import jwt from 'jsonwebtoken';
import { config } from '../config/confiq';
import { Response } from 'express';

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload,  config.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); 
};

export const cookieSaver = (res: Response, refreshToken: string)=>{
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}

export const clearCookie = (res: Response)=>{
    res.clearCookie('refreshToken',{
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
}