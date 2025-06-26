import { NextResponse } from "next/server"
import Stripe from "stripe"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { updateOrder } from "@/lib/database"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const { items, shippingDetails, orderId } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 })
    }

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100, // Stripe expects amount in paise
      },
      quantity: item.quantity,
    }))

    // Calculate shipping cost (free over ₹2500)
    const subtotal = items.reduce((total: number, item: any) => {
      return total + item.price * item.quantity
    }, 0)

    const shippingCost = subtotal >= 2500 ? 0 : 299

    // Add shipping as a line item
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Shipping",
          },
          unit_amount: shippingCost * 100,
        },
        quantity: 1,
      })
    }

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel?order_id=${orderId}`,
      customer_email: session?.user?.email || shippingDetails?.email,
      metadata: {
        orderId,
        userId: session?.user?.id || "guest",
      },
    })

    // Update order with Stripe session ID
    if (orderId) {
      await updateOrder(orderId, {
        stripeSessionId: stripeSession.id,
        paymentStatus: "awaiting_payment",
      })
    }

    return NextResponse.json({ sessionId: stripeSession.id })
  } catch (error: any) {
    console.error("Stripe checkout error:", error)

    return NextResponse.json({ error: error.message || "Failed to create checkout session" }, { status: 500 })
  }
}
