import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getUserAddresses, addAddress } from "@/lib/database"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const addresses = await getUserAddresses(session.user.id)
    return NextResponse.json(addresses)
  } catch (error) {
    console.error("Error fetching addresses:", error)
    return NextResponse.json({ error: "Failed to fetch addresses" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const addressData = await request.json()

    // Validate required fields
    if (!addressData.name || !addressData.street || !addressData.city || !addressData.state || !addressData.zipCode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newAddress = await addAddress({
      ...addressData,
      userId: session.user.id,
    })

    return NextResponse.json(newAddress, { status: 201 })
  } catch (error) {
    console.error("Error adding address:", error)
    return NextResponse.json({ error: "Failed to add address" }, { status: 500 })
  }
}
