import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    x402Version: 1,
    accepts: [
      {
        scheme: "exact",
        network: "eip155:8453",
        maxAmountRequired: "75000",
        resource: "https://x402-alert.vercel.app/api/india-stock",
        description: "Indian stock market data from MoneyControl",
        mimeType: "application/json",
        payTo: "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
        extra: { name: "USD Coin", version: "2" }
      },
      {
        scheme: "exact",
        network: "eip155:8453",
        maxAmountRequired: "50000",
        resource: "https://x402-alert.vercel.app/api/fuel-price",
        description: "Live petrol & diesel prices in India",
        mimeType: "application/json",
        payTo: "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
        extra: { name: "USD Coin", version: "2" }
      },
      {
        scheme: "exact",
        network: "eip155:8453",
        maxAmountRequired: "60000",
        resource: "https://x402-alert.vercel.app/api/gold-silver",
        description: "Live gold & silver prices in India",
        mimeType: "application/json",
        payTo: "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
        extra: { name: "USD Coin", version: "2" }
      },
      {
        scheme: "exact",
        network: "eip155:8453",
        maxAmountRequired: "100000",
        resource: "https://x402-alert.vercel.app/api/sec-risk",
        description: "SEC 8-K risk signal analysis",
        mimeType: "application/json",
        payTo: "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
        extra: { name: "USD Coin", version: "2" }
      },
      {
        scheme: "exact",
        network: "eip155:8453",
        maxAmountRequired: "90000",
        resource: "https://x402-alert.vercel.app/api/defi-yield",
        description: "Real DeFi yield & APY analysis",
        mimeType: "application/json",
        payTo: "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
        extra: { name: "USD Coin", version: "2" }
      },
      {
        scheme: "exact",
        network: "eip155:8453",
        maxAmountRequired: "75000",
        resource: "https://x402-alert.vercel.app/api/indian-exchange",
        description: "Indian Stock Exchange (NSE/BSE) data",
        mimeType: "application/json",
        payTo: "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
        extra: { name: "USD Coin", version: "2" }
      },
      {
        scheme: "exact",
        network: "eip155:8453",
        maxAmountRequired: "80000",
        resource: "https://x402-alert.vercel.app/api/hyperliquid",
        description: "Hyperliquid OI, funding & market data",
        mimeType: "application/json",
        payTo: "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
        extra: { name: "USD Coin", version: "2" }
      },
      {
        scheme: "exact",
        network: "eip155:8453",
        maxAmountRequired: "50000",
        resource: "https://x402-alert.vercel.app/api/exchange-rates",
        description: "Fast currency exchange rates",
        mimeType: "application/json",
        payTo: "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
        extra: { name: "USD Coin", version: "2" }
      },
      {
        scheme: "exact",
        network: "eip155:8453",
        maxAmountRequired: "120000",
        resource: "https://x402-alert.vercel.app/api/trading-signals",
        description: "Trading signals & alerts",
        mimeType: "application/json",
        payTo: "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
        extra: { name: "USD Coin", version: "2" }
      },
      {
        scheme: "exact",
        network: "eip155:8453",
        maxAmountRequired: "100000",
        resource: "https://x402-alert.vercel.app/api/insider-trades",
        description: "Insider trading alerts & data",
        mimeType: "application/json",
        payTo: "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
        extra: { name: "USD Coin", version: "2" }
      },
      {
        scheme: "exact",
        network: "eip155:8453",
        maxAmountRequired: "50000",
        resource: "https://x402-alert.vercel.app/api/bin-checker",
        description: "BIN/IIN card info lookup",
        mimeType: "application/json",
        payTo: "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
        extra: { name: "USD Coin", version: "2" }
      },
      {
        scheme: "exact",
        network: "eip155:8453",
        maxAmountRequired: "50000",
        resource: "https://x402-alert.vercel.app/api/username-check",
        description: "Username availability across platforms",
        mimeType: "application/json",
        payTo: "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
        extra: { name: "USD Coin", version: "2" }
      },
      {
        scheme: "exact",
        network: "eip155:8453",
        maxAmountRequired: "150000",
        resource: "https://x402-alert.vercel.app/api/dev-intelligence",
        description: "Developer intelligence & code analysis",
        mimeType: "application/json",
        payTo: "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
        extra: { name: "USD Coin", version: "2" }
      },
      {
        scheme: "exact",
        network: "eip155:8453",
        maxAmountRequired: "80000",
        resource: "https://x402-alert.vercel.app/api/cellystial",
        description: "Celestial satellite & celestial data",
        mimeType: "application/json",
        payTo: "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c",
        extra: { name: "USD Coin", version: "2" }
      }
    ]
  });
}
