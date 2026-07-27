import { GET } from '../api/market.js'

const response = await GET(new Request('http://localhost/api/market?symbol=VNINDEX'))
const payload = await response.json() as {
  symbol?: string
  source?: string
  latest?: { tradingDate?: string; close?: number }
  error?: string
}

if (!response.ok || payload.symbol !== 'VNINDEX' || !payload.latest?.tradingDate) {
  console.error(payload)
  process.exit(1)
}

console.log(JSON.stringify({
  status: response.status,
  symbol: payload.symbol,
  source: payload.source,
  tradingDate: payload.latest.tradingDate,
  close: payload.latest.close,
}, null, 2))
