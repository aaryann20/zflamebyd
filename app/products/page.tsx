import type { Metadata } from "next"
import ProductsGrid from "@/components/products-grid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Shop All Products | Zflamebyd",
  description: "Browse our collection of handmade candles and tote bags",
}

export default function ProductsPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Shop All Products</h1>
          <p className="text-muted-foreground">Browse our collection of handmade candles and tote bags</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="mt-8">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="candles">Candles</TabsTrigger>
          <TabsTrigger value="totes">Tote Bags</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ProductsGrid category="all" />
        </TabsContent>
        <TabsContent value="candles">
          <ProductsGrid category="candles" />
        </TabsContent>
        <TabsContent value="totes">
          <ProductsGrid category="totes" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
