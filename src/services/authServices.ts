import { Response } from "express";
import IUser from "../interfaces/userInterface";
import User from "../models/userModel";
import CustomError from "../utils/customErrorHandler";
import bcrypt from 'bcrypt'
import {generateAccessToken, generateRefreshToken} from "../utils/jwtTokenGenerator";
import Celebrity from "../models/celebrityModel";
import Admin from "../models/adminModel";
import jwt from 'jsonwebtoken';
import { config } from "../config/confiq";
// import passport from "passport";
import IAdmin from "../interfaces/adminInterface";
import { CredentialResponse } from "../interfaces/credentialInterface";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";

interface IUserResponse {
    user?: IUser,
    accessToken?: string;
    refreshToken?: string;
    role?:string;
}

const createUser = async (userData: IUser): Promise<IUserResponse> => {
    const {name, email, password, otp} = userData;
    let user = await User.findOne({email});
    let celebrity = await Celebrity.findOne({email});
    let admin = await Admin.findOne({email});
    if(user || admin || celebrity) throw new CustomError('User Already Exist, Please Signin', 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarUrl = `https://ui-avatars.com/api/?name=${name.charAt(0)}&background=46cec2&color=fff`;

    user = new User({ name, email, password: hashedPassword, profilePicture: avatarUrl, otp, role:'user'});
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
    // if(!user) user = await Celebrity.findOne({email});
    if(!user) user = await User.findOne({email});
    if(!user) throw new CustomError('Invalid email or password', 400);
    const isMatch = await bcrypt.compare(password, user.password || '');
    if(!isMatch) throw new CustomError('Invalid email or password', 400);
    // if(user.role === "celebrity"){
    //     const celebrity = await Celebrity.findOne({userId: user._id});
    //     // console.log(user);
    //     const accessToken = generateAccessToken({ id: celebrity._id, role: user.role });
    //     const refreshToken = generateRefreshToken({ id: celebrity._id, role: user.role });
    //     user.refreshToken = refreshToken;
    //     await user.save();
    //     return {
    //         user,
    //         accessToken,
    //         refreshToken,
    //         role: user.role
    //     }
    // }
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
    if(decoded.role==='user') model = User;
    if(decoded.role==='celebrity') model = User;
    const user = await model?.findById(decoded.id);
    if(!user) throw new CustomError('Invalid refresh token', 403);
    const newAccessToken = generateAccessToken({ id: user._id, role: user.role });
    return newAccessToken;
    
    // if(decoded.role==='celebrity'){
    //     const celebrity = await Celebrity.findById(decoded.id);
    //     const user = await User.findById(celebrity.userId);
    //     if(!user || user.refreshToken != refreshToken) throw new CustomError('Invalid refresh token', 403);
    //     const newAccessToken = generateAccessToken({ id: celebrity._id, role: user.role });
    //     return newAccessToken;
    // }else{
    //     let model;
    //     if(decoded.role==='admin') model = Admin;
    //     if(decoded.role==='user') model = User;
    //     const user = await model?.findById(decoded.id);
    //     if(!user || user.refreshToken != refreshToken) throw new CustomError('Invalid refresh token', 403);
    //     const newAccessToken = generateAccessToken({ id: user._id, role: user.role });
    //     return newAccessToken;
    // }
}

const googleAuthService = async(res: Response, credentialResponse : CredentialResponse)=>{
    const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);
    if (!credentialResponse) {
        throw new CustomError("No google credentials provided!", 400);
    }

    const googleUser = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: { Authorization: `Bearer ${credentialResponse.access_token}` },
        }
    );

    const { email, name, picture, id:googleId } = googleUser.data;

    let user = await User.findOne({ email }) || await Celebrity.findOne({email})
    let accessToken, refreshToken, newUser;
    
    if(!user){
        user = new User({ name, email, role:'user', profilePicture: picture, googleId})
        await user.save();
        accessToken = generateAccessToken({ id: user._id, role: 'user' });
        refreshToken = generateRefreshToken({ id: user._id, role: 'user' });
        user.refreshToken = refreshToken;
        await user.save();
        newUser = true;
    }else{
        accessToken = generateAccessToken({ id: user._id, role: user.role });
        refreshToken = generateRefreshToken({ id: user._id, role: user.role });
        user.refreshToken = refreshToken;
        await user.save();
        newUser = false;
    }
    if(!user) throw new CustomError("Google Auth faild !", 400);
    return {
        user,
        accessToken,
        refreshToken,
        role: user.role,
        newUser,
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