import { NextResponse } from 'next/server'
import { getMandiPrices } from '@/lib/mandi'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const prices = await getMandiPrices()

    return NextResponse.json(prices, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Mandi API route error:', message)

    return NextResponse.json(
      { error: 'Failed to fetch mandi prices' },
      { status: 500 }
    )
  }
}
