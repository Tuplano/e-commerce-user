"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductType } from "@/types/product";
import { useCart } from "@/context/CartonText";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductDetails() {
  const params = useParams();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedStock, setSelectedStock] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (product?.sizes?.length) {
      const defaultSize = product.sizes[0];
      setSelectedSize(defaultSize.size);
      setSelectedStock(defaultSize.stock);
    }
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/product/${params.id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;

    const selectedSizeData = product.sizes.find((s) => s.size === selectedSize);
    if (!selectedSizeData) return;

    if (selectedStock > selectedSizeData.stock) {
      toast.error("Selected quantity exceeds available stock.");
      return;
    }

    addToCart({
      productId: product._id,
      name: product.name,
      image: product.image?.[0] || "/placeholder.jpg",
      price: product.price,
      size: selectedSize,
      quantity: quantity,
    });

    toast.success(`${product.name} (${selectedSize}) added to cart.`);
  };

  const handlePrevImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.image.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) =>
      prev === product.image.length - 1 ? 0 : prev + 1
    );
  };

  if (!product) return <div className="p-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-black p-10">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Image Slider */}
        <div className="w-full relative">
          <img
            src={product.image?.[currentImageIndex] || "/placeholder.jpg"}
            alt={`${product.name} - ${currentImageIndex + 1}`}
            className="w-full h-auto object-contain rounded"
          />

          {product.image.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Dot Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {product.image.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition ${
                  index === currentImageIndex ? "bg-black" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-6">
            ${product.price.toLocaleString()}
          </p>

          {/* Size Selector */}
          <div className="mb-4">
            <label htmlFor="size" className="block text-sm font-medium mb-1">
              Size
            </label>
            <select
              id="size"
              className="border border-gray-300 px-4 py-2 w-48"
              value={selectedSize}
              onChange={(e) => {
                const selected = e.target.value;
                setSelectedSize(selected);
                const stock =
                  product.sizes.find((s) => s.size === selected)?.stock || 0;
                setSelectedStock(stock);
              }}
            >
              {product.sizes.map((s) => (
                <option key={s._id} value={s.size}>
                  {s.size}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-600 mt-1">Stock: {selectedStock}</p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label htmlFor="qty" className="block text-sm font-medium mb-1">
              QTY
            </label>
            <select
              id="qty"
              className="border border-gray-300 px-4 py-2 w-24"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[...Array(selectedStock).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 hover:bg-zinc-800 transition"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
