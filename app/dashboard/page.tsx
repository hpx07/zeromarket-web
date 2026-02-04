import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/layout/footer"

export default function DashboardPage() {
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

        <h1 className="text-3xl font-bold mb-8">Market Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold mb-4">Nifty 50</h2>
            <p className="text-3xl font-bold mb-2">Loading...</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Connect API to see live data
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold mb-4">Bank Nifty</h2>
            <p className="text-3xl font-bold mb-2">Loading...</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Connect API to see live data
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold mb-4">Bitcoin</h2>
            <p className="text-3xl font-bold mb-2">Loading...</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Connect API to see live data
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700">
          <h3 className="font-semibold mb-2">Next Steps:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>Run <code className="bg-white dark:bg-slate-900 px-2 py-1 rounded">npm install</code> to install dependencies</li>
            <li>Implement API routes in <code className="bg-white dark:bg-slate-900 px-2 py-1 rounded">app/api</code></li>
            <li>Add data fetching hooks in <code className="bg-white dark:bg-slate-900 px-2 py-1 rounded">hooks</code></li>
            <li>Build chart components using Lightweight Charts</li>
          </ul>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}
