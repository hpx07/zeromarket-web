"use client"

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface TickerData {
  name: string
  price: number
  change: number
  changePercent: number
}

export function CustomTicker() {
  const [tickers, setTickers] = useState<TickerData[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      // Fetch directly from Yahoo Finance API
      const indices = [
        { symbol: '^NSEI', name: 'Nifty 50', key: 'nifty50' },
        { symbol: '^NSEBANK', name: 'Bank Nifty', key: 'bankNifty' },
      ]

      const tickerData: TickerData[] = []

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

              tickerData.push({
                name: index.name,
                price: currentPrice,
                change: change,
                changePercent: changePercent,
              })
            }
          }
        } catch (error) {
          console.error(`Failed to fetch ${index.name}:`, error)
        }
      }

      if (tickerData.length > 0) {
        setTickers(tickerData)
      }
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch ticker data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000) // Update every 60 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex gap-4 justify-center py-2">
        <div className="animate-pulse flex gap-4">
          <div className="h-8 w-32 bg-gray-200 dark:bg-slate-700 rounded"></div>
          <div className="h-8 w-32 bg-gray-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-6 justify-center items-center py-2 overflow-x-auto">
      {tickers.map((ticker) => {
        const isPositive = ticker.change >= 0
        return (
          <div
            key={ticker.name}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-900 rounded-lg min-w-fit"
          >
            <span className="font-semibold text-sm">{ticker.name}</span>
            <span className="text-lg font-bold">
              ₹{ticker.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{isPositive ? '+' : ''}{ticker.change.toFixed(2)}</span>
              <span>({isPositive ? '+' : ''}{ticker.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
