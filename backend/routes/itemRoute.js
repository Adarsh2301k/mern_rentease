import express from 'express'
import protect from '../middleware/authMiddleware.js';
import parser from '../libs/multer.js';
import { addItem, getItems, updateItem, deleteItem ,myItems,getItemById} from '../controllers/itemController.js';

const router = express.Router();

router.post('/addItem', protect, parser.single("image"), addItem);
router.get('/getItem', getItems); // ✅ public, supports category & type
router.put('/updateItem/:id', protect, parser.single("image"), updateItem);
router.delete('/deleteItem/:id', protect, deleteItem);
router.get('/myItems', protect, myItems); 
router.get("/getItem/:id", getItemById);
export default router;
