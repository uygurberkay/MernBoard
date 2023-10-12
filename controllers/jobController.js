import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';


// Refactored to the Mongodb
export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy : req.user.userId})
    res.status(StatusCodes.OK).json({ jobs });
};

// Refactored to the Mongodb
export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};

// Refactored to the Mongodb
export const getJob = async (req, res) => {
    const job = await Job.findById(req.params.id);
    res.status(200).json({ job });
};

// Refactored to the Mongodb
export const updateJob = async (req, res) => {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id , req.body , {
        new : true // Send the updated job 
    })

    res.status(StatusCodes.OK).json({ job : updatedJob })
};

// Refactored to the Mongodb
export const deleteJob = async (req, res) => {
    const removedJob = await Job.findByIdAndDelete(req.params.id) // it returned deleted job
    res.status(StatusCodes.OK).json({ job: removedJob })
};

export const showStats =  async (req,res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        // { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
    ]);
    console.log(stats);
    const defaultStats = {
        pending: 22,
        interview: 11,
        declined: 4,
    };
    let monthlyApplications = [
        {
            date: 'May 23',
            count: 12,
        },
        {
            date: 'Jun 23',
            count: 9,
        },
        {
            date: 'Jul 23',
            count: 3,
        },
    ];
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}