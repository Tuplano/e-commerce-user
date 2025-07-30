import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { Order } from "@/models/order";

export async function GET(req: Request) {
  await connectToDatabase();

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const email = session.user.email;

  const orders = await Order.find({ customerEmail: email }).sort({ createdAt: -1 });

  return NextResponse.json(orders);
}
