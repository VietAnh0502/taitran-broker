export type MarketCandle = {
  tradingDate: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export type MarketData = {
  symbol: string
  source: string
  fetchedAt: string
  latest: MarketCandle & {
    marketTime: string
    value: number
    change: number
    changePercent: number
    advances: number
    declines: number
    unchanged: number
  }
  candles: MarketCandle[]
}

export async function fetchMarketData(symbol = 'VNINDEX', signal?: AbortSignal) {
  const response = await fetch(`/api/market?symbol=${encodeURIComponent(symbol)}`, {
    headers: { Accept: 'application/json' },
    signal,
  })
  const result = await response.json() as MarketData | { error?: string }
  if (!response.ok) {
    throw new Error('error' in result && result.error ? result.error : 'Không thể tải dữ liệu thị trường.')
  }
  return result as MarketData
}
