import React from "react";
import { ProductType } from "@/types/product";
import Link from "next/link";


export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="group relative bg-zinc-800/50 backdrop-blur-sm rounded overflow-hidden border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-900/50 cursor-pointer">
      <div className="relative overflow-hidden bg-gradient-to-br from-zinc-700/30 to-zinc-800/30">
        <img
          src={
            product.image?.[0] ||
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop"
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
              product.sizes
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            {product.sizes ? "In Stock" : "Sold Out"}
          </span>
        </div>

        <div className="m-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <Link href={`/product/${product._id}`}>
            <button className="flex-1 bg-white/10 backdrop-blur-md text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-colors duration-300 font-medium">
              Quick View
            </button>
          </Link>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-base font-semibold text-white mb-2 group-hover:text-emerald-400">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-emerald-400">
              ${product.price}
            </span>
          </div>

          {/* Favorite Button */}
          <button className="p-2 rounded-full bg-zinc-700/50 hover:bg-zinc-600/50 transition-colors duration-300 group/heart">
            <svg
              className="w-5 h-5 text-zinc-400 group-hover/heart:text-red-400 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
