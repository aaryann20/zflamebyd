"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

export default function CartItems() {
  const { items, removeItem, updateQuantity } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products">
          <Button className="bg-terracotta hover:bg-terracotta/90">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col sm:flex-row gap-4 border-b pb-6">
          <div className="relative aspect-square h-24 w-24 min-w-[6rem] overflow-hidden rounded-md">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <Link href={`/products/${item.id.includes("candle") ? "candles" : "totes"}/${item.id}`}>
                  <h3 className="font-medium">{item.name}</h3>
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
              </div>
              <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="h-8 w-8 rounded-none"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-8 w-8 rounded-none"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
