import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Fetch Indian indices from Yahoo Finance
    const indices = [
      { symbol: '^NSEI', name: 'nifty50' },      // Nifty 50
      { symbol: '^NSEBANK', name: 'bankNifty' }, // Bank Nifty
      { symbol: '^BSESN', name: 'sensex' },      // Sensex
    ]

    const indicesData: any = {}

    // Fetch each index data
    for (const index of indices) {
      try {
        const response = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${index.symbol}?interval=1d&range=1d`,
          { next: { revalidate: 60 } }
        )
        
        if (response.ok) {
          const data = await response.json()
          const quote = data.chart?.result?.[0]?.meta
          const indicators = data.chart?.result?.[0]?.indicators?.quote?.[0]
          
          if (quote) {
            const currentPrice = quote.regularMarketPrice || 0
            const previousClose = quote.previousClose || quote.chartPreviousClose || 0
            const change = currentPrice - previousClose
            const changePercent = previousClose > 0 ? (change / previousClose) * 100 : 0

            indicesData[index.name] = {
              price: currentPrice,
              change: change.toFixed(2),
              changePercent: changePercent.toFixed(2),
              previousClose: previousClose,
            }
          }
        }
      } catch (error) {
        console.error(`Failed to fetch ${index.name}:`, error)
        // Fallback to mock data if fetch fails
        indicesData[index.name] = {
          price: 0,
          change: '0.00',
          changePercent: '0.00',
          previousClose: 0,
        }
      }
    }

    // Fetch crypto prices from CoinGecko
    const cryptoResponse = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,cardano,solana&vs_currencies=usd,inr&include_24hr_change=true',
      { next: { revalidate: 60 } }
    )

    if (!cryptoResponse.ok) {
      throw new Error('Failed to fetch crypto data')
    }

    const cryptoData = await cryptoResponse.json()

    const marketData = {
      indices: indicesData,
      crypto: {
        bitcoin: {
          price: cryptoData.bitcoin?.usd || 0,
          priceInr: cryptoData.bitcoin?.inr || 0,
          change24h: cryptoData.bitcoin?.usd_24h_change || 0,
        },
        ethereum: {
          price: cryptoData.ethereum?.usd || 0,
          priceInr: cryptoData.ethereum?.inr || 0,
          change24h: cryptoData.ethereum?.usd_24h_change || 0,
        },
        binancecoin: {
          price: cryptoData.binancecoin?.usd || 0,
          priceInr: cryptoData.binancecoin?.inr || 0,
          change24h: cryptoData.binancecoin?.usd_24h_change || 0,
        },
        cardano: {
          price: cryptoData.cardano?.usd || 0,
          priceInr: cryptoData.cardano?.inr || 0,
          change24h: cryptoData.cardano?.usd_24h_change || 0,
        },
        solana: {
          price: cryptoData.solana?.usd || 0,
          priceInr: cryptoData.solana?.inr || 0,
          change24h: cryptoData.solana?.usd_24h_change || 0,
        },
      },
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(marketData)
  } catch (error) {
    console.error('Market data fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    )
  }
}
