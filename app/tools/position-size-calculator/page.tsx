"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function PositionSizeCalculatorPage() {
  const [accountSize, setAccountSize] = useState(100000)
  const [riskPercentage, setRiskPercentage] = useState(2)
  const [entryPrice, setEntryPrice] = useState(100)
  const [stopLoss, setStopLoss] = useState(95)

  const riskAmount = (accountSize * riskPercentage) / 100
  const riskPerShare = Math.abs(entryPrice - stopLoss)
  const positionSize = riskPerShare > 0 ? Math.floor(riskAmount / riskPerShare) : 0
  const positionValue = positionSize * entryPrice
  const portfolioPercentage = (positionValue / accountSize) * 100

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">Position Size Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate optimal position size based on risk management</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Risk Parameters</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Account Size (₹)</label>
                <input
                  type="number"
                  value={accountSize}
                  onChange={(e) => setAccountSize(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Risk Per Trade (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={riskPercentage}
                  onChange={(e) => setRiskPercentage(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 1-2%</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Entry Price (₹)</label>
                <input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Stop Loss (₹)</label>
                <input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
            <h2 className="text-xl font-semibold mb-4">Position Details</h2>

            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Position Size</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {positionSize} shares
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Risk Amount</span>
                  <span className="font-semibold">₹{riskAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Risk Per Share</span>
                  <span className="font-semibold">₹{riskPerShare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Position Value</span>
                  <span className="font-semibold">₹{positionValue.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Portfolio %</span>
                  <span className="font-semibold">{portfolioPercentage.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Risk Management:</strong> Never risk more than 1-2% of your account on a single trade. This calculator helps you determine the right position size to maintain proper risk management.
          </p>
        </div>
      </div>
    </div>
  )
}
