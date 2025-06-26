import { NextResponse } from "next/server"
import { get, set } from "@vercel/edge-config"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // In a real app, you would use a service like Mailchimp or SendGrid
    // For demo, we'll use Edge Config
    const subscribers = (await get("newsletter_subscribers")) || []

    // Check if already subscribed
    if (subscribers.includes(email)) {
      return NextResponse.json({ message: "You are already subscribed" }, { status: 200 })
    }

    // Add to subscribers list
    await set("newsletter_subscribers", [...subscribers, email])

    return NextResponse.json({ message: "Successfully subscribed" }, { status: 201 })
  } catch (error: any) {
    console.error("Newsletter subscription error:", error)

    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
