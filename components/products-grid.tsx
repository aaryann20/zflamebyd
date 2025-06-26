"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"

// Products data
const products = [
  {
    id: "candle-1",
    name: "Pumpkin Spice Candle",
    price: 999,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4fea9912-96ac-4fb7-953b-9b385fb5c3ad.JPG-lhRUnPtQLGFBJDGUP8LOw2AojOsie6.jpeg",
    category: "candles",
    description: "A warm and cozy candle with notes of pumpkin, cinnamon, and nutmeg.",
  },
  {
    id: "candle-2",
    name: "Pinecone Candle",
    price: 999,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1d51a97c-4d61-4e2e-a233-819b9b7f2de4.JPG-xLWyxQxHhLGm0fuBx3rFPLVJXM18VN.jpeg",
    category: "candles",
    description: "A textured candle inspired by nature with a fresh pine scent.",
  },
  {
    id: "candle-3",
    name: "Beehive Candle",
    price: 979,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8746f632-6db4-4810-b5ac-f5e11e062693.JPG-RSyQu1kIhPqcBUS9ANvVQVS44BvfIM.jpeg",
    category: "candles",
    description: "A honey-scented candle with a unique spiral design.",
  },
  {
    id: "tote-1",
    name: "Heart Balance Tote",
    price: 899,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4d62fbf7-2ef8-4865-a3c2-1dfe74c884f4.JPG-UVP6sXnj7AtcKd8a4x9tCe60oFnbE6.jpeg",
    category: "totes",
    description: "A cotton tote bag featuring a yin-yang heart design.",
  },
  {
    id: "tote-2",
    name: "Cherry Love Tote",
    price: 949,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2fc0d7cb-58e5-44d9-b916-3fdf2c64698b.JPG-6Gxv8geGLX2tOHUomxBROEq6baI4iK.jpeg",
    category: "totes",
    description: "A cute tote bag with embroidered cherries and 'LOVE' text.",
  },
  {
    id: "tote-3",
    name: "Nazar Tote",
    price: 929,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ce2e6183-23bf-4c9b-ac47-cab30fe371e6.JPG-mlxoEiTXSDlhrNHL8h8oKggEPSWag1.jpeg",
    category: "totes",
    description: "A protective evil eye design on a natural cotton tote.",
  },
  {
    id: "tote-4",
    name: "Velvet Heart Tote",
    price: 969,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6fe47a59-e5f5-4bb2-b8d9-a81d8bbc0cdb.JPG-ot2C5HQv9tAc5OtaD8WkuoJVwWBM4x.jpeg",
    category: "totes",
    description: "A tote bag with multiple embroidered velvet hearts.",
  },
  {
    id: "tote-5",
    name: "Summer Drizzle Tote",
    price: 989,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d8e03c8a-4879-4a40-97c7-09c8ef3de47c.JPG-3yP5cuKx3kTFf3uffvpnTgDHU8fblB.jpeg",
    category: "totes",
    description: "A watermelon umbrella design perfect for summer.",
  },
  {
    id: "tote-6",
    name: "Teddy Bear Tote",
    price: 999,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5fdb8931-3eda-4b77-a170-cd850c02d9b7.JPG-EOo0U5bIOxnwaMfqeuH8luw4lEi7XZ.jpeg",
    category: "totes",
    description: "A cute teddy bear face embroidered on a natural cotton tote.",
  },
]

export default function ProductsGrid({ category = "all" }: { category?: string }) {
  const [sortBy, setSortBy] = useState("featured")

  // Filter products by category if needed
  const filteredProducts = category === "all" ? products : products.filter((product) => product.category === category)

  // Sort products based on sortBy value
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price
    if (sortBy === "price-desc") return b.price - a.price
    // Default to featured/name
    return a.name.localeCompare(b.name)
  })

  return (
    <div>
      <div className="flex justify-end mb-6">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border rounded-md text-sm">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
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
