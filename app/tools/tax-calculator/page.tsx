"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function TaxCalculatorPage() {
  const [assetType, setAssetType] = useState<"equity" | "crypto">("equity")
  const [holdingPeriod, setHoldingPeriod] = useState<"short" | "long">("short")
  const [buyPrice, setBuyPrice] = useState(100)
  const [sellPrice, setSellPrice] = useState(150)
  const [quantity, setQuantity] = useState(100)

  const capitalGain = (sellPrice - buyPrice) * quantity

  const calculateTax = () => {
    if (assetType === "equity") {
      if (holdingPeriod === "short") {
        // STCG: 15%
        return capitalGain * 0.15
      } else {
        // LTCG: 10% above 1 lakh
        const exemption = 100000
        const taxableGain = Math.max(0, capitalGain - exemption)
        return taxableGain * 0.10
      }
    } else {
      // Crypto: 30% flat + 4% cess
      return capitalGain * 0.30 * 1.04
    }
  }

  const tax = calculateTax()
  const netGain = capitalGain - tax

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">Capital Gains Tax Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate tax liability for stock and crypto trading (India)</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Asset Type</label>
                <select
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                >
                  <option value="equity">Equity/Stocks</option>
                  <option value="crypto">Cryptocurrency</option>
                </select>
              </div>

              {assetType === "equity" && (
                <div>
                  <label className="block text-sm font-medium mb-2">Holding Period</label>
                  <select
                    value={holdingPeriod}
                    onChange={(e) => setHoldingPeriod(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                  >
                    <option value="short">Short Term (&lt; 1 year)</option>
                    <option value="long">Long Term (&gt; 1 year)</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Buy Price (₹)</label>
                <input
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Sell Price (₹)</label>
                <input
                  type="number"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
            <h2 className="text-xl font-semibold mb-4">Tax Calculation</h2>

            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Capital Gain</p>
                <p className={`text-3xl font-bold ${capitalGain >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  ₹{capitalGain.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-300 dark:border-slate-600">
                <div className="flex justify-between">
                  <span className="text-sm">Tax Rate</span>
                  <span className="font-semibold">
                    {assetType === "crypto" 
                      ? "30% + 4% cess" 
                      : holdingPeriod === "short" 
                      ? "15%" 
                      : "10% (above ₹1L)"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tax Liability</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    ₹{tax.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-300 dark:border-slate-600">
                  <span className="font-medium">Net Gain</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    ₹{netGain.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Note:</strong> This is a simplified calculation. Actual tax may vary based on your income slab, deductions, and other factors. Consult a tax professional for accurate advice.
          </p>
        </div>
      </div>
    </div>
  )
}
