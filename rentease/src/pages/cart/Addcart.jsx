import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateCartItem } = useContext(CartContext);

  // ✅ Friendly empty state
  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty cart"
          className="w-32 h-32 mb-6 opacity-80"
        />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Your cart is empty 🛒
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet.
        </p>
        <Link
          to="/items"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Browse Items
        </Link>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, ci) => sum + (Number(ci.item.price) || 0) * ci.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">Your Cart</h1>
      <ul className="space-y-4">
        {cart.items.map((ci) => (
          <li
            key={ci.item._id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            {/* Left side: product image & details */}
            <div className="flex items-center gap-4">
              <img
                src={ci.item.image}
                alt={ci.item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-medium">{ci.item.name}</p>
                <p className="text-gray-500">₹{ci.item.price}</p>
              </div>
            </div>

            {/* Right side: quantity controls + remove */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateCartItem(ci.item._id, ci.quantity - 1)}
                disabled={ci.quantity <= 1}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span>{ci.quantity}</span>
              <button
                onClick={() => updateCartItem(ci.item._id, ci.quantity + 1)}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(ci.item._id)}
                className="text-red-500 ml-4"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Total & actions */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-semibold">Total: ₹{total}</p>
        <div className="flex gap-3">
          <Link to="/cart/checkout">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
