import jwt from 'jsonwebtoken';
import { config } from '../config/confiq';

const jwtTokenGenerator = (payload: object) => {
    const accessToken =  jwt.sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload,  config.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return {
        accessToken,
        refreshToken
    }
};

export default jwtTokenGenerator;