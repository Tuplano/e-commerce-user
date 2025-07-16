import mongoose, { Schema, model, models } from "mongoose";

const cartSchema = new Schema({
  email: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});


export default models.Cart || model("Cart", cartSchema);
