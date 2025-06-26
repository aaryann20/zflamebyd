import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About Us | Zflamebyd",
  description: "Learn more about Zflamebyd and our handmade candles and tote bags",
}

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-center mb-8">
          Our Story
        </h1>

        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=600&width=1200" alt="Zflamebyd workshop" fill className="object-cover" />
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="lead">
            Zflamebyd was born from a passion for craftsmanship and a desire to create products that bring warmth and
            style to everyday life.
          </p>

          <h2>Our Beginning</h2>
          <p>
            Founded in 2020, Zflamebyd started as a small home-based workshop where we experimented with candle making
            and fabric design. What began as a creative outlet during challenging times quickly evolved into a beloved
            brand known for its attention to detail and commitment to quality.
          </p>

          <h2>Our Craft</h2>
          <p>
            Each Zflamebyd product is handcrafted with care and attention to detail. Our candles are made from natural
            soy wax, premium fragrance oils, and cotton wicks for a clean, long-lasting burn. Our tote bags are crafted
            from durable cotton canvas and feature hand-embroidered designs that add a unique touch to these practical
            accessories.
          </p>

          <h2>Our Values</h2>
          <p>At Zflamebyd, we believe in:</p>
          <ul>
            <li>
              <strong>Sustainability</strong> - Using eco-friendly materials and minimizing waste in our production
              process.
            </li>
            <li>
              <strong>Quality</strong> - Creating products that are both beautiful and durable.
            </li>
            <li>
              <strong>Creativity</strong> - Continuously exploring new designs and techniques.
            </li>
            <li>
              <strong>Community</strong> - Building relationships with our customers and supporting local artisans.
            </li>
          </ul>

          <h2>Our Team</h2>
          <p>
            Behind Zflamebyd is our founder and lead artisan, Divya Soni, along with a small team of passionate
            craftspeople dedicated to creating products that bring joy and beauty to your everyday life. From design to
            production to packaging, every step is handled with care and attention to detail.
          </p>

          <h2>Our Location</h2>
          <p>
            We are proudly based in Kota, Rajasthan, India, where we draw inspiration from the vibrant colors, rich
            textures, and diverse cultural influences of our surroundings. Our workshop is located in Vigyan Nagar,
            where all our products are handcrafted with love.
          </p>

          <div className="not-prose mt-8 text-center">
            <Link href="/contact">
              <Button className="bg-terracotta hover:bg-terracotta/90">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
