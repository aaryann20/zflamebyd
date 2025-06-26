"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"

interface AddressBookProps {
  userId: string
}

export default function AddressBook({ userId }: AddressBookProps) {
  const { toast } = useToast()
  const [addresses, setAddresses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<any>(null)

  useEffect(() => {
    fetchAddresses()
  }, [userId])

  const fetchAddresses = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/addresses")
      if (!response.ok) {
        throw new Error("Failed to fetch addresses")
      }
      const data = await response.json()
      setAddresses(data)
    } catch (error) {
      console.error("Error fetching addresses:", error)
      toast({
        title: "Error",
        description: "Failed to load addresses. Please try again later.",
        variant: "destructive",
      })
      // Set empty array as fallback
      setAddresses([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (address: any) => {
    setCurrentAddress(address)
    setIsEditing(true)
  }

  const handleDelete = async (addressId: string) => {
    try {
      const response = await fetch(`/api/addresses/${addressId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete address")
      }

      setAddresses(addresses.filter((addr) => addr.id !== addressId))
      toast({
        title: "Address deleted",
        description: "The address has been deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting address:", error)
      toast({
        title: "Error",
        description: "Failed to delete address. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const handleAddNew = () => {
    setCurrentAddress({
      id: "",
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
      isDefault: false,
    })
    setIsEditing(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setCurrentAddress({
      ...currentAddress,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let response

      if (currentAddress.id) {
        // Update existing address
        response = await fetch(`/api/addresses/${currentAddress.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentAddress),
        })
      } else {
        // Add new address
        response = await fetch("/api/addresses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentAddress),
        })
      }

      if (!response.ok) {
        throw new Error(currentAddress.id ? "Failed to update address" : "Failed to add address")
      }

      // Refresh addresses
      await fetchAddresses()

      toast({
        title: currentAddress.id ? "Address updated" : "Address added",
        description: currentAddress.id
          ? "The address has been updated successfully"
          : "The new address has been added successfully",
      })

      setIsEditing(false)
      setCurrentAddress(null)
    } catch (error) {
      console.error("Error saving address:", error)
      toast({
        title: "Error",
        description: "Failed to save address. Please try again later.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{currentAddress.id ? "Edit Address" : "Add New Address"}</CardTitle>
          <CardDescription>
            {currentAddress.id ? "Update your address information" : "Add a new shipping address"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Address Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Home, Office, etc."
                value={currentAddress.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                name="street"
                placeholder="123 Main St"
                value={currentAddress.street}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Mumbai"
                  value={currentAddress.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="Maharashtra"
                  value={currentAddress.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">PIN Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  placeholder="400001"
                  value={currentAddress.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="India"
                  value={currentAddress.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={currentAddress.isDefault}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="isDefault" className="text-sm font-normal">
                Set as default address
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsEditing(false)
                setCurrentAddress(null)
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-terracotta hover:bg-terracotta/90">
              {currentAddress.id ? "Update Address" : "Add Address"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={handleAddNew} className="bg-terracotta hover:bg-terracotta/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Addresses</CardTitle>
            <CardDescription>You haven't added any addresses yet.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleAddNew} className="bg-terracotta hover:bg-terracotta/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        addresses.map((address) => (
          <Card key={address.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  {address.name}
                  {address.isDefault && (
                    <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      Default
                    </span>
                  )}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(address)}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(address.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p>{address.country}</p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
