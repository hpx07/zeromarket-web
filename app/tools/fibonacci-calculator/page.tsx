"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function FibonacciCalculatorPage() {
  const [highPrice, setHighPrice] = useState(100)
  const [lowPrice, setLowPrice] = useState(50)
  const [trend, setTrend] = useState<"uptrend" | "downtrend">("uptrend")

  const fibLevels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1]
  const range = highPrice - lowPrice

  const calculateLevel = (level: number) => {
    if (trend === "uptrend") {
      return highPrice - range * level
    } else {
      return lowPrice + range * level
    }
  }

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">Fibonacci Retracement Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate Fibonacci levels for technical analysis</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Input Prices</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Trend Direction</label>
                <select
                  value={trend}
                  onChange={(e) => setTrend(e.target.value as "uptrend" | "downtrend")}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                >
                  <option value="uptrend">Uptrend (High to Low)</option>
                  <option value="downtrend">Downtrend (Low to High)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">High Price</label>
                <input
                  type="number"
                  value={highPrice}
                  onChange={(e) => setHighPrice(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Low Price</label>
                <input
                  type="number"
                  value={lowPrice}
                  onChange={(e) => setLowPrice(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
              </div>

              <div className="pt-4 border-t border-gray-300 dark:border-slate-600">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Price Range: {range.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Fibonacci Levels</h2>

            <div className="space-y-3">
              {fibLevels.map((level) => (
                <div
                  key={level}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-900 rounded-lg"
                >
                  <span className="font-medium">
                    {level === 0 ? "0.0%" : level === 1 ? "100%" : `${(level * 100).toFixed(1)}%`}
                  </span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {calculateLevel(level).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Tip:</strong> Fibonacci retracement levels are used to identify potential support and resistance levels. Common levels are 23.6%, 38.2%, 50%, 61.8%, and 78.6%.
          </p>
        </div>
      </div>
    </div>
  )
}
