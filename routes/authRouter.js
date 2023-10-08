import { Router } from 'express';
import { validateLoginInput, validateRegisterInput } from '../middleware/validationMiddleware.js';
import { 
    login,
    register,
} from '../controllers/authController.js';


const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);

export default router;