export interface StockPrice {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  timestamp: Date
}

export interface CryptoPrice {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  changePercent24h: number
  marketCap: number
  volume24h: number
  timestamp: Date
}

export interface NewsItem {
  id: string
  title: string
  description: string
  url: string
  source: string
  publishedAt: Date
  imageUrl?: string
}

export interface PortfolioHolding {
  id: string
  symbol: string
  type: "stock" | "crypto"
  quantity: number
  avgPrice: number
  currentPrice: number
  purchaseDate: Date
}

export interface CalculatorResult {
  [key: string]: number | string
}
