"use client";
import React, { useEffect, useState } from "react";
import { Search, Package, BadgeCheck } from "lucide-react";

export default function MyOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Paid", "Unpaid"];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("❌ Error loading orders:", err);
      }
    };
    fetchOrders();
  }, []);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(price);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.products.some((product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesTab =
      activeTab === "All" || order.paymentStatus.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  return (
    <div className="max-w-4xl mx-auto min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b">
        <h1 className="text-xl font-semibold text-gray-800">My Orders</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by product name"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders */}
      <div className="p-4 space-y-6">
        {filteredOrders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-sm border">
            {/* Order Header */}
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <div>
                <div className="text-sm text-gray-600">Order ID: {order._id}</div>
                <div className="text-sm text-gray-600">
                  Email: {order.customerEmail}
                </div>
              </div>
              <div className="text-sm font-medium text-green-600 capitalize flex items-center gap-1">
                <BadgeCheck className="w-4 h-4" />
                {order.paymentStatus}
              </div>
            </div>

            {/* Products */}
            {order.products.map((product: any, index: number) => (
              <div key={index} className="flex p-4 gap-4 border-b last:border-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded border"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500">Size: {product.size}</p>
                  <p className="text-xs text-gray-500">Qty: {product.quantity}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-800 font-semibold">
                    {formatPrice(product.price * product.quantity, order.currency)}
                  </div>
                </div>
              </div>
            ))}

            {/* Order Summary */}
            <div className="flex justify-between items-center p-4 bg-gray-50 border-t">
              <div className="text-sm text-gray-600">
                Total Items: {order.products.reduce((sum: number, p: any) => sum + p.quantity, 0)}
              </div>
              <div className="text-sm font-bold text-gray-800">
  Order Total: {formatPrice(order.amountTotal / 100, order.currency)}
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="bg-white p-12 text-center rounded-lg border">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No orders found.</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your search or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
