"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function UpiPaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const { toast } = useToast()

  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success" | "failed">("pending")
  const [countdown, setCountdown] = useState(300) // 5 minutes in seconds

  useEffect(() => {
    if (!orderId) {
      router.push("/")
      return
    }

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [orderId, router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handlePaymentSuccess = () => {
    setPaymentStatus("success")
    setTimeout(() => {
      router.push(`/checkout/success?order_id=${orderId}`)
    }, 2000)
  }

  const handlePaymentFailed = () => {
    setPaymentStatus("failed")
    toast({
      title: "Payment Failed",
      description: "Your payment could not be processed. Please try again or choose a different payment method.",
      variant: "destructive",
    })
  }

  if (countdown === 0) {
    return (
      <div className="container py-12 md:py-16 lg:py-20">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Payment Time Expired</CardTitle>
            <CardDescription className="text-center">
              The payment session has expired. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <AlertCircle className="h-16 w-16 text-amber-500" />
            <p>Your payment session has timed out.</p>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Link href="/checkout">
              <Button variant="outline">Try Again</Button>
            </Link>
            <Link href="/">
              <Button className="bg-terracotta hover:bg-terracotta/90">Return Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Complete Your UPI Payment</CardTitle>
          <CardDescription className="text-center">Please complete the payment using your UPI app</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {paymentStatus === "pending" ? (
            <>
              <div className="rounded-lg bg-muted p-6 text-center">
                <p className="text-lg font-semibold">zflamebyd@ybl</p>
                <p className="text-sm text-muted-foreground mt-1">UPI ID</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">Time remaining:</p>
                <p className="text-xl font-semibold">{formatTime(countdown)}</p>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium">Instructions:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Open your UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                  <li>Select "Send Money" or "Pay"</li>
                  <li>Enter the UPI ID shown above</li>
                  <li>Enter the amount and reference number (your order ID)</li>
                  <li>Complete the payment in your UPI app</li>
                  <li>Click "I've Completed Payment" below</li>
                </ol>
              </div>
            </>
          ) : paymentStatus === "success" ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <p className="text-lg font-medium">Payment Successful!</p>
              <p className="text-sm text-muted-foreground text-center">
                Your payment has been processed successfully. Redirecting to order confirmation...
              </p>
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 py-6">
              <AlertCircle className="h-16 w-16 text-red-500" />
              <p className="text-lg font-medium">Payment Failed</p>
              <p className="text-sm text-muted-foreground text-center">
                Your payment could not be processed. Please try again or choose a different payment method.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          {paymentStatus === "pending" ? (
            <>
              <Button variant="outline" onClick={handlePaymentFailed}>
                Cancel Payment
              </Button>
              <Button className="bg-terracotta hover:bg-terracotta/90" onClick={handlePaymentSuccess}>
                I've Completed Payment
              </Button>
            </>
          ) : paymentStatus === "failed" ? (
            <>
              <Link href="/checkout">
                <Button variant="outline">Try Again</Button>
              </Link>
              <Link href="/">
                <Button className="bg-terracotta hover:bg-terracotta/90">Return Home</Button>
              </Link>
            </>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  )
}
