import type { Metadata } from "next"
import ContactForm from "@/components/contact-form"
import CompanyInfo from "@/components/company-info"

export const metadata: Metadata = {
  title: "Contact Us | Zflamebyd",
  description: "Get in touch with us for any inquiries or feedback",
}

export default function ContactPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="font-playfair text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Contact Us</h1>
          <p className="mt-4 text-muted-foreground">Have questions or feedback? We'd love to hear from you.</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-playfair text-xl font-semibold">Get in Touch</h2>
            <p className="mt-2 text-muted-foreground">
              Fill out the form and we'll get back to you as soon as possible.
            </p>

            <div className="mt-8">
              <CompanyInfo />
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
