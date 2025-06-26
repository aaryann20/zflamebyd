"use client"

import { useCart } from "@/components/cart-provider"

export default function OrderSummary() {
  const { items, subtotal } = useCart()

  // Calculate shipping (free over ₹2500)
  const shipping = subtotal >= 2500 ? 0 : 299

  // Calculate tax (18% GST)
  const tax = subtotal * 0.18

  // Calculate total
  const total = subtotal + shipping + tax

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="font-playfair text-lg font-semibold">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
              </span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2">
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
        </div>

        <div className="border-t pt-4 flex justify-between font-medium">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        <p>Free shipping on orders over ₹2500</p>
      </div>
    </div>
  )
}
