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

export const getUserById = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const {userId} = req.params;
    const user = await User.findById(userId);
    res.status(201).json({
        status: "success",
        message: "user fetched successfully",
        user,
    });
})

export const BlockUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const {userId} = req.params;
    const user = await User.findById(userId);
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.status(201).json({
        status: "success",
        message: "All users fetched successfully",
        user,
    });
})


