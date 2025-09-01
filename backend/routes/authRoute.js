import express, { Router } from 'express'
import { registerUser ,loginUser,logoutUser,getProfile} from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js'



const router= Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/profile',protect,getProfile);

export default router;