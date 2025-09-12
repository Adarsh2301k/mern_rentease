import express from 'express'
import protect from '../middleware/authMiddleware.js';
import parser from '../libs/multer.js';
import { addItem, getItems, updateItem, deleteItem ,myItems,getItemById,approveItem,rejectItem,getAllItemsAdmin,getItemByIdPrivate} from '../controllers/itemController.js';
import isAdmin from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/addItem', protect, parser.single("image"), addItem);
router.get('/getItem', getItems); // ✅ public, supports category & type
router.get("/manage/:id", protect, getItemByIdPrivate);
router.put('/updateItem/:id', protect, parser.single("image"), updateItem);
router.delete('/deleteItem/:id', protect, deleteItem);
router.get('/myItems', protect, myItems); 
router.get("/getItem/:id", getItemById);

// admin routes

router.get("/admin/items", protect, isAdmin, getAllItemsAdmin);
router.put('/admin/approve/:id', protect, isAdmin, approveItem);
router.put('/admin/reject/:id', protect, isAdmin, rejectItem);
export default router;
