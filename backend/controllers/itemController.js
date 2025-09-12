import Item from "../models/itemModel.js";
import { CATEGORIES } from "../others/categories.js";

// Add new item
export const addItem = async (req, res) => {
  try {
    const { name, description, price, category, type, quantity } = req.body;
    if (!name || !price || !category || !quantity) {
      return res.status(400).json({ message: "Name, price, category and quantity are required" });
    }

    // ✅ Validate category
    const categoryLower = category.toLowerCase();
    if (!CATEGORIES.includes(categoryLower)) {
      return res.status(400).json({ message: "Invalid category selected" });
    }

    // ✅ Validate type
    const allowedTypes = ["new", "second-hand", "rental"];
    let finalType = "second-hand"; // default
    if (type) {
      const typeLower = type.toLowerCase();
      if (!allowedTypes.includes(typeLower)) {
        return res.status(400).json({ message: "Invalid type selected" });
      }
      finalType = typeLower;
    }

    const imageUrl = req.file ? req.file.path : null;

    const newItem = await Item.create({
      name,
      description,
      price,
      category: categoryLower,
      image: imageUrl,
      user: req.user.id,
      type: finalType,
      quantity,
    });

    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// private routes
// controllers/itemController.js
export const getItemByIdPrivate = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id).populate("user", "name email avatar");

    if (!item) return res.status(404).json({ message: "Item not found" });

    // ✅ Only owner or admin can access this
    if (item.user._id.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to view this item" });
    }

    res.status(200).json({ success: true, item });
  } catch (error) {
    console.error("Error fetching private item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update item (owner or admin)
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // ✅ Allow owner OR admin
    if (item.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this item" });
    }

    // ✅ Validate category
    if (req.body.category) {
      const categoryLower = req.body.category.toLowerCase();
      if (!CATEGORIES.includes(categoryLower)) {
        return res.status(400).json({ message: "Invalid category selected" });
      }
      item.category = categoryLower;
    }

    // ✅ Validate type
    if (req.body.type) {
      const allowedTypes = ["new", "second-hand", "rental"];
      const typeLower = req.body.type.toLowerCase();
      if (!allowedTypes.includes(typeLower)) {
        return res.status(400).json({ message: "Invalid type selected" });
      }
      item.type = typeLower;
    }

    // ✅ Update image if uploaded
    if (req.file) {
      item.image = req.file.path;
    }

    // ✅ Assign other updatable fields (but don’t allow status change here)
    const { status, ...updates } = req.body;
    Object.assign(item, updates);
    // ✅ Prevent seller from updating once approved
if (item.status === "approved" && req.user.role !== "admin") {
  return res.status(403).json({ message: "Approved items cannot be updated by seller" });
}


    await item.save();
    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete item (owner or admin)
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this item" });
    }

    await item.deleteOne();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all approved items (public, with optional filters)
export const getItems = async (req, res) => {
  try {
    const { category, type } = req.query;
    const filter = { status: "approved", quantity: { $gt: 0 } };

    if (category) {
      filter.category = category.toLowerCase();
    }

    if (type) {
      const allowedTypes = ["new", "second-hand", "rental"];
      const typeLower = decodeURIComponent(type).toLowerCase();
      if (!allowedTypes.includes(typeLower)) {
        return res.status(400).json({ message: "Invalid type filter" });
      }
      filter.type = typeLower;
    }

    const items = await Item.find(filter).populate("user", "name email");
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get categories
export const getCategories = (req, res) => {
  res.json(CATEGORIES);
};

// Get my items
export const myItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id })
      .select("name price category status type image createdAt");

    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get item by ID
// Get item by ID
// Get item by ID
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id).populate("user", "name email avatar");

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // ✅ Public can view approved items
    if (item.status === "approved") {
      return res.status(200).json({ success: true, item });
    }

    // 🚫 Unapproved items → only owner or admin can see
    if (req.user && (item.user._id.toString() === req.user.id || req.user.role === "admin")) {
      return res.status(200).json({ success: true, item });
    }

    return res.status(403).json({ message: "This item is not available" });
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Admin: get all items
export const getAllItemsAdmin = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ items });
  } catch (error) {
    console.error("Error fetching all items (admin):", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin: approve item
export const approveItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.status = "approved";
    await item.save();

    res.status(200).json({ message: "Item approved", item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: reject item
export const rejectItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.status = "rejected";
    await item.save();

    res.status(200).json({ message: "Item rejected", item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
