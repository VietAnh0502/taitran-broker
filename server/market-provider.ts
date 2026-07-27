type VndMarketCandle = {
  code: string
  date: string
  time: string
  open: string | number
  high: string | number
  low: string | number
  close: string | number
  change: string | number
  pctChange: string | number
  accumulatedVol?: string | number
  accumulatedVal?: string | number
  advances?: string | number
  declines?: string | number
  noChange?: string | number
}

type VndPagedResponse = {
  data?: VndMarketCandle[]
}

export type MarketPayload = {
  symbol: string
  source: 'VNDIRECT Finfo'
  fetchedAt: string
  latest: {
    tradingDate: string
    marketTime: string
    open: number
    high: number
    low: number
    close: number
    volume: number
    value: number
    change: number
    changePercent: number
    advances: number
    declines: number
    unchanged: number
  }
  candles: Array<{
    tradingDate: string
    open: number
    high: number
    low: number
    close: number
    volume: number
  }>
}

export class MarketProviderError extends Error {
  constructor(
    message: string,
    public readonly status = 502,
  ) {
    super(message)
    this.name = 'MarketProviderError'
  }
}

const apiBaseUrl = process.env.VNDIRECT_API_BASE_URL || 'https://api-finfo.vndirect.com.vn'
const marketCache = new Map<string, { expiresAt: number; payload: MarketPayload }>()

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10)
}

export async function getMarketData(rawSymbol = 'VNINDEX'): Promise<MarketPayload> {
  const symbol = rawSymbol.toUpperCase()
  if (!/^[A-Z0-9]{2,12}$/.test(symbol)) {
    throw new MarketProviderError('Mã chứng khoán không hợp lệ.', 400)
  }

  const cached = marketCache.get(symbol)
  if (cached && cached.expiresAt > Date.now()) return cached.payload

  const to = new Date()
  const from = new Date(to)
  from.setDate(from.getDate() - 90)
  const params = new URLSearchParams({
    sort: 'date:desc',
    q: `code:${symbol}~date:gte:${isoDate(from)}~date:lte:${isoDate(to)}`,
    page: '1',
    size: '90',
  })

  let providerResponse: Response
  try {
    providerResponse = await fetch(`${apiBaseUrl}/v4/vnmarket_prices?${params}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10_000),
    })
  } catch {
    throw new MarketProviderError('Không thể kết nối tới nguồn dữ liệu VNDIRECT.')
  }

  if (!providerResponse.ok) {
    throw new MarketProviderError(`VNDIRECT_DATA_${providerResponse.status}`)
  }

  const result = await providerResponse.json() as VndPagedResponse
  const candles = [...(result.data || [])]
    .filter(item => Number.isFinite(Number(item.close)))
    .sort((a, b) => a.date.localeCompare(b.date))

  if (candles.length < 2) throw new MarketProviderError('VNDIRECT_DATA_EMPTY')

  const latest = candles.at(-1)!
  const previous = candles.at(-2)!
  const close = Number(latest.close)
  const previousClose = Number(previous.close)
  const change = Number.isFinite(Number(latest.change)) ? Number(latest.change) : close - previousClose
  const changePercent = Number.isFinite(Number(latest.pctChange))
    ? Number(latest.pctChange)
    : previousClose ? change / previousClose * 100 : 0

  const payload: MarketPayload = {
    symbol,
    source: 'VNDIRECT Finfo',
    fetchedAt: new Date().toISOString(),
    latest: {
      tradingDate: latest.date,
      marketTime: latest.time,
      open: Number(latest.open),
      high: Number(latest.high),
      low: Number(latest.low),
      close,
      volume: Number(latest.accumulatedVol || 0),
      value: Number(latest.accumulatedVal || 0),
      change,
      changePercent,
      advances: Number(latest.advances || 0),
      declines: Number(latest.declines || 0),
      unchanged: Number(latest.noChange || 0),
    },
    candles: candles.slice(-30).map(item => ({
      tradingDate: item.date,
      open: Number(item.open),
      high: Number(item.high),
      low: Number(item.low),
      close: Number(item.close),
      volume: Number(item.accumulatedVol || 0),
    })),
  }

  marketCache.set(symbol, { expiresAt: Date.now() + 60_000, payload })
  return payload
}
