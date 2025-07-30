"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import CartSidebar from "./CartSideBar";
import {
  User,
  ChevronDown,
  LogOut,
  Settings,
  UserCircle,
  ShoppingCart,
  ListOrdered,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="flex items-center justify-between p-4  text-white">
      <Link href="/">Logo</Link>
      <div className="flex gap-10">
        <Link
          href="/"
          className={`relative before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:translate-x-[-50%] before:h-[2px] before:w-0 before:bg-white before:transition-all before:duration-300 hover:before:w-full
    ${pathname === "/" ? "before:w-full" : "before:w-0 hover:before:w-full"}
  `}
        >
          Home
        </Link>{" "}
        <Link
          href="/about"
          className={`relative before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:translate-x-[-50%] before:h-[2px] before:w-0 before:bg-white before:transition-all before:duration-300 hover:before:w-full
    ${
      pathname === "/about" ? "before:w-full" : "before:w-0 hover:before:w-full"
    }
  `}
        >
          About
        </Link>
        <Link
          href="/shop"
          className={`relative before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:translate-x-[-50%] before:h-[2px] before:w-0 before:bg-white before:transition-all before:duration-300 hover:before:w-full
    ${pathname === "/shop" ? "before:w-full" : "before:w-0 hover:before:w-full"}
  `}
        >
          Shop
        </Link>
        <Link
          href="/size-chart"
          className={`relative before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:translate-x-[-50%] before:h-[2px] before:w-0 before:bg-white before:transition-all before:duration-300 hover:before:w-full
    ${
      pathname === "/size-chart"
        ? "before:w-full"
        : "before:w-0 hover:before:w-full"
    }
  `}
        >
          Size Chart
        </Link>
      </div>

      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center gap-2">
            <div
              onClick={() => setIsCartOpen(true)}
              className="cursor-pointer hover:bg-gray-700 p-2 rounded-md transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
            </div>

          <button
            onClick={toggleDropdown}
            className="cursor-pointer flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md transition-colors"
          >
            <User className="w-5 h-5" />
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg border border-gray-200 z-50">
            {session?.user ? (
              <>
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium">
                    {session.user.name ?? "User"}
                  </p>
                  <p className="text-xs text-gray-500">{session.user.email}</p>
                </div>
                <div className="py-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <UserCircle className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <Link
  href="/orders"
  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
  onClick={() => setIsDropdownOpen(false)}
>
  <ListOrdered className="w-4 h-4" />
  Orders
</Link>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="py-1">
                <Link
                  href="/auth/login"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <CartSidebar 
      isOpen={isCartOpen} 
      onClose={() => setIsCartOpen(false)} 
      />

    </header>
  );
}
