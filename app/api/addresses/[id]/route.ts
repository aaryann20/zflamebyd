import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { updateAddress, deleteAddress, getUserAddresses } from "@/lib/database"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const addressId = params.id
    const addressData = await request.json()

    // Verify the address belongs to the user
    const userAddresses = await getUserAddresses(session.user.id)
    const addressExists = userAddresses.some((addr: any) => addr.id === addressId)

    if (!addressExists) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 })
    }

    const success = await updateAddress(addressId, addressData)

    if (success) {
      return NextResponse.json({ message: "Address updated successfully" })
    } else {
      return NextResponse.json({ error: "Failed to update address" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error updating address:", error)
    return NextResponse.json({ error: "Failed to update address" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const addressId = params.id

    // Verify the address belongs to the user
    const userAddresses = await getUserAddresses(session.user.id)
    const addressExists = userAddresses.some((addr: any) => addr.id === addressId)

    if (!addressExists) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 })
    }

    const success = await deleteAddress(addressId)

    if (success) {
      return NextResponse.json({ message: "Address deleted successfully" })
    } else {
      return NextResponse.json({ error: "Failed to delete address" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error deleting address:", error)
    return NextResponse.json({ error: "Failed to delete address" }, { status: 500 })
  }
}
