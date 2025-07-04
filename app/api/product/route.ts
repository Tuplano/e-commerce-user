import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/product";


export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "4");
    const skip = parseInt(searchParams.get("skip") || "0");

const products = await Product.find().skip(skip).limit(limit);
    return NextResponse.json(products);
   }catch(error){
    console.error("[GET_PRODUCTS_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to fetch products." },
      { status: 500 }
    );
   }
}