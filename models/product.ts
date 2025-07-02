import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sizes: [
      {
        size: { type: String, required: false },
        stock: { type: Number, required: false }, 
      },
    ],
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    image: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product_Ecommerce ||
  mongoose.model("Product_Ecommerce", productSchema);
