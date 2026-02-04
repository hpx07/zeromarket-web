import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PivotPointCalculatorPage() {
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
        <div className="p-8 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 text-center">
          <p className="text-gray-600 dark:text-gray-400">Tool under development</p>
        </div>
      </div>
    </div>
  )
}
