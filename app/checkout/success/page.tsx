"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order_id") || "unknown"
  const [isLoading, setIsLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState<any>({
    id: orderId,
    date: new Date().toISOString(),
    status: "Processing",
  })

  useEffect(() => {
    // In a real app, fetch order details from API
    const fetchOrderDetails = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setOrderDetails({
          id: orderId,
          date: new Date().toISOString(),
          status: "Processing",
          paymentMethod: "Cash on Delivery",
        })
      } catch (error) {
        console.error("Error fetching order details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId])

  if (isLoading) {
    return (
      <div className="container flex flex-col items-center justify-center px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <Loader2 className="h-12 w-12 animate-spin text-terracotta" />
        <p className="mt-4 text-muted-foreground">Loading order details...</p>
      </div>
    )
  }

  return (
    <div className="container flex flex-col items-center justify-center px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mx-auto max-w-md text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="mt-6 font-playfair text-3xl font-bold tracking-tight sm:text-4xl">Thank You for Your Order!</h1>

        <p className="mt-4 text-muted-foreground">
          Your order has been received and is being processed. You will receive a confirmation email shortly.
        </p>

        <div className="mt-8 rounded-lg border bg-card p-6 text-left">
          <h2 className="font-playfair text-lg font-semibold">Order Details</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number:</span>
              <span className="font-medium">#{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>{new Date(orderDetails.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="text-green-600">{orderDetails.status}</span>
            </div>
            {orderDetails.paymentMethod && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span>{orderDetails.paymentMethod}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/products">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
          <Link href="/dashboard/orders">
            <Button className="bg-terracotta hover:bg-terracotta/90">View My Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
