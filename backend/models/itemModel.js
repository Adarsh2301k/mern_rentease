import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: ["new", "second-hand", "rental"],
    lowercase: true,
    default: "second-hand", // fallback for old items
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "sold", "rented"],
    default: "pending",
  },
  quantity: { type: Number, default: 1, min: 0 },


})

const item = mongoose.model("Item", itemSchema);
export default item;
