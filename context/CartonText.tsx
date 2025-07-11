"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/types/Cart";

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p.productId === item.productId && p.size === item.size
      );

      if (existing) {
        return prev.map((p) =>
          p.productId === item.productId && p.size === item.size
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      } else {
        return [...prev, item];
      }
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size))
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
