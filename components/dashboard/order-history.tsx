"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

interface OrderHistoryProps {
  userId: string
}

export default function OrderHistory({ userId }: OrderHistoryProps) {
  const [orders, setOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchOrders()
  }, [userId])

  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/orders")
      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast({
        title: "Error",
        description: "Failed to load orders. Please try again later.",
        variant: "destructive",
      })
      // Set empty array as fallback
      setOrders([])
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Orders Yet</CardTitle>
          <CardDescription>You haven't placed any orders yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/products">
            <Button className="bg-terracotta hover:bg-terracotta/90">Start Shopping</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Order #{order.id}</CardTitle>
              <div className="mt-2 sm:mt-0 text-sm text-muted-foreground">
                {format(new Date(order.createdAt), "MMMM d, yyyy")}
              </div>
            </div>
            <CardDescription>
              Status: <span className="font-medium">{order.status}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md divide-y">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between p-4">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">Quantity: {item.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div>₹{item.price.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">₹{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-medium">
                <div>Total</div>
                <div>₹{order.total.toFixed(2)}</div>
              </div>
              <div className="flex justify-end">
                <Link href={`/orders/${order.id}`}>
                  <Button variant="outline">View Order Details</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
