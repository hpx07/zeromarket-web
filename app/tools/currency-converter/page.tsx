"use client"

import Link from "next/link"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("INR")
  const [rates, setRates] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fiatCurrencies = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD", "CHF", "CNY"]
  const cryptoCurrencies = ["BTC", "ETH"]
  const currencies = [...fiatCurrencies, ...cryptoCurrencies]

  const fetchRates = async () => {
    setLoading(true)
    try {
      const isCrypto = ['BTC', 'ETH'].includes(fromCurrency)
      const allRates: Record<string, number> = {}

      if (isCrypto) {
        // Fetch crypto prices
        const cryptoId = fromCurrency === 'BTC' ? 'bitcoin' : 'ethereum'
        const cryptoResponse = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd,eur,gbp,inr,jpy,aud,cad,chf,cny`
        )
        
        const cryptoData = await cryptoResponse.json()
        
        allRates['USD'] = cryptoData[cryptoId]?.usd || 0
        allRates['EUR'] = cryptoData[cryptoId]?.eur || 0
        allRates['GBP'] = cryptoData[cryptoId]?.gbp || 0
        allRates['INR'] = cryptoData[cryptoId]?.inr || 0
        allRates['JPY'] = cryptoData[cryptoId]?.jpy || 0
        allRates['AUD'] = cryptoData[cryptoId]?.aud || 0
        allRates['CAD'] = cryptoData[cryptoId]?.cad || 0
        allRates['CHF'] = cryptoData[cryptoId]?.chf || 0
        allRates['CNY'] = cryptoData[cryptoId]?.cny || 0

        // Get other crypto
        const otherCrypto = fromCurrency === 'BTC' ? 'ethereum' : 'bitcoin'
        const otherResponse = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${otherCrypto}&vs_currencies=usd`
        )
        const otherData = await otherResponse.json()
        const otherPrice = otherData[otherCrypto]?.usd || 0
        
        if (otherPrice > 0) {
          allRates[fromCurrency === 'BTC' ? 'ETH' : 'BTC'] = allRates['USD'] / otherPrice
        }
        allRates[fromCurrency] = 1
      } else {
        // Fetch fiat rates
        const fiatResponse = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        )
        const fiatData = await fiatResponse.json()
        Object.assign(allRates, fiatData.rates || {})

        // Fetch crypto prices
        const cryptoResponse = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
        )
        const cryptoData = await cryptoResponse.json()
        
        const usdRate = fromCurrency === 'USD' ? 1 : (allRates['USD'] || 1)
        if (cryptoData.bitcoin?.usd) {
          allRates['BTC'] = usdRate / cryptoData.bitcoin.usd
        }
        if (cryptoData.ethereum?.usd) {
          allRates['ETH'] = usdRate / cryptoData.ethereum.usd
        }
      }

      setRates(allRates)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Failed to fetch rates:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchRates()
  }, [fromCurrency])

  const convertedAmount = (rates[toCurrency] ?? 0) * amount

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4" /> Back to Tools
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-2">Currency Converter</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Real-time multi-currency conversion</p>

        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900"
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-900 dark:to-slate-800 rounded-lg text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Converted Amount</p>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              1 {fromCurrency} = {(rates[toCurrency] ?? 0).toFixed(4)} {toCurrency}
            </p>
          </div>

          <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
            <span>
              {lastUpdated && `Last updated: ${lastUpdated.toLocaleTimeString()}`}
            </span>
            <button
              onClick={fetchRates}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> Fiat rates from exchangerate-api.com, crypto prices from CoinGecko API. All rates update in real-time.
          </p>
        </div>
      </div>
    </div>
  )
}
