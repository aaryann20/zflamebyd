import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import AddToCartButton from "@/components/add-to-cart-button"
import RelatedProducts from "@/components/related-products"

// Products data
const products = [
  {
    id: "candle-1",
    name: "Pumpkin Spice Candle",
    price: 999,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4fea9912-96ac-4fb7-953b-9b385fb5c3ad.JPG-lhRUnPtQLGFBJDGUP8LOw2AojOsie6.jpeg",
    category: "candles",
    description:
      "A warm and cozy candle with notes of pumpkin, cinnamon, and nutmeg. Perfect for creating a comforting atmosphere during the fall season. This handmade candle is crafted with natural soy wax and premium fragrance oils for a clean, long-lasting burn.",
    details: [
      "Handmade with natural soy wax",
      "Premium fragrance oils",
      "Cotton wick for a clean burn",
      "Burn time: 40-50 hours",
      'Dimensions: 3.5" x 3.5"',
      "Weight: 8 oz",
    ],
  },
  {
    id: "candle-2",
    name: "Pinecone Candle",
    price: 999,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1d51a97c-4d61-4e2e-a233-819b9b7f2de4.JPG-xLWyxQxHhLGm0fuBx3rFPLVJXM18VN.jpeg",
    category: "candles",
    description:
      "A textured candle inspired by nature with a fresh pine scent. The unique pinecone texture adds a beautiful visual element to any space. Made with natural soy wax and essential oils for a clean, refreshing fragrance.",
    details: [
      "Handmade with natural soy wax",
      "Essential oil blend",
      "Cotton wick for a clean burn",
      "Burn time: 45-55 hours",
      'Dimensions: 3" x 4"',
      "Weight: 10 oz",
    ],
  },
  {
    id: "candle-3",
    name: "Beehive Candle",
    price: 979,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8746f632-6db4-4810-b5ac-f5e11e062693.JPG-RSyQu1kIhPqcBUS9ANvVQVS44BvfIM.jpeg",
    category: "candles",
    description:
      "A honey-scented candle with a unique spiral design reminiscent of a beehive. This handcrafted candle brings a touch of nature-inspired elegance to your home while filling the air with a sweet, comforting honey aroma.",
    details: [
      "Handmade with natural soy wax",
      "Premium honey fragrance",
      "Cotton wick for a clean burn",
      "Burn time: 40-50 hours",
      'Dimensions: 3" x 3.5"',
      "Weight: 9 oz",
    ],
  },
  {
    id: "tote-1",
    name: "Heart Balance Tote",
    price: 899,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4d62fbf7-2ef8-4865-a3c2-1dfe74c884f4.JPG-UVP6sXnj7AtcKd8a4x9tCe60oFnbE6.jpeg",
    category: "totes",
    description:
      "A cotton tote bag featuring a yin-yang heart design, symbolizing balance and harmony. This handmade tote is perfect for shopping, beach trips, or everyday use. The embroidered design adds a unique touch to a practical accessory.",
    details: [
      "100% natural cotton canvas",
      "Hand-embroidered design",
      'Dimensions: 14" x 16"',
      'Handles: 22" length',
      "Interior pocket",
      "Machine washable (gentle cycle)",
    ],
  },
  {
    id: "tote-2",
    name: "Cherry Love Tote",
    price: 949,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2fc0d7cb-58e5-44d9-b916-3fdf2c64698b.JPG-6Gxv8geGLX2tOHUomxBROEq6baI4iK.jpeg",
    category: "totes",
    description:
      "A cute tote bag with embroidered cherries and 'LOVE' text. This charming design brings a playful touch to your everyday accessories. Made from durable cotton canvas with comfortable handles for easy carrying.",
    details: [
      "100% natural cotton canvas",
      "Hand-embroidered design",
      'Dimensions: 14" x 16"',
      'Handles: 22" length',
      "Interior pocket",
      "Machine washable (gentle cycle)",
    ],
  },
  {
    id: "tote-3",
    name: "Nazar Tote",
    price: 929,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ce2e6183-23bf-4c9b-ac47-cab30fe371e6.JPG-mlxoEiTXSDlhrNHL8h8oKggEPSWag1.jpeg",
    category: "totes",
    description:
      "A protective evil eye design on a natural cotton tote. The Nazar symbol is believed to protect against negative energy. This stylish tote combines traditional symbolism with modern functionality.",
    details: [
      "100% natural cotton canvas",
      "Hand-embroidered design",
      'Dimensions: 14" x 16"',
      'Handles: 22" length',
      "Interior pocket",
      "Machine washable (gentle cycle)",
    ],
  },
  {
    id: "tote-4",
    name: "Velvet Heart Tote",
    price: 969,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6fe47a59-e5f5-4bb2-b8d9-a81d8bbc0cdb.JPG-ot2C5HQv9tAc5OtaD8WkuoJVwWBM4x.jpeg",
    category: "totes",
    description:
      "A tote bag with multiple embroidered velvet hearts. The textured velvet hearts create a tactile experience while adding a touch of romance to this practical accessory. Perfect for everyday use or as a thoughtful gift.",
    details: [
      "100% natural cotton canvas",
      "Hand-embroidered velvet hearts",
      'Dimensions: 14" x 16"',
      'Handles: 22" length',
      "Interior pocket",
      "Spot clean recommended",
    ],
  },
  {
    id: "tote-5",
    name: "Summer Drizzle Tote",
    price: 989,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d8e03c8a-4879-4a40-97c7-09c8ef3de47c.JPG-3yP5cuKx3kTFf3uffvpnTgDHU8fblB.jpeg",
    category: "totes",
    description:
      "A watermelon umbrella design perfect for summer. This whimsical tote bag combines two summer favorites in a creative design. The embroidered details add texture and visual interest to this functional accessory.",
    details: [
      "100% natural cotton canvas",
      "Hand-embroidered design",
      'Dimensions: 14" x 16"',
      'Handles: 22" length',
      "Interior pocket",
      "Machine washable (gentle cycle)",
    ],
  },
  {
    id: "tote-6",
    name: "Teddy Bear Tote",
    price: 999,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5fdb8931-3eda-4b77-a170-cd850c02d9b7.JPG-EOo0U5bIOxnwaMfqeuH8luw4lEi7XZ.jpeg",
    category: "totes",
    description:
      "A cute teddy bear face embroidered on a natural cotton tote. This adorable design brings a touch of playfulness to your everyday accessories. The textured embroidery adds dimension and character to this practical tote bag.",
    details: [
      "100% natural cotton canvas",
      "Hand-embroidered design",
      'Dimensions: 14" x 16"',
      'Handles: 22" length',
      "Interior pocket",
      "Machine washable (gentle cycle)",
    ],
  },
]

interface ProductPageProps {
  params: {
    category: string
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return {
      title: "Product Not Found | Zflamebyd",
    }
  }

  return {
    title: `${product.name} | Zflamebyd`,
    description: product.description,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id && p.category === params.category)

  if (!product) {
    notFound()
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <Link
        href={`/products/${params.category}`}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to {params.category === "candles" ? "Candles" : "Tote Bags"}
      </Link>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="font-playfair text-3xl font-bold md:text-4xl">{product.name}</h1>
            <p className="mt-2 text-2xl font-semibold">₹{product.price.toFixed(2)}</p>
          </div>

          <div className="prose prose-gray max-w-none">
            <p>{product.description}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-playfair text-lg font-semibold">Details</h3>
            <ul className="mt-2 space-y-2">
              {product.details.map((detail, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-playfair text-2xl font-bold">You might also like</h2>
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
    </div>
  )
}
