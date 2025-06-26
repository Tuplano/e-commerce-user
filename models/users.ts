// models/users.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: false, 
    },
    password: {
      type: String,
      required: false, 
      default: "",  
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User_Ecommerce ||
  mongoose.model("User_Ecommerce", userSchema);
