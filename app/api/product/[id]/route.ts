import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/product";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } } // ✅ not a Promise
) {
  const { id } = params;

  try {
    await connectToDatabase();

    const product = await Product.findById(id);
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
