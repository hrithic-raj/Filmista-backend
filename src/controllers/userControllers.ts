import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import User from "../models/userModel";
import CustomError from "../utils/customErrorHandler";
import { CelebrityRequest } from "../models/celebrityRequestModel";
import IUser from "../interfaces/userInterface";
import Celebrity from "../models/celebrityModel";
import Icelebrity from "../interfaces/celebrityInterface";


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
});

export const getProfile = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  let userData = req.user as IUser
  let user = await User.findById(userData._id).populate('genres').populate('languages');
  // if(user.role==='celebrity'){
  //   const celebrity = await Celebrity.findOne({userId:user._id}).populate('userId')
  //   res.status(200).json({
  //     status: "success",
  //     message: "User profile fetched",
  //     user: celebrity,
  //   });
  // }
  res.status(200).json({
    status: "success",
    message: "User profile fetched",
    user,
  });
});

export const addUserGenres = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  const user = req.user as any;
  const {genreIds} = req.body;

  if (!genreIds || !Array.isArray(genreIds))  throw new CustomError('Genres must be an array.', 400);
  
  const updatedUser = await User.findByIdAndUpdate(
    // user.userId ? user.userId._id : user._id,
    user._id,
    {$set:{genres: genreIds}},
    {new: true}
  );

  if (!updatedUser)  throw new CustomError('User not found.', 404);

  res.status(201).json({
    status: "success",
    message: "User genres updated",
    updatedUser,
  });
});

export const addUserLanguages = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  const user = req.user as any;
  const {langIds} = req.body;
  if (!langIds || !Array.isArray(langIds)) throw new CustomError('languages must be an array.', 400);

  const updatedUser = await User.findByIdAndUpdate(
    // user.userId?user.userId._id : user._id,
    user._id,
    {$set:{languages:langIds}},
    {new: true}
  );

  if (!updatedUser)  throw new CustomError('User not found.', 404);

  res.status(201).json({
    status: "success",
    message: "User languages updated",
    updatedUser,
  });
});


export const updateUserProfile = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  const userData = req.user as IUser;
  const {name, bio} = req.body;

  const user = await User.findById(userData._id);
  if(!user) next(new CustomError('User not found',404));
  
  let profilePictureUrl = user.profilePicture;
  let bannerUrl = user.banner;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if(files && files.profilePicture){
    profilePictureUrl = files.profilePicture?.[0]?.path;
  }

  if(files && files.banner){
    bannerUrl = files.banner?.[0]?.path;
  }

  user.name = name || user.name;
  user.bio = bio || user.bio;
  user.profilePicture = profilePictureUrl;
  user.banner = bannerUrl;
  await user.save();
  const updatedUser = await User.findById(user._id).populate('genres').populate('languages');
  res.status(200).json({
    status: "success",
    message: "User profile updated",
    user: updatedUser,
  });
});

