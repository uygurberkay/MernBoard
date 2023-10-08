import { Router } from 'express';
import { validateLoginInput, validateRegisterInput } from '../middleware/validationMiddleware.js';
import { 
    login,
    logout,
    register,
} from '../controllers/authController.js';


const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);

export default router;