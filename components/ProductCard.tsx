import React from "react";

export interface ProductCardProp {
  product: {
    _id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    category: string;
    image: string[];
    createdAt: string;
  };
}

export default function ProductCard({ product }: ProductCardProp) {
  

  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group cursor-pointer text-center text-white">
      {/* Product Image */}
      <div className="overflow-hidden">
        <img
          src={product.image?.[0] || "/placeholder.png"}
          alt={product.name}
          className="w-full h-100 object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Product Content */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibol line-clamp-1">
          {product.name}
        </h3>

        {/* Category */}
        {product.category && (
          <p className="text-sm text-blue-600 font-medium mb-1">
            {product.category}
          </p>
        )}
        {/* Price and Stock */}
        <div className="items-center mt-3">
          <span className="text-green-600 font-bold">
            ${product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
