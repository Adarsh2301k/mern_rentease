import Cart from "../models/cartModel.js";
import Item from "../models/itemModel.js";

// ➕ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    // check if item exists
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // find user's cart or create new
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // check if item already in cart
    const itemIndex = cart.items.findIndex(
      (i) => i.item.toString() === itemId
    );

    if (itemIndex > -1) {
      // if exists, update quantity
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      // else push new item
      cart.items.push({ item: itemId, quantity: quantity || 1 });
    }

    await cart.save();

    // 🔥 Populate before returning
    const populatedCart = await Cart.findById(cart._id).populate("items.item");

    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🛒 Get logged-in user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.item");
    if (!cart) return res.status(200).json({ items: [] });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Update item quantity in cart
export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (i) => i.item.toString() === itemId
    );

    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not in cart" });

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    // 🔥 Populate
    const populatedCart = await Cart.findById(cart._id).populate("items.item");

    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.item.toString() !== itemId);
    await cart.save();

    // 🔥 Populate
    const populatedCart = await Cart.findById(cart._id).populate("items.item");

    res.status(200).json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🧹 Clear entire cart
export const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    // 🔥 Populate
    const populatedCart = await Cart.findById(cart._id).populate("items.item");

    res.status(200).json({ message: "Cart cleared", cart: populatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
