import express from 'express'
import protect from '../middleware/authMiddleware.js';
import parser from '../libs/multer.js';
import { addItem, getItems, updateItem, deleteItem } from '../controllers/itemController.js';

const router = express.Router();

router.post('/add-item', protect, parser.single("image"), addItem);
router.get('/get-items', getItems); // ✅ public, supports category & type
router.put('/update-item/:id', protect, parser.single("image"), updateItem);
router.delete('/delete-item/:id', protect, deleteItem);

export default router;
