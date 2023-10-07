import { Router } from 'express';
import { validateRegisterInput } from '../middleware/validationMiddleware.js';
import { 
    login,
    register,
} from '../controllers/authController.js';


const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateRegisterInput, login);

export default router;