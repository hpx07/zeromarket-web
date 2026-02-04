"use client"

import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { useState } from "react"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  volume: number
  marketCap: number
  pe: number
}

export default function StockScreenerPage() {
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000)
  const [minPE, setMinPE] = useState(0)
  const [maxPE, setMaxPE] = useState(100)
  const [minVolume, setMinVolume] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  const allStocks: Stock[] = [
    { symbol: "RELIANCE", name: "Reliance Industries", price: 2450, change: 2.5, volume: 5000000, marketCap: 16500000, pe: 25.5 },
    { symbol: "TCS", name: "Tata Consultancy Services", price: 3650, change: -1.2, volume: 2000000, marketCap: 13300000, pe: 28.3 },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: 1580, change: 0.8, volume: 8000000, marketCap: 8700000, pe: 18.7 },
    { symbol: "INFY", name: "Infosys", price: 1450, change: 1.5, volume: 6000000, marketCap: 6000000, pe: 22.1 },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: 950, change: -0.5, volume: 12000000, marketCap: 6600000, pe: 16.5 },
    { symbol: "HINDUNILVR", name: "Hindustan Unilever", price: 2380, change: 0.3, volume: 1500000, marketCap: 5600000, pe: 55.2 },
    { symbol: "ITC", name: "ITC Limited", price: 420, change: 1.8, volume: 10000000, marketCap: 5200000, pe: 24.8 },
    { symbol: "SBIN", name: "State Bank of India", price: 580, change: 2.1, volume: 15000000, marketCap: 5100000, pe: 12.3 },
    { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 850, change: -0.8, volume: 7000000, marketCap: 4800000, pe: 32.5 },
    { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", price: 1720, change: 0.6, volume: 3000000, marketCap: 3400000, pe: 15.8 },
  ]

  const filteredStocks = allStocks.filter(stock => {
    const matchesPrice = stock.price >= minPrice && stock.price <= maxPrice
    const matchesPE = stock.pe >= minPE && stock.pe <= maxPE
    const matchesVolume = stock.volume >= minVolume
    const matchesSearch = searchQuery === "" || 
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesPrice && matchesPE && matchesVolume && matchesSearch
  })

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">Stock & Crypto Screener</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Filter and screen assets based on criteria</p>

        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 mb-6">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Min Price (₹)</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max Price (₹)</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Min P/E Ratio</label>
              <input
                type="number"
                value={minPE}
                onChange={(e) => setMinPE(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max P/E Ratio</label>
              <input
                type="number"
                value={maxPE}
                onChange={(e) => setMaxPE(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Min Volume</label>
              <input
                type="number"
                value={minVolume}
                onChange={(e) => setMinVolume(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by symbol or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredStocks.length} of {allStocks.length} stocks
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-900">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Symbol</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Price</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Change %</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Volume</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Market Cap</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">P/E</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {filteredStocks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No stocks match your criteria
                    </td>
                  </tr>
                ) : (
                  filteredStocks.map((stock) => (
                    <tr key={stock.symbol} className="hover:bg-gray-50 dark:hover:bg-slate-900">
                      <td className="px-4 py-3 font-medium">{stock.symbol}</td>
                      <td className="px-4 py-3">{stock.name}</td>
                      <td className="px-4 py-3 text-right">₹{stock.price.toLocaleString("en-IN")}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                      </td>
                      <td className="px-4 py-3 text-right">{(stock.volume / 1000000).toFixed(2)}M</td>
                      <td className="px-4 py-3 text-right">₹{(stock.marketCap / 10000).toLocaleString("en-IN")}Cr</td>
                      <td className="px-4 py-3 text-right">{stock.pe.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
