"use client"

import { useEffect, useRef, useState } from 'react'

export function TickerTape() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [indicesData, setIndicesData] = useState<any>(null)

  // Fetch Indian indices data
  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const response = await fetch('/api/market-data')
        const data = await response.json()
        if (data.indices) {
          setIndicesData(data.indices)
        }
      } catch (error) {
        console.error('Failed to fetch indices:', error)
      }
    }

    fetchIndices()
    const interval = setInterval(fetchIndices, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Detect theme
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')
      setTheme(isDark ? 'dark' : 'light')
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    // Clear previous widget
    containerRef.current.innerHTML = ''

    const symbols = [
      {
        description: "S&P 500",
        proName: "FOREXCOM:SPXUSD"
      },
      {
        description: "Dow Jones",
        proName: "FOREXCOM:DJI"
      },
      {
        description: "Sensex",
        proName: "BSE:SENSEX"
      },
      {
        description: "Apple",
        proName: "NASDAQ:AAPL"
      },
      {
        description: "Google",
        proName: "NASDAQ:GOOGL"
      },
      {
        description: "Microsoft",
        proName: "NASDAQ:MSFT"
      },
      {
        description: "Tesla",
        proName: "NASDAQ:TSLA"
      },
      {
        description: "Bitcoin",
        proName: "BINANCE:BTCUSDT"
      },
      {
        description: "Ethereum",
        proName: "BINANCE:ETHUSDT"
      },
      {
        description: "BNB",
        proName: "BINANCE:BNBUSDT"
      },
      {
        description: "Solana",
        proName: "BINANCE:SOLUSDT"
      },
      {
        description: "Cardano",
        proName: "BINANCE:ADAUSDT"
      },
      {
         description: "USD/INR",
         proName: "FX_IDC:USDINR"
      }
    ]

    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols,
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: theme,
      locale: "en"
    })

    containerRef.current.appendChild(script)
  }, [theme])

  return (
    <div className="space-y-3">
      {/* Custom Indian Indices Ticker */}
      {indicesData && (
        <div className="flex gap-4 justify-center items-center flex-wrap px-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span className="font-semibold text-sm">Nifty 50</span>
            <span className="text-lg font-bold">
              ₹{indicesData.nifty50?.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
            <span className={`text-sm font-semibold ${
              parseFloat(indicesData.nifty50?.change || '0') >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {parseFloat(indicesData.nifty50?.change || '0') >= 0 ? '+' : ''}
              {indicesData.nifty50?.change} ({indicesData.nifty50?.changePercent}%)
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <span className="font-semibold text-sm">Bank Nifty</span>
            <span className="text-lg font-bold">
              ₹{indicesData.bankNifty?.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </span>
            <span className={`text-sm font-semibold ${
              parseFloat(indicesData.bankNifty?.change || '0') >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {parseFloat(indicesData.bankNifty?.change || '0') >= 0 ? '+' : ''}
              {indicesData.bankNifty?.change} ({indicesData.bankNifty?.changePercent}%)
            </span>
          </div>
        </div>
      )}

      {/* TradingView Ticker */}
      <div className="tradingview-widget-container w-full" ref={containerRef}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  )
}
