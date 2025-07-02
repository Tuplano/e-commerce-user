import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/product";


export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const products = await Product.find().limit(6);
    return NextResponse.json(products);
   }catch(error){
    console.error("[GET_PRODUCTS_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to fetch products." },
      { status: 500 }
    );
   }
}