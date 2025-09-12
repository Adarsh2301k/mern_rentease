import express from "express";
import protect from "../middleware/authMiddleware.js";
import { 
  createOrder, 
  getMyOrders, 
  getAllOrdersAdmin, 
  updateOrderStatus,
  getSellerOrders,
  cancelMyOrder
} from "../controllers/orderController.js";

const router = express.Router();

// User → place order
router.post("/neworder", protect, createOrder);

// User → get own orders
router.get("/my", protect, getMyOrders);

router.put("/cancel/:id", protect, cancelMyOrder);

// Seller → get all orders containing his items
router.get("/seller", protect, getSellerOrders);

// Admin → see all orders
router.get("/admin", protect, getAllOrdersAdmin);

// Admin → update order status
router.put("/:id/status", protect, updateOrderStatus);

export default router;
