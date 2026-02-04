import Link from "next/link"
import { ArrowLeft, Calculator } from "lucide-react"
import { Footer } from "@/components/layout/footer"

const tools = [
  {
    name: "Options Calculator",
    description: "Calculate P&L for Nifty and Bank Nifty options strategies",
    href: "/tools/options-calculator",
  },
  {
    name: "Position Size Calculator",
    description: "Optimal position sizing based on risk management",
    href: "/tools/position-size-calculator",
  },
  {
    name: "Pivot Point Calculator",
    description: "Support and resistance levels for day trading",
    href: "/tools/pivot-point-calculator",
  },
  {
    name: "SIP Calculator",
    description: "Calculate returns for systematic investment plans",
    href: "/tools/sip-calculator",
  },
  {
    name: "Currency Converter",
    description: "Real-time multi-currency conversion",
    href: "/tools/currency-converter",
  },
  {
    name: "Stock Screener",
    description: "Filter stocks and crypto by criteria",
    href: "/tools/stock-screener",
  },
  {
    name: "Portfolio Tracker",
    description: "Track holdings with P&L analysis",
    href: "/tools/portfolio-tracker",
  },
  {
    name: "Correlation Matrix",
    description: "Visualize asset correlations",
    href: "/tools/correlation-matrix",
  },
  {
    name: "Fibonacci Calculator",
    description: "Calculate Fibonacci retracement levels",
    href: "/tools/fibonacci-calculator",
  },
  {
    name: "Tax Calculator",
    description: "Capital gains tax calculator for India",
    href: "/tools/tax-calculator",
  },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">Trading Tools</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Professional calculators and analysis tools for traders and investors
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}
