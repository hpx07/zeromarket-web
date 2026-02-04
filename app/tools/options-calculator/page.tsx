"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

type StrategyType = "single" | "straddle" | "strangle" | "spread" | "iron-condor"

export default function OptionsCalculatorPage() {
  const [strategy, setStrategy] = useState<StrategyType>("single")
  const [spotPrice, setSpotPrice] = useState(19500)
  const [strikePrice, setStrikePrice] = useState(19500)
  const [premium, setPremium] = useState(100)
  const [quantity, setQuantity] = useState(50)
  const [optionType, setOptionType] = useState<"call" | "put">("call")
  const [position, setPosition] = useState<"buy" | "sell">("buy")

  // For straddle/strangle
  const [callStrike, setCallStrike] = useState(19500)
  const [putStrike, setPutStrike] = useState(19500)
  const [callPremium, setCallPremium] = useState(100)
  const [putPremium, setPutPremium] = useState(100)

  const calculatePnL = (exitPrice: number) => {
    if (strategy === "single") {
      const intrinsicValue = optionType === "call" 
        ? Math.max(0, exitPrice - strikePrice)
        : Math.max(0, strikePrice - exitPrice)
      
      const pnl = position === "buy"
        ? (intrinsicValue - premium) * quantity
        : (premium - intrinsicValue) * quantity
      
      return pnl
    } else if (strategy === "straddle") {
      const callValue = Math.max(0, exitPrice - callStrike)
      const putValue = Math.max(0, callStrike - exitPrice)
      const totalPremium = callPremium + putPremium
      
      return position === "buy"
        ? (callValue + putValue - totalPremium) * quantity
        : (totalPremium - callValue - putValue) * quantity
    } else if (strategy === "strangle") {
      const callValue = Math.max(0, exitPrice - callStrike)
      const putValue = Math.max(0, putStrike - exitPrice)
      const totalPremium = callPremium + putPremium
      
      return position === "buy"
        ? (callValue + putValue - totalPremium) * quantity
        : (totalPremium - callValue - putValue) * quantity
    }
    
    return 0
  }

  const pricePoints = Array.from({ length: 21 }, (_, i) => spotPrice - 500 + i * 50)
  const maxProfit = Math.max(...pricePoints.map(p => calculatePnL(p)))
  const maxLoss = Math.min(...pricePoints.map(p => calculatePnL(p)))
  const breakeven = pricePoints.find(p => Math.abs(calculatePnL(p)) < 10) || spotPrice

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">Options Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Calculate P&L for Nifty and Bank Nifty options strategies
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-4">Strategy</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={strategy}
                    onChange={(e) => setStrategy(e.target.value as StrategyType)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                  >
                    <option value="single">Single Option</option>
                    <option value="straddle">Straddle</option>
                    <option value="strangle">Strangle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Position</label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Spot Price</label>
                  <input
                    type="number"
                    value={spotPrice}
                    onChange={(e) => setSpotPrice(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Lot Size</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-4">Option Details</h2>
              
              {strategy === "single" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Option Type</label>
                    <select
                      value={optionType}
                      onChange={(e) => setOptionType(e.target.value as any)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                    >
                      <option value="call">Call</option>
                      <option value="put">Put</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Strike Price</label>
                    <input
                      type="number"
                      value={strikePrice}
                      onChange={(e) => setStrikePrice(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Premium</label>
                    <input
                      type="number"
                      value={premium}
                      onChange={(e) => setPremium(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Call Strike</label>
                    <input
                      type="number"
                      value={callStrike}
                      onChange={(e) => setCallStrike(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Call Premium</label>
                    <input
                      type="number"
                      value={callPremium}
                      onChange={(e) => setCallPremium(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Put Strike</label>
                    <input
                      type="number"
                      value={putStrike}
                      onChange={(e) => setPutStrike(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Put Premium</label>
                    <input
                      type="number"
                      value={putPremium}
                      onChange={(e) => setPutPremium(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-4">P&L Analysis</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Max Profit</p>
                  <p className="text-xl font-bold text-green-600">
                    ₹{maxProfit.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Max Loss</p>
                  <p className="text-xl font-bold text-red-600">
                    ₹{maxLoss.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Breakeven</p>
                  <p className="text-xl font-bold text-blue-600">
                    ₹{breakeven.toFixed(0)}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-slate-900">
                    <tr>
                      <th className="px-4 py-2 text-left">Exit Price</th>
                      <th className="px-4 py-2 text-right">P&L</th>
                      <th className="px-4 py-2 text-right">P&L %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                    {pricePoints.map((price) => {
                      const pnl = calculatePnL(price)
                      const investment = strategy === "single" ? premium * quantity : (callPremium + putPremium) * quantity
                      const pnlPercent = (pnl / investment) * 100

                      return (
                        <tr key={price} className={price === spotPrice ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}>
                          <td className="px-4 py-2">₹{price}</td>
                          <td className={`px-4 py-2 text-right font-semibold ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ₹{pnl.toLocaleString("en-IN")}
                          </td>
                          <td className={`px-4 py-2 text-right ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {pnlPercent.toFixed(2)}%
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Note:</strong> This calculator provides theoretical P&L. Actual results may vary due to factors like time decay, volatility, and transaction costs.
          </p>
        </div>
      </div>
    </div>
  )
}
