import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getAllData, initializeDatabase } from "@/lib/database"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    // Only allow authenticated users to view database
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await getAllData()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching database:", error)
    return NextResponse.json({ error: "Failed to fetch database" }, { status: 500 })
  }
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions)

    // Only allow authenticated users to initialize database
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const success = await initializeDatabase()

    if (success) {
      return NextResponse.json({ message: "Database initialized successfully" })
    } else {
      return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 })
  }
}
