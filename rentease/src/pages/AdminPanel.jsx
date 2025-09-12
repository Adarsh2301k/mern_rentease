import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getAllUsersAdmin,
  getAllItemsAdmin,
  getAllOrdersAdmin,
  approveItemAPI,
  rejectItemAPI,
  updateOrderStatus,
} from "../api";

const AdminPanel = () => {
  const { token } = useContext(AuthContext);
  const [tab, setTab] = useState("items"); // "items" | "users" | "orders"
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (tab === "users") fetchUsers();
    if (tab === "items") fetchItems();
    if (tab === "orders") fetchOrders();
  }, [tab]);

  // --- USERS ---
  const fetchUsers = async () => {
    try {
      const res = await getAllUsersAdmin(token);
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  // --- ITEMS ---
  const fetchItems = async () => {
    try {
      const res = await getAllItemsAdmin(token);
      const sorted = [...(res.data.items || [])].sort((a, b) => {
        const order = { pending: 1, approved: 2, rejected: 3 };
        return order[a.status] - order[b.status];
      });
      setItems(sorted);
    } catch (err) {
      console.error("Failed to load items", err);
    }
  };

  // --- ORDERS ---
  const fetchOrders = async () => {
    try {
      const res = await getAllOrdersAdmin(token);
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to load orders", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveItemAPI(id, token);
      fetchItems();
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectItemAPI(id, token);
      fetchItems();
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  const handleOrderStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status, token);
      fetchOrders();
    } catch (err) {
      console.error("Order status update failed", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-gray-50">
      {/* Mobile Tab Buttons */}
      <div className="flex lg:hidden justify-around bg-white shadow-md p-2 sticky top-16 z-10">
        <button
          onClick={() => setTab("items")}
          className={`flex-1 mx-1 py-2 rounded-lg font-medium ${
            tab === "items"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Items
        </button>
        <button
          onClick={() => setTab("users")}
          className={`flex-1 mx-1 py-2 rounded-lg font-medium ${
            tab === "users"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setTab("orders")}
          className={`flex-1 mx-1 py-2 rounded-lg font-medium ${
            tab === "orders"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Orders
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar (desktop only) */}
        <div className="hidden lg:flex flex-col w-64 bg-white shadow-md p-4">
          <button
            onClick={() => setTab("items")}
            className={`px-4 py-2 mb-2 rounded-lg font-medium text-left ${
              tab === "items"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Items
          </button>
          <button
            onClick={() => setTab("users")}
            className={`px-4 py-2 mb-2 rounded-lg font-medium text-left ${
              tab === "users"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`px-4 py-2 rounded-lg font-medium text-left ${
              tab === "orders"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Orders
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          {/* ITEMS */}
          {tab === "items" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-md rounded-xl p-4 flex flex-col"
                >
                  <img
                    src={item.image || "https://via.placeholder.com/200"}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {item.category} | {item.type}
                  </p>
                  <p className="font-medium text-gray-800">₹{item.price}</p>
                  <p className="text-sm text-gray-700">{item.description}</p>
                  <p
                    className={`mt-2 text-sm font-semibold ${
                      item.status === "pending"
                        ? "text-yellow-600"
                        : item.status === "approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.status
                      ? item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)
                      : "Unknown"}
                  </p>
                  {item.status === "pending" && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleApprove(item._id)}
                        className="flex-1 px-3 py-1 bg-green-600 text-white rounded-lg"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(item._id)}
                        className="flex-1 px-3 py-1 bg-red-600 text-white rounded-lg"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* USERS */}
          {tab === "users" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center"
                >
                  <img
                    src={user.avatar || "https://via.placeholder.com/100"}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover mb-3"
                  />
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  <p className="text-gray-600 text-sm">{user.mobileNumber}</p>
                </div>
              ))}
            </div>
          )}

          {/* ORDERS */}
          {tab === "orders" && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <p className="text-gray-500 text-center">No orders found</p>
              ) : (
                orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-xl shadow-md p-5 border"
                  >
                    {/* Order Header */}
                    <div className="flex justify-between items-center border-b pb-3 mb-3">
                      <div>
                        <p className="text-sm text-gray-500">
                          Order ID: {order._id}
                        </p>

                        <p className="text-sm text-gray-600">
                          Buyer:{" "}
                          <span className="font-medium">
                            {order.user?.name}
                          </span>{" "}
                          ({order.user?.email})
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : order.status === "delivered"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center gap-4 border-b pb-3 last:border-none"
                        >
                          <img
                            src={item.item?.image}
                            alt={item.item?.name}
                            className="w-14 h-14 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.item?.name}</p>
                            <p className="text-sm text-gray-500">
                              {item.quantity} × ₹{item.price}
                            </p>
                            <p className="text-sm text-black-400">
                              Seller:{" "}
                              <span className="font-medium">
                                {item.item?.user?.name}
                              </span>
                              <span className="font-medium">
                                ( {item.item?.user?.mobileNumber})
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center mt-4">
                      <p className="font-semibold text-lg">
                        Total: ₹{order.totalAmount}
                      </p>

                      {order.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleOrderStatus(order._id, "accepted")
                            }
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleOrderStatus(order._id, "cancelled")
                            }
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
