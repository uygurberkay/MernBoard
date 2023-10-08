import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constant.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            console.log(errorMessages)
            if (errorMessages[0].startsWith('Invalid')) {
                throw new NotFoundError(errorMessages);
            }
            if (errorMessages[0].startsWith('not authorized')) {
                throw new UnauthorizedError('not authorized to access this route');
            }
            throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
};

export const validateJobInput = withValidationErrors ([
    body('company').notEmpty().withMessage('Company is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('jobLocation').notEmpty().withMessage('Job location is required'),
    body('jobStatus')
        .isIn(Object.values(JOB_STATUS))
        .withMessage('Invalid status value'),
    body('jobType')
        .isIn(Object.values(JOB_TYPE))
        .withMessage('Invalid job type'),
])

export const validateIdParam = withValidationErrors([
    param('id')
        .custom(async (value, {req}) =>{
            const isValidMongoId = mongoose.Types.ObjectId.isValid(value)
            if(!isValidMongoId) throw new BadRequestError('Invalid MongoDB ID')
            const job = await Job.findById(value);
            if (!job) throw new NotFoundError(`There is no ID : ${value}`);
            const isAdmin = req.user.role === 'admin';
            const isOwner = req.user.userId === job.createdBy.toString();
            // If we change this && to || admin rule over all jobs (edit, create, etc..)
            if (!isAdmin && !isOwner) throw new UnauthorizedError('not authorized to access this route');

        })
])

export const validateRegisterInput = withValidationErrors([
    // body names must be match with database names
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (email) => {
            // Checks the email is already in database
            const user = await User.findOne({email})
            if(user) {
                throw new BadRequestError('Email already exist')
            }
        }),
        body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 8}).withMessage('Password must be at least 8 characters long'),
        body('location').notEmpty().withMessage('Location is required'),
        body('lastName').notEmpty().withMessage('LastName is required')
])


export const validateLoginInput = withValidationErrors([
    // body names must be match with database names
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required')
])