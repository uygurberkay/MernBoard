import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
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
        .custom(async (value) =>{
            const isValidId = mongoose.Types.ObjectId.isValid(value)
            if(!isValidId) throw new BadRequestError('Invalid MongoDB ID')
            const job = await Job.findById(value);

    if (!job) throw new NotFoundError(`There is no ID : ${value}`);
        }).withMessage('Invalid MongoDB ID')
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