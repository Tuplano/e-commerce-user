"use client"

import { X } from "lucide-react";
import Link from "next/link";
import { CartSideBarProps } from "@/types/Cart";
import { useSession } from "next-auth/react";



export default function CartSidebar({ isOpen, onClose }: CartSideBarProps) {
      const { data: session, status } = useSession();
    
  return (
    <div
      className={`text-black fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg z-[1000] transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center p-10 h-[calc(100%-64px)] text-center">
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m1-13h2m-6 0h.01"
            />
          </svg>
        </div>
        <p className="font-semibold mb-2">You have no items in your cart</p>
        <Link href="/shop" className="underline text-sm mb-6">
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
    </div>
  );
}