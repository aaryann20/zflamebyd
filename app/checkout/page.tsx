import type { Metadata } from "next"
import CheckoutForm from "@/components/checkout-form"
import OrderSummary from "@/components/order-summary"

export const metadata: Metadata = {
  title: "Checkout | Zflamebyd",
  description: "Complete your purchase",
}

export default function CheckoutPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <h1 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-8">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
