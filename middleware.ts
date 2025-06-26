import { NextResponse } from "next/server"
import { get } from "@vercel/edge-config"
import type { NextRequest } from "next/server"

export const config = {
  matcher: ["/api/greeting", "/api/company-info"],
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (path === "/api/greeting") {
    const greeting = await get("greeting")
    return NextResponse.json(greeting)
  }

  if (path === "/api/company-info") {
    const companyInfo = await get("company_info")
    return NextResponse.json(companyInfo)
  }

  return NextResponse.next()
}
