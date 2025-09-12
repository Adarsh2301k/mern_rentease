import express, { Router } from 'express'
import { registerUser ,loginUser,logoutUser,getProfile,updateProfile,getAllUsersAdmin} from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js'
import parser from "../libs/multer.js";
import isAdmin from '../middleware/adminMiddleware.js';



const router= Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/profile',protect,getProfile);
router.put("/updateProfile", protect, parser.single("avatar"), updateProfile);
// admin
router.get("/admin/users", protect, isAdmin, getAllUsersAdmin);

export default router;