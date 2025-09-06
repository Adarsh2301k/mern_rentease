import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // backend URL
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
    headers: { Authorization: `Bearer ${token}` },
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


export default API;
