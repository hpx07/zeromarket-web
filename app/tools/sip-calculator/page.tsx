"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function SIPCalculatorPage() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000)
  const [years, setYears] = useState(10)
  const [expectedReturn, setExpectedReturn] = useState(12)

  const months = years * 12
  const monthlyRate = expectedReturn / 12 / 100
  const futureValue =
    monthlyInvestment *
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate))
  const totalInvested = monthlyInvestment * months
  const wealthGained = futureValue - totalInvested

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">SIP Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Calculate returns for systematic investment plans
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Investment Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Monthly Investment (₹)
                </label>
                <input
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Investment Period (Years)
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Expected Return (% p.a.)
                </label>
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
            <h2 className="text-xl font-semibold mb-4">Results</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Maturity Amount
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  ₹{futureValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-300 dark:border-slate-600">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Total Invested</span>
                  <span className="font-semibold">
                    ₹{totalInvested.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Wealth Gained</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    ₹{wealthGained.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Return</span>
                  <span className="font-semibold">
                    {((wealthGained / totalInvested) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Note:</strong> This is an indicative calculation. Actual returns may vary based on market conditions.
          </p>
        </div>
      </div>
    </div>
  )
}
