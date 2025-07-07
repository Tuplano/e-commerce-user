// models/Order.ts
import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  userId: { type: String, required: false },
  email: { type: String, required: true },
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
  total: Number,
  status: { type: String, default: "paid" },
  sessionId: String,
}, { timestamps: true });

export const Order = models.Order || model("Order", OrderSchema);
