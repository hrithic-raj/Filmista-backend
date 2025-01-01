import { Request, Response } from "express";
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { config } from "../config/confiq";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS as string,
    },
});

export const generateOTP = (): string =>{
    const otp = crypto.randomInt(100000, 999999);
    return otp.toString();
}

export const sendEmail = async (email: string , otp: string) => {
    try{
        const mailOptions = {
            from: config.EMAIL_USER,
            to: email,
            subject: `Filmista Registration`,
            text: `Your 6 Digit OTP Verification Code is : ${otp}`,
        };

        await transporter.sendMail(mailOptions);
    }catch(error){
        console.error('Error sending OTP email : ',error);
    }
};