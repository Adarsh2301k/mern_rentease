import axios from "axios";

const API = axios.create({
  baseURL:  "https://mern-rentease-1.onrender.com/api", 
  // baseURL:  "http://localhost:4000/api",
});

// Auth endpoints
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getProfile = (token) =>
  API.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProfile = (data, token) =>
  API.put("/auth/updateProfile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // 👈 important for file upload
    },
  });

export const logoutUser = () => API.post("/auth/logout");

// items endpoints


export const addItem = (data, token) =>
  API.post("/items/addItem", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getItems = (filters = {}) =>
  API.get("/items/getItem", { params: filters });

// ✅ simplified: no token needed for fetching single item
export const getItemById = (id) =>
  API.get(`/items/getItem/${id}`);

export const getItemByIdPrivate = (id, token) =>
  API.get(`/items/manage/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });


export const updateItem = (id, data, token) =>
  API.put(`/items/updateItem/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteItem = (id, token) =>
  API.delete(`/items/deleteItem/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getMyItems = (token) =>
  API.get("/items/myItems", {
    headers: { Authorization: `Bearer ${token}` },
  });



  // cart endpoints
export const addToCartAPI = (itemId, quantity = 1, token) =>
  API.post(
    "/cart/add",
    { itemId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const getCartAPI = (token) =>
  API.get("/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateCartItemAPI = (itemId, quantity, token) =>
  API.put(
    `/cart/update/${itemId}`,
    { quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const removeFromCartAPI = (itemId, token) =>
  API.delete(`/cart/remove/${itemId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const clearCartAPI = (token) =>
  API.delete("/cart/clear", {
    headers: { Authorization: `Bearer ${token}` },
  });



// admin endpoints// Admin APIs
export const getAllItemsAdmin = (token) =>
  API.get("/items/admin/items", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const approveItemAPI = (id, token) =>
  API.put(`/items/admin/approve/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const rejectItemAPI = (id, token) =>
  API.put(`/items/admin/reject/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllUsersAdmin = (token) =>
  API.get("/auth/admin/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
// orders endpoints for admin

export const getAllOrdersAdmin = (token) =>
  API.get("/orders/admin", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateOrderStatus = (id, status, token) =>
  API.put(`/orders/${id}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );

// orders endpoints
export const getMyOrders = (token) =>
  API.get("/orders/my", { headers: { Authorization: `Bearer ${token}` } });

// Seller orders
export const getSellerOrders = (token) =>
  API.get("/orders/seller", { headers: { Authorization: `Bearer ${token}` } });

// orders
export const createOrder = (data, token) =>
  API.post("/orders/neworder", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const cancelMyOrder = (id, token) =>
  API.put(`/orders/cancel/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });



  export default API;
