"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { CartSideBarProps } from "@/types/Cart";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartonText";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartSidebar({ isOpen, onClose }: CartSideBarProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { cart, removeFromCart } = useCart(); 

  useEffect(() => {
    console.log("Cart Items:", cart);
  }, [cart]);

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          email: session?.user?.email || "",
          userId:session?.user?.id,
        }),
      });

      const text = await response.text();

      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError);
        return;
      }

      if (response.ok && data?.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout failed:", data?.error || "Unknown error");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`text-black fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg z-[1000] transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      {/* Cart Content */}
      <div className="flex flex-col justify-between h-[calc(100%-64px)] p-4 overflow-y-auto">
        {cart.length === 0 ? (
          <div className="text-center mt-10">
            <p className="font-semibold mb-2">You have no items in your cart</p>
            <Link href="/shop" className="underline text-sm mb-6 block">
              Shop Latest
            </Link>
            {!session?.user && (
              <div className="w-full border-t pt-6 mt-6">
                <p className="text-sm mb-4">
                  Sign in to see any items you’ve previously added to your cart
                </p>
                <Link
                  href="/auth/login"
                  className="border px-4 py-2 text-sm rounded-md hover:bg-gray-100"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex items-center border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 px-4">
                  <Link
                    href={`/product/${item.productId}`}
                    className="font-medium hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId, item.size)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Subtotal + Checkout */}
        {cart.length > 0 && (
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold">Subtotal:</p>
              <p className="text-lg font-bold">${subtotal.toFixed(2)}</p>
            </div>
            <button
              onClick={handleCheckout}
              className="block w-full text-center bg-black text-white py-3 rounded-md hover:bg-zinc-800 transition"
            >
              Check Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
