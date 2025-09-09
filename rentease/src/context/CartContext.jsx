// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import {
  addToCartAPI,
  getCartAPI,
  updateCartItemAPI,
  removeFromCartAPI,
  clearCartAPI,
} from "../api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  // Fetch cart on login or refresh
  useEffect(() => {
    if (token) fetchCart();
    else setCart({ items: [] });
  }, [token]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCartAPI(token);
      setCart(res.data || { items: [] });
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  // ➕ Add to cart
  const addToCart = async (itemId, quantity = 1) => {
    try {
      const res = await addToCartAPI(itemId, quantity, token);
      setCart(res.data); // backend returns updated cart
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  // ✏️ Update item quantity
  const updateCartItem = async (itemId, quantity) => {
    try {
      const res = await updateCartItemAPI(itemId, quantity, token);
      setCart(res.data);
    } catch (err) {
      console.error("Update cart failed:", err);
    }
  };

  // ❌ Remove item
  const removeFromCart = async (itemId) => {
    try {
      const res = await removeFromCartAPI(itemId, token);
      setCart(res.data);
    } catch (err) {
      console.error("Remove from cart failed:", err);
    }
  };

  // 🧹 Clear entire cart
  const clearCart = async () => {
    try {
      const res = await clearCartAPI(token);
      setCart(res.data.cart || { items: [] });
    } catch (err) {
      console.error("Clear cart failed:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, loading, fetchCart, addToCart, updateCartItem, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
