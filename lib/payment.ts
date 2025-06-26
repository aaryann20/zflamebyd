import { loadStripe } from "@stripe/stripe-js"
import { createOrder, savePaymentMethod } from "@/lib/database"

// Initialize Stripe
let stripePromise: Promise<any> | null = null
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

// Process payment based on method
export async function processPayment(paymentData: {
  method: string
  amount: number
  currency: string
  userId?: string
  items: any[]
  shippingDetails: any
  paymentDetails?: any
}) {
  const { method, amount, currency, userId, items, shippingDetails, paymentDetails } = paymentData

  try {
    // Create order first
    const order = await createOrder({
      userId: userId || "guest",
      items,
      shippingDetails,
      amount,
      currency,
      paymentMethod: method,
      paymentStatus: method === "cod" ? "pending" : "processing",
    })

    if (!order) {
      throw new Error("Failed to create order")
    }

    // Process based on payment method
    switch (method) {
      case "card":
        // Return Stripe checkout session
        return await createStripeCheckout(paymentData, order.id)

      case "upi":
        // Save UPI details and return success
        if (userId && paymentDetails?.upiId) {
          await savePaymentMethod(userId, {
            type: "upi",
            upiId: paymentDetails.upiId,
          })
        }
        return {
          success: true,
          orderId: order.id,
          method: "upi",
          message: "Please complete the payment using your UPI app",
          upiDetails: {
            upiId: "zflamebyd@ybl", // Your business UPI ID
            amount,
            reference: order.id,
          },
        }

      case "cod":
        // Return success for COD
        return {
          success: true,
          orderId: order.id,
          method: "cod",
          message: "Your order has been placed successfully. Payment will be collected on delivery.",
        }

      default:
        throw new Error("Unsupported payment method")
    }
  } catch (error) {
    console.error("Payment processing error:", error)
    throw error
  }
}

// Create Stripe checkout session
async function createStripeCheckout(paymentData: any, orderId: string) {
  const { items, shippingDetails, amount, currency } = paymentData

  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items,
      shippingDetails,
      orderId,
    }),
  })

  const { sessionId, error } = await response.json()

  if (error) {
    throw new Error(error)
  }

  return {
    success: true,
    sessionId,
    method: "card",
    message: "Redirecting to secure payment page...",
  }
}
