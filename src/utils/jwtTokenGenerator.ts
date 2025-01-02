import jwt from 'jsonwebtoken';
import { config } from '../config/confiq';

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload,  config.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); 
};