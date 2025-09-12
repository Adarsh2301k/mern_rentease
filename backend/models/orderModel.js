import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // snapshot of price at time of order
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "delivered", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "online"],
      default: "COD",
    },
    shippingAddress: { type: String }, // optional for now
    platformFee: {
  type: Number,
  default: 0,
},

  },
  
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
