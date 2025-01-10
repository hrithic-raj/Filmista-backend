import { Request, Response } from "express";
import IUser from "../interfaces/userInterface";
import User from "../models/userModel";
import CustomError from "../utils/customErrorHandler";
import bcrypt from 'bcrypt'
import {generateAccessToken, generateRefreshToken} from "../utils/jwtTokenGenerator";
import Celebrity from "../models/celebrityModel";
import Admin from "../models/adminModel";
import jwt from 'jsonwebtoken';
import { config } from "../config/confiq";
import passport from "passport";
import IAdmin from "../interfaces/adminInterface";

interface IUserResponse {
    user?: IUser,
    accessToken?: string;
    refreshToken?: string;
    role?:string;
}

const createUser = async (userData: IUser): Promise<IUserResponse> => {
    const {name, email, password, otp} = userData;
    let user = await User.findOne({email});
    let admin = await Celebrity.findOne({email});
    let celebrity = await Admin.findOne({email});
    if(user || admin || celebrity) throw new CustomError('User Already Exist, Please Signin', 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, otp, role:'user'});
    await user.save();
    const accessToken = generateAccessToken({ id: user._id, role: 'user' });
    const refreshToken = generateRefreshToken({ id: user._id, role: 'user' });
    user.refreshToken = refreshToken;
    await user.save();
    return {
        user,
        accessToken,
        refreshToken,
        role: user.role
    }
}


const authenticateUser = async (email: string, password: string): Promise<IUserResponse> => {
    let user = await Admin.findOne({email});
    if(!user) user = await Celebrity.findOne({email});
    if(!user) user = await User.findOne({email});
    if(!user) throw new CustomError('Invalid email or password', 400);
    const isMatch = await bcrypt.compare(password, user.password || '');
    if(!isMatch) throw new CustomError('Invalid email or password', 400);

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role });
    user.refreshToken = refreshToken;
    await user.save();
    return {
        user,
        accessToken,
        refreshToken,
        role: user.role
    }
}

const refreshTokenService = async(refreshToken: string)=>{
    const decoded: any = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
    
    let model;
    if(decoded.role==='admin') model = Admin;
    if(decoded.role==='celebrity') model = Celebrity;
    if(decoded.role==='user') model = User;
    const user = await model?.findById(decoded.id);
    if(!user || user.refreshToken != refreshToken) throw new CustomError('Invalid refresh token', 403);
    const newAccessToken = generateAccessToken({ id: user._id, role: user.role });
    return newAccessToken;
}

const googleAuthService = async(email: string, name: string, picture: string, googleId: string)=>{
    let user = await User.findOne({ email }) || await Celebrity.findOne({email})
    if(!user){
        user = new User({ name, email, role:'user', profilePicture: picture, googleId})
        await user.save();
        const accessToken = generateAccessToken({ id: user._id, role: 'user' });
        const refreshToken = generateRefreshToken({ id: user._id, role: 'user' });
        user.refreshToken = refreshToken;
        await user.save();
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role });
    user.refreshToken = refreshToken;
    await user.save();
    return {
        user,
        accessToken,
        refreshToken,
        role: user.role
    }
}

const createAdmin = async (userData: IAdmin): Promise<IUserResponse> => {
    const {name, email, password} = userData;
    let user = await User.findOne({email});
    let admin = await Celebrity.findOne({email});
    let celebrity = await Admin.findOne({email});
    if(user || admin || celebrity) throw new CustomError('User Already Exist, Please Signin', 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new Admin({ name, email, password: hashedPassword, role:'admin'});
    await user.save();
    const accessToken = generateAccessToken({ id: user._id, role: 'admin' });
    const refreshToken = generateRefreshToken({ id: user._id, role: 'admin' });
    user.refreshToken = refreshToken;
    await user.save();
    return {
        user,
        accessToken,
        refreshToken,
        role: user.role
    }
}

export {
    createUser,
    authenticateUser,
    refreshTokenService,
    googleAuthService,
    createAdmin,
}