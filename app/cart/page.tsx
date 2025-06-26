import type { Metadata } from "next"
import CartItems from "@/components/cart-items"
import CartSummary from "@/components/cart-summary"

export const metadata: Metadata = {
  title: "Shopping Cart | Zflamebyd",
  description: "Review and checkout your items in the shopping cart",
}

export default function CartPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <h1 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-8">
        Your Shopping Cart
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartItems />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  )
}
