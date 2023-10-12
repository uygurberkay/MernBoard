import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";

export const getCurrentUser = async (req,res) => {
    const user = await User.findOne({_id : req.user.userId}) // We placed auth middleware to UserId variable
    const userWithoutPassword = user.toJSON() // Help us to hide password
    res.status(StatusCodes.OK).json({user: userWithoutPassword})
}

export const getApplicationStats = async (req,res) => {
    const users = await User.countDocuments()
    const jobs = await Job.countDocuments()
    res.status(StatusCodes.OK).json({ users, jobs })
}

export const updateUser = async (req, res) => {
    console.log(req.file)
    const obj = {...req.body}
    delete obj.password; // To prevent in case of showing password to the user
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
    res.status(StatusCodes.OK).json({ msg: 'User updated' });
};