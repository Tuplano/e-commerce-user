"use client";

import { useState, useEffect } from "react";
import { ProductType } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";

export default function Shop() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const limit = 2;

  // Reset on mount
  useEffect(() => {
    const resetAndFetch = async () => {
      setProducts([]);
      setSkip(0);
      setHasMore(true);
      setLoading(true);
      try {
        const res = await fetch(`/api/product?limit=${limit}&skip=0`);
        const data: ProductType[] = await res.json();

        if (data.length < limit) setHasMore(false);

        setProducts(data);
        setSkip(limit);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    resetAndFetch();
  }, []);

  // Load more products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/product?limit=${limit}&skip=${skip}`);
      const data: ProductType[] = await res.json();

      if (data.length < limit) setHasMore(false);

      setProducts((prev) => {
        const ids = new Set(prev.map((p) => p._id));
        const newItems = data.filter((p) => !ids.has(p._id));
        return [...prev, ...newItems];
      });

      setSkip((prev) => prev + limit);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-zinc-900 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">Products</h1>
        <div className="relative p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product) => (
              <ProductCard key={product._id.toString()} product={product} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center">
              <button
                onClick={fetchProducts}
                disabled={loading}
                className="bg-zinc-900 text-white px-6 py-3 rounded hover:bg-zinc-800 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
