"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import { useEffect, useState, ChangeEvent } from "react";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "@/types/product";
import Link from "next/link";


export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  //fetching data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
      const res = await fetch("/api/product?limit=4");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className=" h-full mx-auto relative z-10">
          <div className="grid grid-rows-3 lg:grid-rows-1 lg:grid-cols-3 h-full">
            <div className="h-full relative bg-neutral-100 px-6 py-10 group transition-all duration-500 hover:bg-neutral-200 order-1 lg:order-3">
              <div className="absolute bottom-[20%] left-20 right-20 text-left">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight transform transition-transform duration-500 group-hover:scale-105">
                  BEST <br />
                  SELLING <br />
                  PRODUCTS
                </h1>
                <Link 
                href="/shop"
                className="bg-white border border-gray-400 text-sm sm:text-base text-gray-800 px-4 py-2 rounded hover:text-white hover:bg-black transition duration-300">
                  Shop Now
                </Link>
              </div>
            </div>
            {/* Column 1 - Model 1 */}
            <div className="h-full group overflow-hidden order-3 lg:order-1">
              <img
                src="https://res.cloudinary.com/dhxctvrj5/image/upload/v1751269426/model1_xabxko.jpg"
                alt="Model 1"
                className="w-full h-full object-[center_20%] object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Column 2 - Model 2 */}
            <div className="h-full group overflow-hidden order-2 lg:order-2">
              <img
                src="https://res.cloudinary.com/dhxctvrj5/image/upload/v1751269260/behrooz-MMBBQ2p1Dsk-unsplash_1_tnoudo.jpg"
                alt="Model 2"
                className="w-full h-full object-[center_20%] object-cover  transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Products Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="text-white text-2xl font-bold">KONTRAST</div>
            </div>
            <h2 className="text-white text-4xl font-bold mb-4">PRODUCTS</h2>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-12">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <button className="bg-transparent border border-gray-400 text-white px-6 py-2 rounded hover:text-black hover:bg-white transition duration-300">
              View All
            </button>
          </div>
        </div>
      </section>

      {/* Lorem Ipsum Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            LOREM IPSUM DOLOR
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <hr></hr>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* All Products - Large Featured Card */}
            <div className="relative group cursor-pointer bg-zinc-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-900/50">
              <img
                src="https://res.cloudinary.com/dhxctvrj5/image/upload/v1751532318/front-view-friends-posing-together-min_xh9pbm.jpg"
                alt="all product image"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white text-3xl font-bold mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                  All Products
                </h3>
                <p className="text-zinc-300 text-lg mb-4">
                  Explore our complete collection
                </p>
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <span>View Products</span>
                </div>
              </div>
            </div>

            {/* Right Column - Category Cards */}
            <div className="space-y-6">
              {/* T-Shirt Category */}
              <div className="relative group cursor-pointer bg-zinc-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-900/30">
                <div className="aspect-[3/1] relative">
                  <img
                    src="https://res.cloudinary.com/dhxctvrj5/image/upload/v1751535194/mark-adriane-bO3S03I2Aw8-unsplash_vnhljn.jpg"
                    alt="T-shirt collection"
                    className="absolute inset-0 w-full h-full object-cover object-[50%23%] group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-white text-2xl font-bold mb-1 group-hover:text-orange-400 transition-colors duration-300">
                      T-Shirt
                    </h3>
                    <div className="flex items-center gap-2 text-orange-400 font-medium text-sm">
                      <span>View Products</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hoodie Category */}
              <div className="relative group cursor-pointer bg-zinc-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-900/30">
                <div className="aspect-[3/1] relative">
                  <img
                    src="https://res.cloudinary.com/dhxctvrj5/image/upload/v1751532316/young-man-wearing-bucket-hat-city-min_javj0w.jpg"
                    alt="Hoodie collection"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-white text-2xl font-bold mb-1 group-hover:text-green-400 transition-colors duration-300">
                      Hoodie
                    </h3>
                    <div className="flex items-center gap-2 text-green-400 font-medium text-sm">
                      <span>View Products</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-15 bg-gradient-to-br from-zinc-100 to-zinc-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-200 rounded-full translate-x-1/2 translate-y-1/2 opacity-50"></div>

        <div className="flex items-center w-full">
          {/* Left Line */}
          <div className="flex-grow border-t border-black" />

          {/* Social Icons */}
          <div className="flex space-x-6 px-4 text-black">
            <Facebook className="w-10 h-10" />
            <Instagram className="w-10 h-10" />
            <Twitter className="w-10 h-10" />
          </div>

          {/* Right Line */}
          <div className="flex-grow border-t border-black" />
        </div>

        <div className="container text-center relative mt-5">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Newsletter</h2>

          <div className="max-w-md mx-auto">
            <div className="flex bg-white rounded shadow-lg overflow-hidden">
              <input
                type="email"
                placeholder="Example@email.com"
                className="flex-1 px-6 py-4 text-gray-600 focus:outline-none"
              />
              <button className="bg-gray-800 text-white px-8 py-4 hover:bg-gray-700 transition-colors duration-300">
                →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
