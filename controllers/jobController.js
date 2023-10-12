import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from 'dayjs';


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
    /* To aggregate stats count */
    let stats = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
    ]);

    /* Turn into stats objets to an array */
    stats = stats.reduce((acc,curr) => {
        const {_id:title, count} = curr;
        acc[title] = count;
        return acc;
    },{})
    
    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } }, // Take by userId
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                count: { $sum: 1 },
            },
        }, // Group by year/month and count size
        { $sort: { '_id.year': -1, '_id.month': -1 } }, // Sort desc
        { $limit: 6 }, // Limits to 6 index
    ])

    /* Turn into montlyApplication objets to an array */
    monthlyApplications = monthlyApplications
        .map((item) => {
            const { _id: { year, month }, count } = item;

            // const date = day().month(month - 1).year(year).format('MMM YY');

            const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');
            return {date, count}
        })
        .reverse()

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}