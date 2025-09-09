import express from "express";
import  protect  from "../middleware/authMiddleware.js";
import { addToCart ,getCart,updateCartItem,removeFromCart,clearCart} from "../controllers/cartConotroller.js";
const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update/:itemId", protect, updateCartItem);
router.delete("/remove/:itemId", protect, removeFromCart);
router.delete("/clear", protect, clearCart);

export default router;
