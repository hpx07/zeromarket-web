# ZeroMarket

**Your All-in-One Serverless Market Intelligence Platform**

Zero Complexity, Maximum Insight

## Overview

ZeroMarket is a production-ready, serverless platform for live stock prices, crypto analysis, finance news, and comprehensive trading tools. Built with Next.js 14, TypeScript, and TailwindCSS.

## Features

- 📈 **Live Market Data**: Real-time stock prices from NSE and global markets via Yahoo Finance
- 💰 **Crypto Tracking**: Live cryptocurrency prices from CoinGecko, CoinCap, and Binance
- 📰 **News Aggregation**: Curated financial news from top sources
- 🧮 **10+ Trading Tools**: Professional calculators for options, SIP, tax, and more
- 📊 **Portfolio Tracker**: Track your holdings with P&L analysis
- 🎨 **Modern UI**: Responsive design with dark mode support
- 🚀 **Serverless**: Deploy on Vercel with edge functions

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Charts**: Lightweight Charts, Recharts, Chart.js
- **3D Graphics**: Three.js + React Three Fiber
- **Forms**: React Hook Form + Zod
- **Storage**: IndexedDB (Dexie.js)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd zeromarket
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Add your API keys (optional):
```env
NEXT_PUBLIC_ALPHA_VANTAGE_KEY=your_key_here
NEXT_PUBLIC_CRYPTOCOMPARE_KEY=your_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
zeromarket/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (serverless functions)
│   ├── dashboard/         # Dashboard page
│   ├── tools/             # Trading tools pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── charts/           # Chart components
│   └── providers.tsx     # App providers
├── lib/                   # Utility functions
│   ├── api-client.ts     # API calling functions
│   ├── calculations.ts   # Calculator logic
│   ├── constants.ts      # App constants
│   └── formatters.ts     # Formatting utilities
├── types/                 # TypeScript types
├── hooks/                 # Custom React hooks
├── stores/                # Zustand stores
└── public/                # Static assets
```

## Available Tools

1. **Options Calculator** - Calculate P&L for Nifty and Bank Nifty options
2. **Position Size Calculator** - Optimal position sizing based on risk
3. **Pivot Point Calculator** - Support and resistance levels
4. **SIP Calculator** - Systematic investment plan returns
5. **Currency Converter** - Real-time multi-currency conversion
6. **Stock Screener** - Filter stocks and crypto by criteria
7. **Portfolio Tracker** - Track holdings with P&L
8. **Correlation Matrix** - Visualize asset correlations
9. **Fibonacci Calculator** - Fibonacci retracement levels
10. **Tax Calculator** - Capital gains tax for India

## API Routes

- `/api/crypto-prices` - Fetch cryptocurrency prices
- `/api/stock-quote` - Get stock quotes (to be implemented)
- `/api/nse-proxy` - Proxy for NSE India API (to be implemented)
- `/api/news-feed` - Aggregated news feed (to be implemented)
- `/api/forex-rates` - Currency exchange rates (to be implemented)

## Free APIs can be Used

- **NSE India**: Indian stock market data
- **Yahoo Finance**: Global stock data
- **CoinGecko**: Cryptocurrency prices
- **CoinCap**: Real-time crypto data
- **Binance**: OHLCV data for charts
- **ExchangeRate-API**: Forex rates
- **RSS Feeds**: Financial news


## Development Roadmap

### Phase 1 (Current)
- ✅ Project setup
- ✅ Basic UI and routing
- ✅ Sample SIP calculator
- 🔄 Implement remaining tools
- 🔄 Add API integrations
- 🔄 Build chart components

### Phase 2
- User authentication
- Cloud sync for watchlists
- Price alerts
- Advanced charting
- Mobile PWA

### Phase 3
- AI-powered signals
- Sentiment analysis
- Premium features
- API for developers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is for educational purposes. Not financial advice.

## Disclaimer

⚠️ **Important**: This platform is for informational purposes only. It does not constitute financial advice. Trading and investing involve substantial risk of loss. Always do your own research and consult with a qualified financial advisor before making investment decisions.

## Support

For issues and questions, please open an issue on GitHub.

---

Built with 💡 using Next.js and modern web technologies including AI by [HPX07](https://github.com/hpx07/)
