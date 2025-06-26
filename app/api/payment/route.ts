import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { processPayment } from "@/lib/payment"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const { method, items, shippingDetails, paymentDetails } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 })
    }

    if (!method || !["card", "upi", "cod"].includes(method)) {
      return NextResponse.json({ error: "Invalid payment method" }, { status: 400 })
    }

    // Calculate total amount
    const subtotal = items.reduce((total: number, item: any) => {
      return total + item.price * item.quantity
    }, 0)

    const shipping = subtotal >= 2500 ? 0 : 299
    const tax = subtotal * 0.18
    const total = subtotal + shipping + tax

    // Process payment
    const result = await processPayment({
      method,
      amount: total,
      currency: "inr",
      userId: session?.user?.id,
      items,
      shippingDetails,
      paymentDetails,
    })

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ error: error.message || "Payment processing failed" }, { status: 500 })
  }
}
