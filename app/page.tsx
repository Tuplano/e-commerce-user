import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-white"></div>

        <div className=" h-full mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full">
            {/* Column 1 - Model 1 */}
            <div className="h-full group overflow-hidden">
              <img
                src="https://res.cloudinary.com/dhxctvrj5/image/upload/v1751269426/model1_xabxko.jpg"
                alt="Model 1"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Column 2 - Model 2 */}
            <div className="h-full group overflow-hidden">
              <img
                src="https://res.cloudinary.com/dhxctvrj5/image/upload/v1751269260/behrooz-MMBBQ2p1Dsk-unsplash_1_tnoudo.jpg"
                alt="Model 2"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Column 3 - Text CTA */}
            <div className="h-full flex items-center justify-center bg-neutral-100 px-8 group transition-all duration-500 hover:bg-neutral-200">
              <div className="text-left transform transition-transform duration-500 group-hover:scale-105">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                  BEST <br />
                  SELLING <br />
                  PRODUCTS
                </h1>
                <button className="bg-white border border-gray-400 text-gray-800 px-6 py-2 rounded hover:bg-gray-100 transition duration-300">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          {/* Products Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="text-white text-2xl font-bold">KONTRAST</div>
            </div>
            <h2 className="text-white text-4xl font-bold mb-4">PRODUCTS</h2>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"></div>

          {/* View All Button */}
          <div className="text-center">
            <button className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300">
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
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* All Products */}
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gray-800 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 bg-gray-600 rounded-lg mx-auto mb-4"></div>
                    <p>Group photo placeholder</p>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    All Products
                  </h3>
                  <p className="text-gray-300">View Products</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* T-Shirt Category */}
              <div className="relative group cursor-pointer">
                <div className="aspect-[2/1] bg-orange-400 rounded-2xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-orange-600 rounded-lg mx-auto mb-2"></div>
                      <p className="text-white">T-shirt model</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold mb-1">
                      T-Shirt
                    </h3>
                    <p className="text-white/80 text-sm">View Products</p>
                  </div>
                </div>
              </div>

              {/* Hoodie Category */}
              <div className="relative group cursor-pointer">
                <div className="aspect-[2/1] bg-green-600 rounded-2xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-green-800 rounded-lg mx-auto mb-2"></div>
                      <p className="text-white">Hoodie model</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold mb-1">
                      Hoodie
                    </h3>
                    <p className="text-white/80 text-sm">View Products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* See More Collection Button */}
          <div className="text-center mt-12">
            <button className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300">
              See More Collection
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-gray-100 to-blue-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-200 rounded-full translate-x-1/2 translate-y-1/2 opacity-50"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Newsletter</h2>

          <div className="max-w-md mx-auto">
            <div className="flex bg-white rounded-full shadow-lg overflow-hidden">
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

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 mt-12">
            <Facebook className="w-5 h-5" />
            <Instagram className="w-5 h-5" />
            <Twitter className="w-5 h-5" />
          </div>
        </div>
      </section>
    </div>
  );
}
