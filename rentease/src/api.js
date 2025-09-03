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

export default API;
