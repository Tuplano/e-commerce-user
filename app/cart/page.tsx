"use client";

import Link from "next/link";
import { useCart } from "@/context/CartonText";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, userEmail: "guest@example.com" }), // Replace with actual user data if you have auth
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
          <Link href="/" className="text-blue-600 underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3 space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex items-center justify-between border p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <Link
                    href={`/product/${item.productId}`}
                    className="text-lg font-medium hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold">${item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.productId, item.size)}
                  className="text-red-500 text-sm hover:underline mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <p className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </p>

          <hr className="my-2" />

          <button
            onClick={handleCheckout}
            className="w-full mt-4 bg-black text-white py-3 rounded hover:bg-zinc-800 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
