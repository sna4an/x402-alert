import { NextResponse } from "next/server";

const endpoints: Record<string, { description: string; rapidHost: string; price: string }> = {
  "bin-checker": {
    description: "BIN/IIN card information checker",
    rapidHost: "bin-info-checker",
    price: "0.05",
  },
  "cellystial": {
    description: "Celestial body and astronomical data",
    rapidHost: "cellystial",
    price: "0.08",
  },
  "defi-yield": {
    description: "DeFi yield and honest real APY data",
    rapidHost: "defi-yield-honesty-real-apy",
    price: "0.09",
  },
  "dev-intelligence": {
    description: "Developer intelligence and code metrics",
    rapidHost: "gocreative-developer-intelligence",
    price: "0.15",
  },
  "exchange-rates": {
    description: "Fast price exchange rates",
    rapidHost: "fast-price-exchange-rates",
    price: "0.05",
  },
  "fuel-price": {
    description: "Live fuel/petrol/diesel prices in India",
    rapidHost: "fuel-petrol-diesel-live-price-india",
    price: "0.05",
  },
  "gold-silver": {
    description: "Live gold and silver prices in India",
    rapidHost: "gold-silver-live-price-india",
    price: "0.06",
  },
  "hyperliquid": {
    description: "Hyperliquid market data, open interest, and funding rates",
    rapidHost: "hyperliquid-market-data-oi-funding",
    price: "0.08",
  },
  "india-stock": {
    description: "India stock market data from Moneycontrol",
    rapidHost: "india-stock-market-moneycontrol",
    price: "0.075",
  },
  "indian-exchange": {
    description: "Indian stock exchange API data",
    rapidHost: "indian-stock-exchange-api2",
    price: "0.075",
  },
  "insider-trades": {
    description: "Insider trade alerts and filings",
    rapidHost: "insider-trade-alerts",
    price: "0.10",
  },
  "sec-risk": {
    description: "SEC 8-K risk signal analysis",
    rapidHost: "sec-8-k-risk-signals",
    price: "0.10",
  },
  "trading-signals": {
    description: "Trading signals from Traders Hub",
    rapidHost: "traders-hub-trading-signals5",
    price: "0.12",
  },
  "username-check": {
    description: "Username availability checker across platforms",
    rapidHost: "username-availability-checker2",
    price: "0.05",
  },
};

function buildPaths() {
  const paths: Record<string, any> = {};

  for (const [name, ep] of Object.entries(endpoints)) {
    const pathKey = `/api/${name}`;

    const operation = (method: string) => ({
      summary: `${method.toUpperCase()} /api/${name}`,
      description: ep.description,
      "x-payment-info": {
        price: { mode: "fixed", currency: "USD", amount: ep.price },
      },
      protocols: [{ x402: {} }],
      ...(method === "post"
        ? {
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      query: {
                        type: "string",
                        description: "Query string to pass to the upstream API",
                      },
                    },
                  },
                },
              },
            },
          }
        : {}),
      responses: {
        "200": { description: "Success" },
        "402": { description: "Payment required" },
      },
    });

    paths[pathKey] = {
      get: operation("get"),
      post: operation("post"),
    };
  }

  return paths;
}

export async function GET() {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: "x402-alert",
      version: "1.0.0",
      description:
        "x402 payment-gated financial and market data APIs backed by RapidAPI. Each request requires an x402 micropayment on Base (USDC) before data is returned.",
      contact: {
        email: "sna4an@proton.me",
      },
      "x-guidance":
        "Send a GET or POST request to any /api/* endpoint without payment to receive 402 Payment Required with payment instructions. Include a valid PAYMENT-SIGNATURE header with an x402 payment payload to receive data.",
    },
    servers: [{ url: "https://x402-alert.vercel.app" }],
    paths: buildPaths(),
  };

  return NextResponse.json(spec, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "application/json",
    },
  });
}
