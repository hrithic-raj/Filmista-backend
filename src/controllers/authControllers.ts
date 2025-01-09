import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import Celebrity from "../models/celebrityModel";
import CustomError from "../utils/customErrorHandler";
import { generateOTP, sendEmail } from "../utils/otp";
import { authenticateUser, createAdmin, createUser, googleAuthService, refreshTokenService } from "../services/authServices";
import { clearCookie, cookieSaver } from "../utils/jwtTokenGenerator";


export const otpGenerator = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.body;
    let user = await User.findOne({email});
    if(!user){
        user = await Celebrity.findOne({email});
    }
    if (user) {
        const error = new CustomError('Email Already Exist, Please Signin', 400)
        return next(error)
    }else{
        const otp = generateOTP();
        await sendEmail(email, otp)
        res.status(201).json({
          status: "success",
          message: "OTP sent to email",
          otp: otp,
        });
    }
})

export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {user, accessToken, refreshToken, role} = await createUser(req.body);
    // const {user, accessToken, refreshToken, role} = await createAdmin(req.body);
    cookieSaver(res,refreshToken);
    res.status(201).json({
        status: "success",
        message: "User registered successfully",
        user,
        accessToken,
        refreshToken,
        role,
    });
})

export const signin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    const {user, accessToken, refreshToken, role} = await authenticateUser(email, password);
    cookieSaver(res,refreshToken);
    res.status(200).json({
        status: "success",
        message: "Signin successful",
        user,
        accessToken,
        refreshToken,
        role
    });
})

export const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(req.cookies.refreshToken);
    
    if(!refreshToken){
        const error = new CustomError('Refresh token required', 401)
        return next(error)
    }
    const newAccessToken = await refreshTokenService(refreshToken)
    cookieSaver(res,refreshToken);
    res.status(200).json({
        status: "success",
        message: "New AccessToken created",
        newAccessToken
    });
})

export const googleAuth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email, name, picture, sub: googleId} = req.user as {
        email: string, 
        name: string, 
        picture: string, 
        sub: string;
    };
    
    const {user, accessToken, refreshToken} = await googleAuthService(email, name, picture, googleId);
    res.status(200).json({
        status: "success",
        message: "Login successful via Google",
        user,
        accessToken,
        refreshToken,
    });
    res.redirect('/home');
})

export const signout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    clearCookie(res);
    res.status(200).json({ message: 'Logged out successfully' });
})

// export const googleAuthCallback = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

// })