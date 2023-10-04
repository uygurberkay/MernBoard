import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

// Refactored to the Mongodb
export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({})
    res.status(StatusCodes.OK).json({ jobs });
};

// Refactored to the Mongodb
export const createJob = async (req, res) => {
    const { company, position } = req.body;
    try {
        const job = await Job.create({ company, position })
        res.status(StatusCodes.CREATED).json({ job })
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

// Refactored to the Mongodb
export const getJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
        return res.status(404).json({ message : `There is no job with id : ${id}` });
    }
    res.status(StatusCodes.OK).json({ job });
};

// Refactored to the Mongodb
export const updateJob = async (req, res) => {
    const { id }  = req.params;
    
    const updatedJob = await Job.findByIdAndUpdate(id , req.body , {
        new : true // Send the updated job 
    })

    if (!updatedJob) {
        return res.status(404).json({ message: `There is no job with id: ${id}`})
    }
    res.status(StatusCodes.OK).json({ job : updatedJob })
};

// Refactored to the Mongodb
export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const removedJob = await Job.findByIdAndDelete(id) // it returned deleted job

    if(!removedJob) { // if its return null it turn to true
        return res.status(404).json({ message: `No job with id : ${id}`})
    }
    res.status(StatusCodes.OK).json({ job: removedJob })
};