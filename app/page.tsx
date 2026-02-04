import Link from "next/link"
import { ArrowRight, TrendingUp, Calculator, Newspaper, PieChart } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              ZeroMarket
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
              Your All-in-One Serverless Market Intelligence Platform
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
              Zero Complexity, Maximum Insight
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                Explore Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Track Markets
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
              title="Live Prices"
              description="Real-time stock and crypto prices from NSE, Yahoo Finance, and CoinGecko"
              href="/dashboard"
            />
            <FeatureCard
              icon={<Calculator className="w-8 h-8 text-green-600" />}
              title="Trading Tools"
              description="10+ professional calculators for options, SIP, tax, and more"
              href="/tools"
            />
            <FeatureCard
              icon={<Newspaper className="w-8 h-8 text-amber-600" />}
              title="Market News"
              description="Aggregated news from top financial sources and crypto outlets"
              href="/news"
            />
            <FeatureCard
              icon={<PieChart className="w-8 h-8 text-purple-600" />}
              title="Portfolio Tracker"
              description="Track your holdings with P&L analysis and allocation charts"
              href="/tools/portfolio-tracker"
            />
          </div>
        </div>
      </section>

      {/* Tools Preview */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Professional Trading Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200 dark:border-slate-700">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-gray-600 dark:text-gray-400 mb-4">
            <p>© 2026 ZeroMarket. Not financial advice. Trade at your own risk.</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Crafted with</span>
            <span className="text-red-500 animate-pulse">💡</span>
            <span className="text-gray-500 dark:text-gray-400">by</span>
            <a
              href="https://github.com/hpx07/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <span className="relative">
                HPX07
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </Link>
  )
}

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
