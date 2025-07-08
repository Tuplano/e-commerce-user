import mongoose, { Schema, model, models } from "mongoose";
const OrderSchema = new Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    paymentStatus: { type: String },
    customerEmail: { type: String },
    amountTotal: { type: Number },
    currency: { type: String },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);


export const Order = models.Order || model("Order", OrderSchema);
