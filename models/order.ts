import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
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
  sessionId: { type: String, required: true }, // <-- REQUIRED
  userId: { type: String, default: null },     // <-- Optional
}, { timestamps: true });

export const Order = models.Order || model("Order", OrderSchema);
