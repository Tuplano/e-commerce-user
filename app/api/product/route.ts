import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/product";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const limit = parseInt(searchParams.get("limit") || "4");
    const skip = parseInt(searchParams.get("skip") || "0");

    const category = searchParams.get("category");
    const size = searchParams.get("size");
    const min = searchParams.get("min");
    const max = searchParams.get("max");

    // Build MongoDB filter object
    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (size) {
      filter["sizes.size"] = size; 
    }

    if (min || max) {
      filter.price = {};
      if (min) filter.price.$gte = parseFloat(min);
      if (max) filter.price.$lte = parseFloat(max);
    }

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit);

    return NextResponse.json(products);
  } catch (error) {
    console.error("[GET_PRODUCTS_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to fetch products." },
      { status: 500 }
    );
  }
}
