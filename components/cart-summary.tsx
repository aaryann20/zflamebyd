"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { getStripe } from "@/lib/stripe"

export default function CartSummary() {
  const { items, subtotal } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Calculate shipping (free over ₹2500)
  const shipping = subtotal >= 2500 ? 0 : 299

  // Calculate tax (18% GST)
  const tax = subtotal * 0.18

  // Calculate total
  const total = subtotal + shipping + tax

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      // Create a Stripe checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          // We'll collect shipping details in the checkout form
          // This is just a fallback
          shippingDetails: {
            email: "",
            name: "",
            address: "",
          },
        }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Redirect to Stripe checkout
      const stripe = await getStripe()
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message || "Something went wrong")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to checkout",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="font-playfair text-lg font-semibold">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (18% GST)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-4 flex justify-between font-medium">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        onClick={handleCheckout}
        disabled={items.length === 0 || isLoading}
        className="mt-6 w-full bg-terracotta hover:bg-terracotta/90"
      >
        {isLoading ? "Processing..." : "Proceed to Checkout"}
      </Button>

      <div className="mt-4 text-center text-xs text-muted-foreground">
        <p>Free shipping on orders over ₹2500</p>
        <p className="mt-1">
          <Link href="/products" className="underline underline-offset-2">
            Continue Shopping
          </Link>
        </p>
      </div>
    </div>
  )
}
