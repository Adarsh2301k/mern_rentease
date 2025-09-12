// controllers/orderController.js
import Order from "../models/orderModel.js";
import Item from "../models/itemModel.js";
import User from "../models/userModel.js";
// ✅ Create new order (User)
export const createOrder = async (req, res) => {
  try {
    const { items, paymentMethod, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const orderItem of items) {
      const dbItem = await Item.findById(orderItem.item);

      if (!dbItem) {
        return res.status(404).json({ message: "Item not found" });
      }

      if (dbItem.quantity < orderItem.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${dbItem.name}. Available: ${dbItem.quantity}`,
        });
      }

      // ✅ Deduct quantity
      dbItem.quantity -= orderItem.quantity;
      await dbItem.save();

      const itemTotal = dbItem.price * orderItem.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        item: dbItem._id,
        quantity: orderItem.quantity,
        price: dbItem.price,
      });
    }

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount,
       paymentMethod: paymentMethod || "COD",
      shippingAddress,
      platformFee: totalAmount * 0.05, // example 5% fee, can change
    });
    console.log("Incoming order body:", req.body);

    await order.save();
    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get my orders (User)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.item", "name price image")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// controllers/orderController.js
export const cancelMyOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({ _id: id, user: req.user._id }).populate("items.item");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Only pending orders can be cancelled" });
    }

    // ✅ Restore stock
    for (const orderItem of order.items) {
      const dbItem = orderItem.item;
      if (dbItem) {
        dbItem.quantity += orderItem.quantity;
        await dbItem.save();
      }
    }

    order.status = "cancelled";
    await order.save();

    res.json({ success: true, order });
  } catch (err) {
    console.error("Error cancelling order:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get seller's orders (Seller dashboard)
export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // Find orders with status "accepted" that contain this seller's items
    const orders = await Order.find({
      status: "accepted", // ✅ only accepted orders
      "items.item": { $exists: true },
    })
      .populate({
        path: "items.item",
        match: { user: sellerId }, // only include seller’s items
        select: "name price image user",
      })
      .populate("user", "name email mobileNumber address") // buyer info
      .sort({ createdAt: -1 });

    // Filter out items that don't belong to this seller
    const filteredOrders = orders
      .map((order) => ({
        ...order.toObject(),
        items: order.items.filter((i) => i.item !== null),
      }))
      .filter((order) => order.items.length > 0);

    res.json({ success: true, orders: filteredOrders });
  } catch (err) {
    console.error("Error fetching seller orders:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get all orders (Admin)
export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "items.item",
        select: "name price image user", // item fields
        populate: {
          path: "user", // seller inside the item
          select: "name email mobileNumber", // only send safe fields
        },
      })
      .populate("user", "name email") // buyer info
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching admin orders:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Update order status (Admin)
// controllers/orderController.js
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id).populate("items.item");
    if (!order) return res.status(404).json({ message: "Order not found" });

    // If cancelling, restore stock
    if (status === "cancelled" && order.status !== "cancelled") {
      for (const orderItem of order.items) {
        const dbItem = orderItem.item;
        if (dbItem) {
          dbItem.quantity += orderItem.quantity; // restore stock
          await dbItem.save();
        }
      }
    }

    order.status = status;
    await order.save();

    res.json({ success: true, order });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: "Server error" });
  }
};

