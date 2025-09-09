import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  if (!cart || cart.items.length === 0) {
    return <p className="text-center py-10">Your cart is empty</p>;
  }

  // calculate total
  const total = cart.items.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  );

  const handlePlaceOrder = () => {
    alert(`Order placed with ${paymentMethod.toUpperCase()} for ₹${total}`);
    clearCart();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul className="divide-y">
          {cart.items.map((ci) => (
            <li
              key={ci.item._id}
              className="flex justify-between py-2 text-gray-700"
            >
              <span>
                {ci.item.name} × {ci.quantity}
              </span>
              <span>₹{ci.item.price * ci.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>
      </div>

      {/* Payment Options */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <span>Cash on Delivery</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
            />
            <span>UPI / Net Banking</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            <span>Credit / Debit Card</span>
          </label>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="w-full border border-green-600 text-green-600 py-3 rounded text-lg font-medium hover:bg-green-500 hover:text-white transition"
      >
        Place Order & Pay
      </button>
    </div>
  );
}
