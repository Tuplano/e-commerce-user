import { Mail, MapIcon, MapPin, Phone, Pin } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
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
  );
}
