"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"

// Featured products data
const featuredProducts = [
  {
    id: "candle-1",
    name: "Pumpkin Spice Candle",
    price: 999,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4fea9912-96ac-4fb7-953b-9b385fb5c3ad.JPG-lhRUnPtQLGFBJDGUP8LOw2AojOsie6.jpeg",
    category: "candles",
  },
  {
    id: "candle-2",
    name: "Pinecone Candle",
    price: 999,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1d51a97c-4d61-4e2e-a233-819b9b7f2de4.JPG-xLWyxQxHhLGm0fuBx3rFPLVJXM18VN.jpeg",
    category: "candles",
  },
  {
    id: "candle-3",
    name: "Beehive Candle",
    price: 979,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8746f632-6db4-4810-b5ac-f5e11e062693.JPG-RSyQu1kIhPqcBUS9ANvVQVS44BvfIM.jpeg",
    category: "candles",
  },
  {
    id: "tote-1",
    name: "Heart Balance Tote",
    price: 899,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4d62fbf7-2ef8-4865-a3c2-1dfe74c884f4.JPG-UVP6sXnj7AtcKd8a4x9tCe60oFnbE6.jpeg",
    category: "totes",
  },
  {
    id: "tote-2",
    name: "Cherry Love Tote",
    price: 949,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2fc0d7cb-58e5-44d9-b916-3fdf2c64698b.JPG-6Gxv8geGLX2tOHUomxBROEq6baI4iK.jpeg",
    category: "totes",
  },
  {
    id: "tote-3",
    name: "Nazar Tote",
    price: 929,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ce2e6183-23bf-4c9b-ac47-cab30fe371e6.JPG-mlxoEiTXSDlhrNHL8h8oKggEPSWag1.jpeg",
    category: "totes",
  },
  {
    id: "tote-4",
    name: "Velvet Heart Tote",
    price: 969,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6fe47a59-e5f5-4bb2-b8d9-a81d8bbc0cdb.JPG-ot2C5HQv9tAc5OtaD8WkuoJVwWBM4x.jpeg",
    category: "totes",
  },
  {
    id: "tote-5",
    name: "Summer Drizzle Tote",
    price: 989,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d8e03c8a-4879-4a40-97c7-09c8ef3de47c.JPG-3yP5cuKx3kTFf3uffvpnTgDHU8fblB.jpeg",
    category: "totes",
  },
]

export default function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {featuredProducts.slice(0, 8).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/products/${product.category}/${product.id}`}>
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product.category}/${product.id}`}>
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-lg font-semibold mt-2">₹{product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full bg-terracotta hover:bg-terracotta/90">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
