import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userEmail: String,
    products: [
      {
        productId: String,
        name: String,
        size: String,
        quantity: Number,
        price: Number,
      },
    ],
    status: { type: String, default: "pending" },
    stripeSessionId: String,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
