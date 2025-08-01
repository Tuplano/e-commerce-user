"use client";

import { useState, useEffect } from "react";
import { ProductType } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import { SlidersHorizontal } from "lucide-react";

export default function Shop() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    size: "",
    min: "",
    max: "",
  });

  const limit = 4;

  useEffect(() => {
    resetAndFetch();
  }, []);

  const buildQuery = (customSkip = 0) => {
    const query = new URLSearchParams();

    if (filters.category) query.append("category", filters.category);
    if (filters.size) query.append("size", filters.size);
    if (filters.min) query.append("min", filters.min);
    if (filters.max) query.append("max", filters.max);
    query.append("limit", limit.toString());
    query.append("skip", customSkip.toString());

    return query.toString();
  };

  const resetAndFetch = async () => {
    setProducts([]);
    setSkip(0);
    setHasMore(true);
    setLoading(true);
    try {
      const query = buildQuery(0);
      const res = await fetch(`/api/product?${query}`);
      const data: ProductType[] = await res.json();

      if (data.length < limit) setHasMore(false);

      setProducts(data);
      setSkip(limit);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query = buildQuery(skip);
      const res = await fetch(`/api/product?${query}`);
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

  const handleApplyFilters = () => {
    resetAndFetch();
    setShowSidebar(false);
  };

  const handleClearFilters = () => {
    setFilters({ category: "", size: "", min: "", max: "" });
    resetAndFetch();
    setShowSidebar(false);
  };

  return (
    <div className="min-h-screen py-20 relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black z-40 shadow-lg transform transition-transform duration-300 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Filter</h2>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              className="w-full border rounded p-2 mt-1"
              value={filters.category}
              onChange={(e) =>
                setFilters((f) => ({ ...f, category: e.target.value }))
              }
            >
              <option value="">All</option>
              <option value="T-Shirts">T-Shirts</option>
              <option value="Hoodie">Hoodie</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Size</label>
            <select
              className="w-full border rounded p-2 mt-1"
              value={filters.size}
              onChange={(e) =>
                setFilters((f) => ({ ...f, size: e.target.value }))
              }
            >
              <option value="">All</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Price Range ($)</label>
            <div className="flex space-x-2 mt-1">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 border rounded p-2"
                value={filters.min}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, min: e.target.value }))
                }
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 border rounded p-2"
                value={filters.max}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, max: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={handleClearFilters}
              className="text-sm text-gray-500 hover:underline"
            >
              Clear
            </button>
            <button
              onClick={handleApplyFilters}
              className="bg-black text-white px-4 py-1 text-sm rounded"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Products</h1>
          <button
            onClick={() => setShowSidebar(true)}
            className="flex items-center gap-1 hover:opacity-75"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={fetchProducts}
              disabled={loading}
              className="bg-transparent border border-gray-400 text-white px-6 py-2 rounded hover:text-black hover:bg-white transition duration-300"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
