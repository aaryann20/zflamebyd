"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [addresses, setAddresses] = useState<any[]>([])
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true)
  const router = useRouter()
  const { items, clearCart } = useCart()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressId: "",
    newAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
    },
    useNewAddress: true,
    paymentMethod: "cod", // Default to COD for now
    notes: "",
  })

  useEffect(() => {
    // Fetch user's saved addresses
    const fetchAddresses = async () => {
      try {
        const response = await fetch("/api/addresses")
        if (response.ok) {
          const data = await response.json()
          setAddresses(data)

          // If user has addresses, default to using saved address
          if (data.length > 0) {
            const defaultAddress = data.find((addr: any) => addr.isDefault) || data[0]
            setFormData((prev) => ({
              ...prev,
              addressId: defaultAddress.id,
              useNewAddress: false,
            }))
          }
        }
      } catch (error) {
        console.error("Error fetching addresses:", error)
      } finally {
        setIsLoadingAddresses(false)
      }
    }

    fetchAddresses()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name.startsWith("newAddress.")) {
      const addressField = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        newAddress: {
          ...prev.newAddress,
          [addressField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Prepare shipping details
      let shippingDetails

      if (formData.useNewAddress) {
        shippingDetails = {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.newAddress.street,
          city: formData.newAddress.city,
          state: formData.newAddress.state,
          zipCode: formData.newAddress.zipCode,
          country: formData.newAddress.country,
        }
      } else {
        const selectedAddress = addresses.find((addr) => addr.id === formData.addressId)
        if (!selectedAddress) {
          throw new Error("Selected address not found")
        }

        shippingDetails = {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode,
          country: selectedAddress.country,
        }
      }

      // Create order
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          shippingDetails,
          paymentMethod: formData.paymentMethod,
          notes: formData.notes,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create order")
      }

      const order = await response.json()

      // Clear cart and redirect to success page
      clearCart()
      router.push(`/checkout/success?order_id=${order.id}`)
    } catch (error: any) {
      console.error("Checkout error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to process checkout. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-playfair text-xl font-semibold">Contact Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-playfair text-xl font-semibold">Shipping Address</h2>

        {!isLoadingAddresses && addresses.length > 0 && (
          <div className="space-y-4">
            <RadioGroup
              value={formData.useNewAddress ? "new" : "saved"}
              onValueChange={(value) => handleRadioChange("useNewAddress", value === "new")}
              className="grid gap-4"
            >
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="saved" id="saved-address" />
                <Label htmlFor="saved-address" className="flex-1 cursor-pointer">
                  Use a saved address
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="new" id="new-address" />
                <Label htmlFor="new-address" className="flex-1 cursor-pointer">
                  Enter a new address
                </Label>
              </div>
            </RadioGroup>

            {!formData.useNewAddress && (
              <div className="space-y-2">
                <Label htmlFor="addressId">Select Address</Label>
                <select
                  id="addressId"
                  name="addressId"
                  value={formData.addressId}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  required={!formData.useNewAddress}
                >
                  <option value="">Select an address</option>
                  {addresses.map((address) => (
                    <option key={address.id} value={address.id}>
                      {address.name} - {address.street}, {address.city}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {(formData.useNewAddress || addresses.length === 0) && (
          <>
            <div className="space-y-2">
              <Label htmlFor="street">Address</Label>
              <Input
                id="street"
                name="newAddress.street"
                value={formData.newAddress.street}
                onChange={handleChange}
                required={formData.useNewAddress}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="newAddress.city"
                  value={formData.newAddress.city}
                  onChange={handleChange}
                  required={formData.useNewAddress}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State / Province</Label>
                <Input
                  id="state"
                  name="newAddress.state"
                  value={formData.newAddress.state}
                  onChange={handleChange}
                  required={formData.useNewAddress}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="zipCode">PIN Code</Label>
                <Input
                  id="zipCode"
                  name="newAddress.zipCode"
                  value={formData.newAddress.zipCode}
                  onChange={handleChange}
                  required={formData.useNewAddress}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="newAddress.country"
                  value={formData.newAddress.country}
                  onChange={handleChange}
                  required={formData.useNewAddress}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="font-playfair text-xl font-semibold">Payment Method</h2>
        <div className="rounded-md border p-4">
          <div className="flex items-center">
            <RadioGroupItem value="cod" id="cod" checked readOnly />
            <Label htmlFor="cod" className="ml-2 flex-1 cursor-pointer">
              Cash on Delivery
            </Label>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Pay with cash when your order is delivered. Other payment methods will be available soon.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Order Notes (Optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Special instructions for your order"
          className="min-h-[100px]"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full bg-terracotta hover:bg-terracotta/90">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Place Order"
        )}
      </Button>
    </form>
  )
}
