import React, { useEffect, useState, useContext } from "react";
import { getSellerOrders } from "../../api.js";
import { AuthContext } from "../../context/AuthContext";

export default function Seller() {
  const { isLoggedIn } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getSellerOrders(token);
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching seller orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoggedIn]);

  if (!isLoggedIn) return <p className="text-center py-10">Please login to see your orders.</p>;
  if (loading) return <p className="text-center py-10">Loading your sales orders...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Orders for My Items</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No one has ordered your items yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 shadow-sm bg-white">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Order ID: {order._id}</span>
                <span>Buyer: {order.user?.name || "Unknown" } 
                <br/>
                MobileNo: {order.user?.mobileNumber || "Unknown"}
                <br/>
                Address: {order.user?.address || "Unknown"}
                </span>
              </div>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item._id} className="flex items-center gap-4">
                    <img src={item.item.image} alt={item.item.name} className="w-16 h-16 object-contain border rounded" />
                    <div>
                      <p className="font-medium">{item.item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × Rs {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-semibold mt-3">Total: Rs {order.totalAmount}</p>
              <p className="text-xs text-gray-500">Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
