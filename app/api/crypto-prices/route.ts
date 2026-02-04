import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const ids = searchParams.get("ids") || "bitcoin,ethereum,binancecoin"

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd,inr&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 30 }, // Cache for 30 seconds
      }
    )

    if (!response.ok) {
      throw new Error("Failed to fetch crypto prices")
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching crypto prices:", error)
    return NextResponse.json(
      { error: "Failed to fetch crypto prices" },
      { status: 500 }
    )
  }
}
