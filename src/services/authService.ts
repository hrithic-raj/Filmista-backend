import IUser from "../interfaces/userInterface";
import User from "../models/userModel";
import CustomError from "../utils/customErrorHandler";
import bcrypt from 'bcrypt'
import jwtTokenGenerator from "../utils/jwtTokenGenerator";


interface IUserResponse {
    user: IUser;
    accessToken: string;
    refreshToken: string;
}

const createUser = async (userData: IUser): Promise<IUserResponse> => {
    const {name, email, password, otp} = userData;
    let user = await User.findOne({email});
    if(user) throw new CustomError('User Already Exist, Please Signin', 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, otp});
    await user.save();
    const {accessToken, refreshToken} = await jwtTokenGenerator(user._id);

    user.refreshToken = refreshToken;
    await user.save();
    
    return {
        user,
        accessToken,
        refreshToken
    }
}
export {
    createUser,
}