"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CartItem } from "@/types/Cart";

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);

  // Merge localStorage cart with DB on login
  useEffect(() => {
    const loadCart = async () => {
      if (status === "authenticated") {
        try {
          const res = await fetch("/api/cart");
          const dbCart: CartItem[] = await res.json();

          // Check localStorage for cart to merge
          const stored = localStorage.getItem("cart");
          if (stored) {
            const parsed = JSON.parse(stored);
            const isFresh = Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000;
            const localCart: CartItem[] = isFresh ? parsed.cart : [];

            // Merge local cart with DB cart
            const merged: CartItem[] = [...dbCart];
            localCart.forEach((localItem) => {
              const existingIndex = merged.findIndex(
                (p) =>
                  p.productId === localItem.productId &&
                  p.size === localItem.size
              );
              if (existingIndex >= 0) {
                merged[existingIndex].quantity += localItem.quantity;
              } else {
                merged.push(localItem);
              }
            });

            // Save merged cart to DB
            await fetch("/api/cart", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ cart: merged }),
            });

            if (res.ok) {
              localStorage.removeItem("cart");
              console.log("🧼 Local storage cart cleared after DB merge");
              setCart(merged);
            } else {
              console.error("❌ Failed to save merged cart to DB");
            }
          } else {
            setCart(dbCart);
          }
        } catch (err) {
          console.error("Failed to fetch or merge cart from DB", err);
        }
      } else if (status === "unauthenticated") {
        const stored = localStorage.getItem("cart");
        if (stored) {
          const parsed = JSON.parse(stored);
          const isFresh = Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000;
          if (isFresh) setCart(parsed.cart);
          else localStorage.removeItem("cart");
        }
      }
    };

    loadCart();
  }, [status]);

  // Sync cart to DB or localStorage when cart changes
  useEffect(() => {
    if (cart.length === 0) return;

    if (status === "authenticated") {
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      }).catch((err) => console.error("Failed to sync cart with DB", err));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify({ cart, timestamp: Date.now() })
      );
    }
  }, [cart, status]);

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
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => {
      const updatedCart = prev.filter(
        (item) => !(item.productId === productId && item.size === size)
      );

      if (status === "authenticated") {
        fetch("/api/cart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, size }),
        }).catch((err) => console.error("Failed to remove item from DB", err));
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify({ cart: updatedCart, timestamp: Date.now() })
        );
      }

      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");

    if (status === "authenticated") {
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: [] }),
      });
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
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
