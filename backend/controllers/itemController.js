import Item from "../models/itemModel.js";
import { CATEGORIES } from "../others/categories.js";

// Add new item with image and category validation
export const addItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price and category are required" });
    }

    const categoryLower = category.toLowerCase();
    if (!CATEGORIES.includes(categoryLower)) {
      return res.status(400).json({ message: "Invalid category selected" });
    }

    const imageUrl = req.file ? req.file.path : null; // Cloudinary URL

    const newItem = await Item.create({
      name,
      description,
      price,
      category: categoryLower,
      image: imageUrl,
      user: req.user._id, // owner
    });

    res.status(201).json({ message: "Item added successfully", item: newItem });
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
      return res.status(403).json({ message: "You can only update your own items" });
    }

    if (req.body.category) {
      const categoryLower = req.body.category.toLowerCase();
      if (!CATEGORIES.includes(categoryLower)) {
        return res.status(400).json({ message: "Invalid category selected" });
      }
      item.category = categoryLower;
    }

    if (req.file) item.image = req.file.path; // update image if uploaded
    Object.assign(item, req.body); // update other fields
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
export const getItems = async (req, res) => {
  try {
    const items = await Item.find().populate("user", "name email");
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get items by category (public)
export const getItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const categoryLower = category.toLowerCase();

    const items = await Item.find({ category: categoryLower }).populate("user", "name email");

    if (items.length === 0) {
      return res.status(404).json({ message: `No items found in category: ${category}` });
    }

    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items by category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all categories
export const getCategories = (req, res) => {
  res.json(CATEGORIES);
};
