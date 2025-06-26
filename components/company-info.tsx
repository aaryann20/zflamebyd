"use client"

import { useState, useEffect } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function CompanyInfo() {
  const [companyInfo, setCompanyInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await fetch("/api/company-info")
        const data = await response.json()
        setCompanyInfo(data)
      } catch (error) {
        console.error("Failed to fetch company info:", error)
        // Fallback data
        setCompanyInfo({
          address: {
            street: "3Gha1, Vigyan Nagar",
            city: "Kota",
            state: "Rajasthan",
            zipCode: "324005",
            country: "India",
          },
          phone: "+91 98765 43210",
          email: "zflamebyd@gmail.com",
          hours: {
            weekdays: "10:00 AM - 6:00 PM",
            weekends: "11:00 AM - 4:00 PM",
          },
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompanyInfo()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-start">
          <Skeleton className="h-5 w-5 mr-2" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex items-start">
          <Skeleton className="h-5 w-5 mr-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-start">
          <Skeleton className="h-5 w-5 mr-2" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex items-start">
          <Skeleton className="h-5 w-5 mr-2" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start">
        <MapPin className="mr-2 h-5 w-5 shrink-0 text-terracotta" />
        <address className="not-italic">
          {companyInfo.address.street}
          <br />
          {companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zipCode}
          <br />
          {companyInfo.address.country}
        </address>
      </div>
      <div className="flex items-center">
        <Phone className="mr-2 h-5 w-5 shrink-0 text-terracotta" />
        <a href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`} className="hover:underline">
          {companyInfo.phone}
        </a>
      </div>
      <div className="flex items-center">
        <Mail className="mr-2 h-5 w-5 shrink-0 text-terracotta" />
        <a href={`mailto:${companyInfo.email}`} className="hover:underline">
          {companyInfo.email}
        </a>
      </div>
      <div className="flex items-start">
        <Clock className="mr-2 h-5 w-5 shrink-0 text-terracotta" />
        <div>
          <p>Weekdays: {companyInfo.hours.weekdays}</p>
          <p>Weekends: {companyInfo.hours.weekends}</p>
        </div>
      </div>
    </div>
  )
}
