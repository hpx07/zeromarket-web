import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const from = searchParams.get('from') || 'USD'
  const isCrypto = ['BTC', 'ETH'].includes(from)

  try {
    const allRates: Record<string, number> = {}

    if (isCrypto) {
      // Fetch crypto prices
      const cryptoId = from === 'BTC' ? 'bitcoin' : 'ethereum'
      const cryptoResponse = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd,eur,gbp,inr,jpy,aud,cad,chf,cny`,
        { next: { revalidate: 60 } } // Cache for 60 seconds
      )
      
      if (!cryptoResponse.ok) {
        throw new Error('Failed to fetch crypto rates')
      }

      const cryptoData = await cryptoResponse.json()
      
      // Convert crypto prices to rates
      allRates['USD'] = cryptoData[cryptoId]?.usd || 0
      allRates['EUR'] = cryptoData[cryptoId]?.eur || 0
      allRates['GBP'] = cryptoData[cryptoId]?.gbp || 0
      allRates['INR'] = cryptoData[cryptoId]?.inr || 0
      allRates['JPY'] = cryptoData[cryptoId]?.jpy || 0
      allRates['AUD'] = cryptoData[cryptoId]?.aud || 0
      allRates['CAD'] = cryptoData[cryptoId]?.cad || 0
      allRates['CHF'] = cryptoData[cryptoId]?.chf || 0
      allRates['CNY'] = cryptoData[cryptoId]?.cny || 0

      // Get other crypto rates
      const otherCrypto = from === 'BTC' ? 'ethereum' : 'bitcoin'
      const otherCryptoResponse = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${otherCrypto}&vs_currencies=usd`,
        { next: { revalidate: 60 } }
      )
      
      if (otherCryptoResponse.ok) {
        const otherCryptoData = await otherCryptoResponse.json()
        const otherCryptoPrice = otherCryptoData[otherCrypto]?.usd || 0
        const currentCryptoPrice = allRates['USD']
        
        if (otherCryptoPrice > 0) {
          allRates[from === 'BTC' ? 'ETH' : 'BTC'] = currentCryptoPrice / otherCryptoPrice
        }
      }
      
      allRates[from] = 1
    } else {
      // Fetch fiat rates
      const fiatResponse = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${from}`,
        { next: { revalidate: 3600 } } // Cache for 1 hour
      )
      
      if (!fiatResponse.ok) {
        throw new Error('Failed to fetch fiat rates')
      }

      const fiatData = await fiatResponse.json()
      Object.assign(allRates, fiatData.rates || {})

      // Fetch crypto prices in USD
      const cryptoResponse = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd',
        { next: { revalidate: 60 } }
      )
      
      if (cryptoResponse.ok) {
        const cryptoData = await cryptoResponse.json()
        
        // Convert crypto prices to fromCurrency
        const usdRate = from === 'USD' ? 1 : (allRates['USD'] || 1)
        if (cryptoData.bitcoin?.usd) {
          allRates['BTC'] = usdRate / cryptoData.bitcoin.usd
        }
        if (cryptoData.ethereum?.usd) {
          allRates['ETH'] = usdRate / cryptoData.ethereum.usd
        }
      }
    }

    return NextResponse.json({ 
      rates: allRates,
      base: from,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Exchange rate fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exchange rates' },
      { status: 500 }
    )
  }
}
