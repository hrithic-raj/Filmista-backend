import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";

export const getAllUsers = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const users = await User.find();
    res.status(201).json({
        status: "success",
        message: "All users fetched successfully",
        users,
    });
})