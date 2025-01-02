import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import Celebrity from "../models/celebrityModel";
import CustomError from "../utils/customErrorHandler";
import { generateOTP, sendEmail } from "../utils/otp";
import { authenticateUser, createUser, refreshTokenService } from "../services/authService";


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
    // const {name, email, password, otp} = req.body;
    const {user, accessToken, refreshToken} = await createUser(req.body);
    res.status(201).json({
        status: "success",
        message: "User registered successfully",
        user,
        accessToken,
        refreshToken,
    });
})

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    const user = await authenticateUser(email, password);
    res.status(200).json({
        status: "success",
        message: "Login successful",
        user
    });
})

export const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {refreshToken} = req.body;
    if(!refreshToken){
        const error = new CustomError('Refresh token required', 401)
        return next(error)
    }
    const newAccessToken = await refreshTokenService(refreshToken)
    res.status(200).json({
        status: "success",
        message: "New AccessToken created",
        newAccessToken
    });
})
