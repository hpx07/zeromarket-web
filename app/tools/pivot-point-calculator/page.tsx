"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function PivotPointCalculatorPage() {
  const [high, setHigh] = useState(100)
  const [low, setLow] = useState(90)
  const [close, setClose] = useState(95)
  const [method, setMethod] = useState<"standard" | "fibonacci" | "camarilla">("standard")

  const pivot = (high + low + close) / 3

  const calculateLevels = () => {
    if (method === "standard") {
      return {
        r3: high + 2 * (pivot - low),
        r2: pivot + (high - low),
        r1: 2 * pivot - low,
        pivot,
        s1: 2 * pivot - high,
        s2: pivot - (high - low),
        s3: low - 2 * (high - pivot),
      }
    } else if (method === "fibonacci") {
      const range = high - low
      return {
        r3: pivot + range * 1.0,
        r2: pivot + range * 0.618,
        r1: pivot + range * 0.382,
        pivot,
        s1: pivot - range * 0.382,
        s2: pivot - range * 0.618,
        s3: pivot - range * 1.0,
      }
    } else {
      // Camarilla
      const range = high - low
      return {
        r4: close + range * 1.1 / 2,
        r3: close + range * 1.1 / 4,
        r2: close + range * 1.1 / 6,
        r1: close + range * 1.1 / 12,
        pivot,
        s1: close - range * 1.1 / 12,
        s2: close - range * 1.1 / 6,
        s3: close - range * 1.1 / 4,
        s4: close - range * 1.1 / 2,
      }
    }
  }

  const levels = calculateLevels()

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">Pivot Point Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate support and resistance levels for day trading</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Previous Day Data</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                >
                  <option value="standard">Standard</option>
                  <option value="fibonacci">Fibonacci</option>
                  <option value="camarilla">Camarilla</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">High</label>
                <input
                  type="number"
                  value={high}
                  onChange={(e) => setHigh(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Low</label>
                <input
                  type="number"
                  value={low}
                  onChange={(e) => setLow(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Close</label>
                <input
                  type="number"
                  value={close}
                  onChange={(e) => setClose(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Pivot Levels</h2>

            <div className="space-y-2">
              {Object.entries(levels).reverse().map(([key, value]) => (
                <div
                  key={key}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    key === "pivot"
                      ? "bg-yellow-100 dark:bg-yellow-900/30 font-bold"
                      : key.startsWith("r")
                      ? "bg-green-50 dark:bg-green-900/20"
                      : "bg-red-50 dark:bg-red-900/20"
                  }`}
                >
                  <span className="uppercase font-medium">{key}</span>
                  <span className="text-lg font-semibold">
                    {value.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> Pivot points help identify potential support (S) and resistance (R) levels. Use previous day's high, low, and close prices.
          </p>
        </div>
      </div>
    </div>
  )
}
