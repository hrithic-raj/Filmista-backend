import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import CustomError from "../utils/customErrorHandler";
import { CelebrityRequest } from "../models/celebrityRequestModel";
import IUser from "../interfaces/userInterface";


export const submitCelebrityRequest = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  const user = req.user as IUser;
  if (!user) throw new CustomError('User not authenticated', 401);
  if(!req.file) throw new CustomError('Proof document is required', 400);
  
  const proofDocument = req.file.path;

  const existingRequest = await CelebrityRequest.findOne({
    userId: user._id,
    status: {$in:['pending', 'approved']},
  });
  
  if(existingRequest) throw new CustomError('You already have a pending or approved request.', 400);
  
  const request = new CelebrityRequest({ userId: user._id, proofDocument});
  await request.save();
  res.status(201).json({
      status: "success",
      message: "Request submitted successfully",
      request,
  });
})

export const getProfile = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  const user = req.user
  res.status(201).json({
    status: "success",
    message: "User profile fetched",
    user,
  });
})