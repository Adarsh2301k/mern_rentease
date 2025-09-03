import express, { Router } from 'express'
import { registerUser ,loginUser,logoutUser,getProfile,updateProfile} from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js'



const router= Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/profile',protect,getProfile);
router.put('/updateProfile', protect, updateProfile);

export default router;