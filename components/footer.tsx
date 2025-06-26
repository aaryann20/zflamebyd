import Link from "next/link"
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-beige/30 border-t">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-playfair text-xl font-bold">Zflamebyd</h3>
            <p className="text-sm text-muted-foreground">
              Handmade candles and tote bags crafted with love and attention to detail.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com/zflamebyd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com/zflamebyd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com/zflamebyd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:zflamebyd@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-playfair text-base font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products/candles"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Candles
                </Link>
              </li>
              <li>
                <Link href="/products/totes" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tote Bags
                </Link>
              </li>
              <li>
                <Link href="/products/new" className="text-muted-foreground hover:text-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/products/bestsellers"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-playfair text-base font-semibold">Information</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-playfair text-base font-semibold">Contact Us</h4>
            <address className="not-italic space-y-2 text-sm">
              <div className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" />
                <span>
                  3Gha1, Vigyan Nagar
                  <br />
                  Kota, Rajasthan 324005
                  <br />
                  India
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" />
                <a href="mailto:zflamebyd@gmail.com" className="hover:underline">
                  zflamebyd@gmail.com
                </a>
              </div>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Zflamebyd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
