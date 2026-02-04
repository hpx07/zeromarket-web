import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PortfolioTrackerPage() {
  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">Portfolio Tracker</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Track your stock and crypto holdings with P&L analysis
        </p>

        <div className="p-8 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This tool is under development
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Will use IndexedDB (Dexie.js) for local storage
          </p>
        </div>
      </div>
    </div>
  )
}
