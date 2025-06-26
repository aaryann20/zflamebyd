import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Playfair_Display, Lato } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
})

export const metadata: Metadata = {
  title: "Zflamebyd | Handmade Candles & Tote Bags",
  description: "Handmade candles and tote bags – Light up your style",
  openGraph: {
    title: "Zflamebyd | Handmade Candles & Tote Bags",
    description: "Handmade candles and tote bags – Light up your style",
    type: "website",
    locale: "en_US",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable} font-sans`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
