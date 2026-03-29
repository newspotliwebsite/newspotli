import { getMandiPrices, MandiPrice } from '@/lib/mandi'
import MandiPriceTickerClient from './MandiPriceTickerClient'

export default async function MandiPriceTicker() {
  const prices = await getMandiPrices()

  if (!prices || prices.length === 0) return null

  return <MandiPriceTickerClient prices={prices} />
}

export type { MandiPrice }
