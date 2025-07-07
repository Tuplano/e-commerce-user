// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import connectToDatabase from "@/lib/mongodb";
import { Order } from "@/models/order";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await connectToDatabase();

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 100 }
      );

      const products = lineItems.data.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        price: item.amount_total ? item.amount_total / (item.quantity ?? 1) / 100 : 0,
        image: "",
      }));

      const total = lineItems.data.reduce((sum, item) => sum + item.amount_total!, 0) / 100;

      await Order.create({
        userId: session.metadata?.userId || null,
        email: session.customer_email,
        products,
        total,
        sessionId: session.id,
        status: "paid",
      });
    } catch (err) {
      console.error("Error saving order:", err);
    }
  }

  return NextResponse.json({ received: true });
}
