import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectToDatabase from "@/lib/mongodb";
import { Order } from "@/models/order";
import Cart from "@/models/cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  console.log("🔗 Received webhook");

  if (!sig || !endpointSecret) {
    return new NextResponse("Missing Stripe signature or secret", {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    console.log("🎯 Webhook verified:", event.type);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await connectToDatabase();

      const cart = JSON.parse(session.metadata?.cart || "[]");
      console.log("📦 Received cart:", cart);

      await Order.create({
        sessionId: session.id,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_details?.email,
        amountTotal: session.amount_total,
        currency: session.currency,
        products: cart,
      });

      console.log("✅ Order saved:", session.id);

      const productIds = cart.map((item: any) => item.productId);
      const customerEmail = session.customer_details?.email;

      if (productIds.length > 0 && customerEmail) {
        const cartDoc = await Cart.findOne({ email: customerEmail });

        if (cartDoc) {
          cartDoc.items = cartDoc.items.filter(
            (item: any) => !productIds.includes(item.productId)
          );
          await cartDoc.save();
          console.log(`🧹 Removed ${productIds.length} items from ${customerEmail}'s cart.`);
        }
      }
    } catch (err: any) {
      console.error("❌ Failed to save order:", err.message);
    }
  }

  return new NextResponse("OK", { status: 200 });
}
