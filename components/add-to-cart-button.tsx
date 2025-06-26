"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Minus, Plus } from "lucide-react"
import { useCart } from "@/components/cart-provider"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image: string
  }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className="h-10 w-10 rounded-none"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button variant="ghost" size="icon" onClick={increaseQuantity} className="h-10 w-10 rounded-none">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button onClick={handleAddToCart} size="lg" className="w-full bg-terracotta hover:bg-terracotta/90">
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </div>
  )
}
