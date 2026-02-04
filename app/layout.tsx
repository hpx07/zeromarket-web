import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZeroMarket - Live Stock Prices, Crypto Analysis & Trading Tools",
  description: "Free real-time stock market data, cryptocurrency prices, finance news, and professional trading calculators. Track Nifty, Bank Nifty, Bitcoin, Ethereum and more.",
  keywords: "stock market, live prices, crypto, nifty, bank nifty, trading tools, portfolio tracker, options calculator",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
