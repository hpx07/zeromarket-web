"use client"

import Link from "next/link"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"

interface Holding {
  id: string
  symbol: string
  quantity: number
  buyPrice: number
  currentPrice: number
}

export default function PortfolioTrackerPage() {
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [symbol, setSymbol] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [buyPrice, setBuyPrice] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem("portfolio")
    if (saved) {
      setHoldings(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(holdings))
  }, [holdings])

  const addHolding = () => {
    if (!symbol || quantity <= 0 || buyPrice <= 0) return

    const newHolding: Holding = {
      id: Date.now().toString(),
      symbol: symbol.toUpperCase(),
      quantity,
      buyPrice,
      currentPrice: buyPrice,
    }

    setHoldings([...holdings, newHolding])
    setSymbol("")
    setQuantity(0)
    setBuyPrice(0)
  }

  const removeHolding = (id: string) => {
    setHoldings(holdings.filter(h => h.id !== id))
  }

  const updatePrice = (id: string, price: number) => {
    setHoldings(holdings.map(h => h.id === id ? { ...h, currentPrice: price } : h))
  }

  const totalInvested = holdings.reduce((sum, h) => sum + h.quantity * h.buyPrice, 0)
  const currentValue = holdings.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0)
  const totalPnL = currentValue - totalInvested
  const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">Portfolio Tracker</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Track your stock and crypto holdings with P&L analysis
        </p>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Invested</p>
            <p className="text-2xl font-bold">₹{totalInvested.toLocaleString("en-IN")}</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Value</p>
            <p className="text-2xl font-bold">₹{currentValue.toLocaleString("en-IN")}</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total P&L</p>
            <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{totalPnL.toLocaleString("en-IN")} ({totalPnLPercent.toFixed(2)}%)
            </p>
          </div>
        </div>

        {/* Add Holding Form */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add Holding</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Symbol (e.g., AAPL)"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity || ""}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
            />
            <input
              type="number"
              placeholder="Buy Price"
              value={buyPrice || ""}
              onChange={(e) => setBuyPrice(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
            />
            <button
              onClick={addHolding}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-900">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Symbol</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Qty</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Buy Price</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Current Price</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Invested</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Current</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">P&L</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {holdings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      No holdings added yet. Add your first holding above.
                    </td>
                  </tr>
                ) : (
                  holdings.map((holding) => {
                    const invested = holding.quantity * holding.buyPrice
                    const current = holding.quantity * holding.currentPrice
                    const pnl = current - invested
                    const pnlPercent = (pnl / invested) * 100

                    return (
                      <tr key={holding.id}>
                        <td className="px-4 py-3 font-medium">{holding.symbol}</td>
                        <td className="px-4 py-3 text-right">{holding.quantity}</td>
                        <td className="px-4 py-3 text-right">₹{holding.buyPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right">
                          <input
                            type="number"
                            value={holding.currentPrice}
                            onChange={(e) => updatePrice(holding.id, Number(e.target.value))}
                            className="w-24 px-2 py-1 text-right border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900"
                          />
                        </td>
                        <td className="px-4 py-3 text-right">₹{invested.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-3 text-right">₹{current.toLocaleString("en-IN")}</td>
                        <td className={`px-4 py-3 text-right font-semibold ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ₹{pnl.toLocaleString("en-IN")} ({pnlPercent.toFixed(2)}%)
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => removeHolding(holding.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> Data is stored locally in your browser. Update current prices manually to track P&L. For real-time prices, consider integrating with a market data API.
          </p>
        </div>
      </div>
    </div>
  )
}
