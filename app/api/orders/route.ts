import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getUserOrders, createOrder } from "@/lib/database"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orders = await getUserOrders(session.user.id)
    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orderData = await request.json()

    // Validate required fields
    if (!orderData.items || !orderData.shippingDetails) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Calculate total
    const subtotal = orderData.items.reduce((total: number, item: any) => {
      return total + item.price * item.quantity
    }, 0)

    const shipping = subtotal >= 2500 ? 0 : 299
    const tax = subtotal * 0.18
    const total = subtotal + shipping + tax

    const newOrder = await createOrder({
      ...orderData,
      userId: session.user.id,
      subtotal,
      shipping,
      tax,
      total,
      paymentStatus: "pending",
    })

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
