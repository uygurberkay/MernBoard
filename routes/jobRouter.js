import { Router } from 'express';
import { validateJobInput ,validateIdParam } from '../middleware/validationMiddleware.js';
import {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
} from '../controllers/jobController.js';

const router = Router();

router.route('/')
    .get(getAllJobs)
    .post(validateJobInput,createJob);
router.route('/:id')
    .get(validateIdParam ,getJob)
    .patch(validateIdParam, validateJobInput, updateJob)
    .delete(validateIdParam, deleteJob);

export default router;