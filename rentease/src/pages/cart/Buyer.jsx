import React, { useEffect, useState, useContext } from "react";
import { getMyOrders } from "../../api.js";
import { AuthContext } from "../../context/AuthContext";
import { cancelMyOrder } from "../../api.js";

export default function Buyer() {
  const { isLoggedIn } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getMyOrders(token);
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching my orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoggedIn]);

  if (!isLoggedIn) return <p className="text-center py-10">Please login to see your orders.</p>;
  if (loading) return <p className="text-center py-10">Loading your orders...</p>;

  // 🎨 Status color styles
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  
  const handleCancel = async (orderId) => {
  try {
    const token = localStorage.getItem("token");
    await cancelMyOrder(orderId, token);

    // Refresh orders after cancel
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, status: "cancelled" } : o
      )
    );
  } catch (err) {
    console.error("Cancel failed", err);
    alert("Failed to cancel order.");
  }
};

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
  <div
    key={order._id}
    className="border rounded-lg p-4 shadow-sm bg-white"
  >
    {/* Header (ID + Status) */}
    <div className="flex justify-between items-center mb-3">
      <div className="text-sm text-gray-500">
        <span>Order ID: {order._id}</span>
      </div>
      <span
        className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[order.status]}`}
      >
        {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : "Unknown"}
      </span>
    </div>

    {/* Items list */}
    <div className="space-y-2">
      {order.items.map((item) => (
        <div key={item._id} className="flex items-center gap-4">
          <img
            src={item.item.image}
            alt={item.item.name}
            className="w-16 h-16 object-contain border rounded"
          />
          <div>
            <p className="font-medium">{item.item.name}</p>
            <p className="text-sm text-gray-500">
              {item.quantity} × Rs {item.price}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Footer (Total + Cancel Button) */}
    <div className="flex justify-between items-center mt-4">
      <p className="font-semibold">Total: Rs {order.totalAmount}</p>

      {order.status === "pending" && (
        <button
          onClick={() => handleCancel(order._id)}
          className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
        >
          Cancel Order
        </button>
      )}
    </div>
  </div>
))}
        </div>
      )}
    </div>
  );
}
