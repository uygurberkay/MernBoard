import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import {comparePassword, hashedPassword} from './../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
    const isFirstAccount = await User.countDocuments() === 0;
    // Adjust first register account to admin others to user
    req.body.role = isFirstAccount ? 'admin': 'user';

    const hashedPassowrd = await hashedPassword(req.body.password)
    req.body.password = hashedPassowrd;
    
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg : 'User created' });
};


export const login = async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    const isValidUser = 
        user && 
        (await comparePassword(req.body.password, user.password))
    if(!isValidUser) throw new UnauthenticatedError('Invalid credentials!')
    // We store jwt on cookies here, instead of localStorage
    const token = createJWT({userId: user._id , role: user.role})

    const oneDay = 1000 * 60 * 60 * 24 // 1 day in miliseconds

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production', // works only on production
    })
    res.status(StatusCodes.OK).json({msg : 'User logged in'})
}

export const logout = async (req,res) => {
    // when works token cookies expires
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: 'User logged out.'})
}