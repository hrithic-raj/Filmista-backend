import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import { CelebrityRequest } from "../models/celebrityRequestModel";
import Celebrity from "../models/celebrityModel";
import { Post } from "../models/postModel";
import CustomError from "../utils/customErrorHandler";

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
        message: "User blocked successfully",
        user,
    });
})

//Celebrity controllers

export const getAllCelebrities = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const celebrities = await Celebrity.find().populate('userId');
    res.status(201).json({
        status: "success",
        message: "All celebrities fetched successfully",
        celebrities,
    });
})

export const getCelebrityById = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const {celebrityId} = req.params;
    const celebrity = await Celebrity.findById(celebrityId).populate('userId');
    res.status(201).json({
        status: "success",
        message: "celebrity fetched successfully",
        celebrity,
    });
})

export const BlockCelebrity = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const {celebrityId} = req.params;
    const celebrityRef = (await Celebrity.findById(celebrityId));
    const userId = celebrityRef.userId;
    const celebrity = await User.findById(userId);
    celebrity.isBlocked = !celebrity.isBlocked;
    await celebrity.save();
    res.status(201).json({
        status: "success",
        message: "Celebrity blocked successfully",
        celebrity,
    });
})

export const getAllCelebrityRequest = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const requests = await CelebrityRequest.find();
    // console.log(requests)
    res.status(201).json({
        status: "success",
        message: "All users fetched successfully",
        requests,
    });
})

export const reviewCelebrityRequest = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const { requestId, status } = req.body;

    const request = await CelebrityRequest.findById(requestId);
    if (!request) throw new CustomError('Request not found', 404);
    
    if (request.status !== 'pending') throw new CustomError('Request has already been reviewed.', 400);
    
    if (status === 'approved') {
        const user = await User.findById(request.userId);
        if (!user) throw new CustomError('User not found', 404);
        
        const celebrity = new Celebrity({
            userId: request.userId,
            proofDocument: request.proofDocument,
        });

        await celebrity.save();
        //   await User.findByIdAndDelete(request.userId);
        user.role = 'celebrity'
        await user.save();
        
        const post = new Post({ celebrityId: celebrity._id, posts: [] });
        await post.save();
    }

    request.status = status;
    await request.save();

    res.status(200).json({
        status: "success",
        message: `Request ${status} successfully`,
        request,
    });
});


