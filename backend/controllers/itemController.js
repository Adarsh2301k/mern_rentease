import Item from "../models/itemModel.js";
import { CATEGORIES } from "../others/categories.js";

// Add new item with image, category, and type validation
export const addItem = async (req, res) => {
  try {
    const { name, description, price, category, type } = req.body;
    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message: "Name, price and category are required" });
    }

    // Validate category
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

    const imageUrl = req.file ? req.file.path : null; // Cloudinary URL

    const newItem = await Item.create({
      name,
      description,
      price,
      category: categoryLower,
      image: imageUrl,
      user: req.user._id,
      type: finalType, // ✅ store type
    });

    res
      .status(201)
      .json({ message: "Item added successfully", item: newItem });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update item (only owner)
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only update your own items" });
    }

    if (req.body.category) {
      const categoryLower = req.body.category.toLowerCase();
      if (!CATEGORIES.includes(categoryLower)) {
        return res.status(400).json({ message: "Invalid category selected" });
      }
      item.category = categoryLower;
    }

    // ✅ Handle type update
    if (req.body.type) {
      const allowedTypes = ["new", "second-hand", "rental"];
      const typeLower = req.body.type.toLowerCase();
      if (!allowedTypes.includes(typeLower)) {
        return res.status(400).json({ message: "Invalid type selected" });
      }
      item.type = typeLower;
    }

    if (req.file) item.image = req.file.path;
    Object.assign(item, req.body);
    await item.save();

    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Delete item (only owner)
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own items" });
    }

    await item.deleteOne();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all items (public)
// Get all items (public, with optional filters)
export const getItems = async (req, res) => {
  try {
    const { category, type } = req.query;


    // Build filter object dynamically
    const filter = {};

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


// Get items by category (public)

export const getCategories = (req, res) => {
  res.json(CATEGORIES);
};


export const myItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id }); 
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id).populate("user", "name email avatar");

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ success: true, item });
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};