export const API_ENDPOINTS = {
  NSE: {
    BASE: "https://www.nseindia.com/api",
    NIFTY_LIVE: "/equity-stockIndices?index=NIFTY%2050",
    BANK_NIFTY_LIVE: "/equity-stockIndices?index=NIFTY%20BANK",
    OPTION_CHAIN_NIFTY: "/option-chain-indices?symbol=NIFTY",
    OPTION_CHAIN_BANKNIFTY: "/option-chain-indices?symbol=BANKNIFTY",
    STOCK_QUOTE: "/quote-equity?symbol=",
  },
  COINGECKO: {
    BASE: "https://api.coingecko.com/api/v3",
    SIMPLE_PRICE: "/simple/price",
    COIN_MARKET_CHART: "/coins/{id}/market_chart",
    TRENDING: "/search/trending",
    TOP_COINS: "/coins/markets",
  },
  COINCAP: {
    BASE: "https://api.coincap.io/v2",
    ASSETS: "/assets",
    WEBSOCKET: "wss://ws.coincap.io/prices?assets=bitcoin,ethereum",
  },
  FOREX: {
    EXCHANGE_RATE: "https://api.exchangerate-api.com/v4/latest/USD",
  },
}

export const CACHE_TIMES = {
  STOCK_PRICES: 10, // seconds
  CRYPTO_PRICES: 30,
  NEWS: 900, // 15 minutes
  HISTORICAL_DATA: 3600, // 1 hour
  FOREX_RATES: 3600,
}

export const COLORS = {
  BULLISH: "#22C55E",
  BEARISH: "#EF4444",
  NEUTRAL: "#6B7280",
}
