"use client"

import Link from "next/link"
import { ArrowLeft, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { Footer } from "@/components/layout/footer"
import { useState, useEffect } from "react"

interface MarketData {
  indices: {
    nifty50: { price: number; change: string; changePercent: string }
    bankNifty: { price: number; change: string; changePercent: string }
    sensex: { price: number; change: string; changePercent: string }
  }
  crypto: {
    [key: string]: {
      price: number
      priceInr: number
      change24h: number
    }
  }
  timestamp: string
}

export default function DashboardPage() {
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchMarketData = async () => {
    setLoading(true)
    try {
      // Fetch Indian indices
      const indices = [
        { symbol: '^NSEI', name: 'nifty50' },
        { symbol: '^NSEBANK', name: 'bankNifty' },
        { symbol: '^BSESN', name: 'sensex' },
      ]

      const indicesData: any = {}

      for (const index of indices) {
        try {
          const response = await fetch(
            `https://query1.finance.yahoo.com/v8/finance/chart/${index.symbol}?interval=1d&range=1d`
          )
          
          if (response.ok) {
            const data = await response.json()
            const quote = data.chart?.result?.[0]?.meta
            
            if (quote) {
              const currentPrice = quote.regularMarketPrice || 0
              const previousClose = quote.previousClose || quote.chartPreviousClose || 0
              const change = currentPrice - previousClose
              const changePercent = previousClose > 0 ? (change / previousClose) * 100 : 0

              indicesData[index.name] = {
                price: currentPrice,
                change: change.toFixed(2),
                changePercent: changePercent.toFixed(2),
              }
            }
          }
        } catch (error) {
          console.error(`Failed to fetch ${index.name}:`, error)
        }
      }

      // Fetch crypto prices
      const cryptoResponse = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,cardano,solana&vs_currencies=usd,inr&include_24hr_change=true'
      )

      const cryptoData = await cryptoResponse.json()

      const data = {
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

      setMarketData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch market data:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMarketData()
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchMarketData, 60000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number, decimals = 2) => {
    return price.toLocaleString('en-IN', { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    })
  }

  const PriceCard = ({ 
    title, 
    price, 
    change, 
    changePercent, 
    currency = '₹',
    decimals = 2 
  }: { 
    title: string
    price: number
    change: number
    changePercent: number
    currency?: string
    decimals?: number
  }) => {
    const isPositive = change >= 0

    return (
      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</h2>
        <p className="text-3xl font-bold mb-2">
          {currency}{formatPrice(price, decimals)}
        </p>
        <div className={`flex items-center gap-1 text-sm font-semibold ${
          isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{isPositive ? '+' : ''}{formatPrice(change, decimals)}</span>
          <span>({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6 flex justify-between items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            
            <div className="flex items-center gap-4">
              {lastUpdated && (
                <span className="text-sm text-gray-500">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={fetchMarketData}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-8">Market Dashboard</h1>

          {loading && !marketData ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading market data...</p>
            </div>
          ) : marketData ? (
            <>
              {/* Indian Indices */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Indian Indices</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {marketData.indices?.nifty50 && (
                    <PriceCard
                      title="Nifty 50"
                      price={marketData.indices.nifty50.price}
                      change={parseFloat(marketData.indices.nifty50.change)}
                      changePercent={parseFloat(marketData.indices.nifty50.changePercent)}
                    />
                  )}
                  {marketData.indices?.bankNifty && (
                    <PriceCard
                      title="Bank Nifty"
                      price={marketData.indices.bankNifty.price}
                      change={parseFloat(marketData.indices.bankNifty.change)}
                      changePercent={parseFloat(marketData.indices.bankNifty.changePercent)}
                    />
                  )}
                  {marketData.indices?.sensex && (
                    <PriceCard
                      title="Sensex"
                      price={marketData.indices.sensex.price}
                      change={parseFloat(marketData.indices.sensex.change)}
                      changePercent={parseFloat(marketData.indices.sensex.changePercent)}
                    />
                  )}
                </div>
              </div>

              {/* Cryptocurrencies */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Cryptocurrencies</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  <PriceCard
                    title="Bitcoin (BTC)"
                    price={marketData.crypto.bitcoin.price}
                    change={marketData.crypto.bitcoin.price * marketData.crypto.bitcoin.change24h / 100}
                    changePercent={marketData.crypto.bitcoin.change24h}
                    currency="$"
                  />
                  <PriceCard
                    title="Ethereum (ETH)"
                    price={marketData.crypto.ethereum.price}
                    change={marketData.crypto.ethereum.price * marketData.crypto.ethereum.change24h / 100}
                    changePercent={marketData.crypto.ethereum.change24h}
                    currency="$"
                  />
                  <PriceCard
                    title="BNB"
                    price={marketData.crypto.binancecoin.price}
                    change={marketData.crypto.binancecoin.price * marketData.crypto.binancecoin.change24h / 100}
                    changePercent={marketData.crypto.binancecoin.change24h}
                    currency="$"
                  />
                  <PriceCard
                    title="Cardano (ADA)"
                    price={marketData.crypto.cardano.price}
                    change={marketData.crypto.cardano.price * marketData.crypto.cardano.change24h / 100}
                    changePercent={marketData.crypto.cardano.change24h}
                    currency="$"
                    decimals={4}
                  />
                  <PriceCard
                    title="Solana (SOL)"
                    price={marketData.crypto.solana.price}
                    change={marketData.crypto.solana.price * marketData.crypto.solana.change24h / 100}
                    changePercent={marketData.crypto.solana.change24h}
                    currency="$"
                  />
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> Crypto prices are live from CoinGecko API. Indian indices are simulated (use NSE API for real data). Data refreshes every 60 seconds.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-red-600">Failed to load market data. Please try again.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
