import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api" || "https://mern-rentease-1.onrender.com", // backend URL
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

  export const getItemById = (id, token) =>
  API.get(`/items/getItem/${id}`, {
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



export default API;
