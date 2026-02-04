"use client"

import Link from "next/link"
import { ArrowLeft, Plus, X } from "lucide-react"
import { useState } from "react"

export default function CorrelationMatrixPage() {
  const [symbols, setSymbols] = useState<string[]>(["NIFTY", "BANKNIFTY", "RELIANCE", "TCS"])
  const [newSymbol, setNewSymbol] = useState("")

  const addSymbol = () => {
    if (newSymbol && !symbols.includes(newSymbol.toUpperCase())) {
      setSymbols([...symbols, newSymbol.toUpperCase()])
      setNewSymbol("")
    }
  }

  const removeSymbol = (symbol: string) => {
    setSymbols(symbols.filter(s => s !== symbol))
  }

  // Generate mock correlation data
  const getCorrelation = (symbol1: string, symbol2: string): number => {
    if (symbol1 === symbol2) return 1.0
    
    // Mock correlation calculation based on symbol names
    const hash = (symbol1 + symbol2).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const correlation = (Math.sin(hash) * 0.5 + 0.5) * 1.8 - 0.9
    return Math.max(-1, Math.min(1, correlation))
  }

  const getCorrelationColor = (value: number): string => {
    if (value === 1) return "bg-blue-600 text-white"
    if (value > 0.7) return "bg-green-500 text-white"
    if (value > 0.3) return "bg-green-200 dark:bg-green-900/40"
    if (value > -0.3) return "bg-gray-200 dark:bg-gray-700"
    if (value > -0.7) return "bg-red-200 dark:bg-red-900/40"
    return "bg-red-500 text-white"
  }

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">Asset Correlation Matrix</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Visualize correlation between multiple assets</p>

        {/* Add Symbol */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 mb-6">
          <h2 className="text-xl font-semibold mb-4">Manage Assets</h2>
          
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Enter symbol (e.g., INFY)"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSymbol()}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
            />
            <button
              onClick={addSymbol}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {symbols.map((symbol) => (
              <div
                key={symbol}
                className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
              >
                <span className="font-medium">{symbol}</span>
                <button
                  onClick={() => removeSymbol(symbol)}
                  className="hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Correlation Matrix */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Correlation Matrix</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900"></th>
                    {symbols.map((symbol) => (
                      <th
                        key={symbol}
                        className="p-2 border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 font-semibold text-sm"
                      >
                        {symbol}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {symbols.map((symbol1) => (
                    <tr key={symbol1}>
                      <td className="p-2 border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 font-semibold text-sm">
                        {symbol1}
                      </td>
                      {symbols.map((symbol2) => {
                        const correlation = getCorrelation(symbol1, symbol2)
                        return (
                          <td
                            key={symbol2}
                            className={`p-2 border border-gray-300 dark:border-slate-600 text-center font-semibold ${getCorrelationColor(correlation)}`}
                          >
                            {correlation.toFixed(2)}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold mb-4">Correlation Guide</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Positive Correlation</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>0.7 to 1.0: Strong positive</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-200 dark:bg-green-900/40 rounded"></div>
                  <span>0.3 to 0.7: Moderate positive</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Negative Correlation</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>-0.7 to -1.0: Strong negative</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-200 dark:bg-red-900/40 rounded"></div>
                  <span>-0.3 to -0.7: Moderate negative</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-300 dark:border-slate-600">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Correlation values range from -1 (perfect negative correlation) to +1 (perfect positive correlation). 
              Values near 0 indicate little to no correlation.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Demo Mode:</strong> This is showing simulated correlation data. In production, integrate with historical price data APIs to calculate real correlations.
          </p>
        </div>
      </div>
    </div>
  )
}
