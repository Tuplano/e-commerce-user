import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import cartmodel from "@/models/cart";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return new Response("Unauthorized", { status: 401 });

  await connectToDatabase();
  const cart = await cartmodel.findOne({ email: session.user.email });
  return Response.json(cart?.items || []);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return new Response("Unauthorized", { status: 401 });

  const { cart } = await req.json();

  await connectToDatabase();
  await cartmodel.findOneAndUpdate(
    { email: session.user.email },
    { items: cart },
    { upsert: true }
  );

  return new Response("Cart saved", { status: 200 });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { productId, size } = await req.json();

  await connectToDatabase();

  await cartmodel.updateOne(
    { email: session.user.email },
    { $pull: { items: { productId, size } } }
  );

  return new Response("Item removed", { status: 200 });
}
