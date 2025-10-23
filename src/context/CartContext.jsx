import React, { createContext, useEffect, useState } from "react";

// Allow exporting context from this file alongside provider for simplicity in this project.
/* eslint-disable-next-line react-refresh/only-export-components */
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize from localStorage to persist cart between reloads
  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (err) {
      // Warn on storage write errors (e.g., quota or privacy mode)
      console.warn("CartContext localStorage write error:", err);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    // normalize id fallback for static products
    const id = product.id ?? `${product.title ?? product.nombre}-${product.price ?? product.precio}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, id, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
