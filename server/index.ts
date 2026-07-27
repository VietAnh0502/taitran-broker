import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getMarketData, MarketProviderError } from './market-provider.js'

const app = express()
const port = Number(process.env.PORT || 4173)
const currentFile = fileURLToPath(import.meta.url)
const currentDir = path.dirname(currentFile)
const distDir = path.resolve(currentDir, '../dist')

app.get('/api/market', async (request, response) => {
  const symbol = String(request.query.symbol || 'VNINDEX').toUpperCase()
  try {
    const payload = await getMarketData(symbol)
    response.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=60')
    return response.json(payload)
  } catch (error) {
    const code = error instanceof Error ? error.message : 'UNKNOWN'
    const status = error instanceof MarketProviderError ? error.status : 502
    console.error('Market API error:', code)
    return response.status(status).json({
      error: 'Không thể đồng bộ dữ liệu thị trường từ VNDIRECT lúc này.',
      code,
    })
  }
})

app.use(express.static(distDir, { maxAge: '1h', index: false }))
app.get('/{*splat}', (_request, response) => response.sendFile(path.join(distDir, 'index.html')))

app.listen(port, () => {
  console.log(`HTG website running at http://localhost:${port}`)
})
