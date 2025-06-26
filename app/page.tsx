import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import FeaturedProducts from "@/components/featured-products"
import Newsletter from "@/components/newsletter"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cream py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Handmade Candles & Tote Bags
                </h1>
                <p className="max-w-[600px] text-gray-700 md:text-xl">
                  Light Up Your Style with our artisanal collection of handcrafted candles and unique tote bags.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg" className="bg-terracotta hover:bg-terracotta/90">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4fea9912-96ac-4fb7-953b-9b385fb5c3ad.JPG-lhRUnPtQLGFBJDGUP8LOw2AojOsie6.jpeg"
                  alt="Pumpkin shaped candle"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-square"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4d62fbf7-2ef8-4865-a3c2-1dfe74c884f4.JPG-UVP6sXnj7AtcKd8a4x9tCe60oFnbE6.jpeg"
                  alt="Handmade tote bag"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 lg:py-20 bg-beige/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Featured Products</h2>
              <p className="max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our most loved handmade creations
              </p>
            </div>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -left-4 -top-4 h-[calc(100%+32px)] w-[calc(100%+32px)] rounded-xl bg-terracotta/20" />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1d51a97c-4d61-4e2e-a233-819b9b7f2de4.JPG-xLWyxQxHhLGm0fuBx3rFPLVJXM18VN.jpeg"
                  alt="Handcrafted candle"
                  width={400}
                  height={400}
                  className="relative rounded-lg object-cover w-full aspect-square"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Crafted with Love</h2>
                <p className="max-w-[600px] text-gray-700 md:text-xl/relaxed">
                  At Zflamebyd, every candle and tote bag is handmade with care and attention to detail. Our products
                  are designed to bring warmth and style to your everyday life.
                </p>
              </div>
              <div>
                <Link href="/about">
                  <Button variant="outline" className="border-terracotta text-terracotta hover:bg-terracotta/10">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16 lg:py-20 bg-sage/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Shop by Category</h2>
              <p className="max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our collections
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Link href="/products/candles" className="group relative overflow-hidden rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8746f632-6db4-4810-b5ac-f5e11e062693.JPG-RSyQu1kIhPqcBUS9ANvVQVS44BvfIM.jpeg"
                alt="Candles collection"
                width={600}
                height={400}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h3 className="text-white text-3xl font-bold">Candles</h3>
              </div>
            </Link>
            <Link href="/products/totes" className="group relative overflow-hidden rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6fe47a59-e5f5-4bb2-b8d9-a81d8bbc0cdb.JPG-ot2C5HQv9tAc5OtaD8WkuoJVwWBM4x.jpeg"
                alt="Tote bags collection"
                width={600}
                height={400}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h3 className="text-white text-3xl font-bold">Tote Bags</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}
