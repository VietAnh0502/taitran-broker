import { getMarketData, MarketProviderError } from '../server/market-provider.js'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const symbol = url.searchParams.get('symbol') || 'VNINDEX'

  try {
    const payload = await getMarketData(symbol)
    return Response.json(payload, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    })
  } catch (error) {
    const status = error instanceof MarketProviderError ? error.status : 502
    const code = error instanceof Error ? error.message : 'UNKNOWN'
    return Response.json(
      {
        error: status === 400
          ? 'Mã chứng khoán không hợp lệ.'
          : 'Không thể đồng bộ dữ liệu thị trường từ VNDIRECT lúc này.',
        code,
      },
      { status },
    )
  }
}
