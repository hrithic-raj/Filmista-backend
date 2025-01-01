import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import Celebrity from "../models/celebrityModel";
import CustomError from "../utils/customErrorHandler";
import { generateOTP, sendEmail } from "../utils/otp";

export const otpGenerator = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.body;
    console.log(email)

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