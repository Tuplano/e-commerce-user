import { Mail, MapIcon, MapPin, Phone, Pin } from "lucide-react";

import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <>
          {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-zinc-100 to-zinc-300 relative overflow-hidden">
  <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-200 rounded-full translate-x-1/2 translate-y-1/2 opacity-50"></div>

  <div className="container mx-auto text-center relative">
    {/* Social Icons and Lines */}
    <div className="flex items-center justify-center mb-8">
      <div className="flex-grow border-t border-black mx-4" />
      <div className="flex space-x-6 text-black">
        <Facebook className="w-10 h-10" />
        <Instagram className="w-10 h-10" />
        <Twitter className="w-10 h-10" />
      </div>
      <div className="flex-grow border-t border-black mx-4" />
    </div>

    {/* Newsletter Content */}
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

      <footer className=" text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 h-full p-10 gap-4">
        {/* Column 1: About / Logo */}
        <div className="h-full p-4">
          <h3 className="text-2xl font-bold mb-6">Your Logo</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur
            adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae
            pellentesque sem placerat in id. Placerat in id cursus mi pretium
            tellus duis. Pretium tellus duis convallis tempus leo eu aenean.{" "}
          </p>
        </div>

        {/* Column 2: Contact Info */}
        <div className="h-full p-4">
          <h4 className="text-xl font-semibold mb-4">Contact</h4>
          <ul className="text-sm text-gray-400 space-y-4">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5" />
              <span>
                <strong>Address:</strong> 123 Main Street, City, Country
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5" />
              <span>
                <strong>Phone:</strong> (123) 456-7890
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5" />
              <span>
                <strong>Email:</strong> info@example.com
              </span>
            </li>
          </ul>
        </div>

        {/* Column 3: Optional Ideas */}
        <div className="h-full p-4">
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <a href="#" className="hover:text-white transition">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
    </>
    
  );
}
