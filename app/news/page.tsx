import Link from "next/link"
import { ArrowLeft, Newspaper } from "lucide-react"
import { Footer } from "@/components/layout/footer"

export default function NewsPage() {
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

        <h1 className="text-3xl font-bold mb-2">Market News</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Latest financial news and market updates
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700"
            >
              <div className="flex items-start gap-4 mb-4">
                <Newspaper className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">News Article {i}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    This is a placeholder for news content. Implement RSS feed parsing to show real news.
                  </p>
                  <p className="text-xs text-gray-500">Source • 2 hours ago</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700">
          <h3 className="font-semibold mb-2">Implementation Notes:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>Create API route to fetch and parse RSS feeds</li>
            <li>Use rss-parser npm package</li>
            <li>Aggregate news from Economic Times, Moneycontrol, CoinDesk, etc.</li>
            <li>Cache results for 15 minutes</li>
          </ul>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}
