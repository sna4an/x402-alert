import { NextResponse } from "next/server";

interface ParamDef {
  name: string;
  type: string;
  description: string;
  required?: boolean;
}

interface EndpointDef {
  description: string;
  rapidHost: string;
  price: string;
  params: ParamDef[];
}

const endpoints: Record<string, EndpointDef> = {
  "bin-checker": {
    description: "BIN/IIN card information checker. Look up bank, card type, country and other details from a BIN/IIN number.",
    rapidHost: "bin-info-checker",
    price: "0.05",
    params: [
      { name: "bin", type: "string", description: "The 6-8 digit BIN/IIN number to look up", required: true },
    ],
  },
  cellystial: {
    description: "Celestial body and astronomical data. Query information about planets, stars, moons and other celestial objects.",
    rapidHost: "cellystial",
    price: "0.08",
    params: [
      { name: "query", type: "string", description: "Name of the celestial body (e.g. Mars, Andromeda)", required: true },
    ],
  },
  "defi-yield": {
    description: "DeFi yield and honest real APY data. Get real APY and yield farming data across DeFi protocols.",
    rapidHost: "defi-yield-honesty-real-apy",
    price: "0.09",
    params: [
      { name: "query", type: "string", description: "Protocol name or search query (e.g. Aave, Compound)", required: true },
    ],
  },
  "dev-intelligence": {
    description: "Developer intelligence and code metrics. Analyze developer profiles, repositories, and contribution activity.",
    rapidHost: "gocreative-developer-intelligence",
    price: "0.15",
    params: [
      { name: "query", type: "string", description: "GitHub username or repository to analyze", required: true },
    ],
  },
  "exchange-rates": {
    description: "Fast price exchange rates. Get real-time currency exchange rates for fiat and crypto pairs.",
    rapidHost: "fast-price-exchange-rates",
    price: "0.05",
    params: [
      { name: "base", type: "string", description: "Base currency code (e.g. USD, EUR, BTC)", required: true },
      { name: "target", type: "string", description: "Target currency code (e.g. EUR, GBP)", required: false },
    ],
  },
  "fuel-price": {
    description: "Live fuel/petrol/diesel prices in India. Get current fuel prices by city across India.",
    rapidHost: "fuel-petrol-diesel-live-price-india",
    price: "0.05",
    params: [
      { name: "city", type: "string", description: "Indian city name (e.g. Delhi, Mumbai)", required: true },
    ],
  },
  "gold-silver": {
    description: "Live gold and silver prices in India. Get current bullion prices in INR per gram/ounce.",
    rapidHost: "gold-silver-live-price-india",
    price: "0.06",
    params: [
      { name: "city", type: "string", description: "Indian city name for local prices (e.g. Chennai, Delhi)", required: false },
    ],
  },
  hyperliquid: {
    description: "Hyperliquid market data, open interest, and funding rates. Query perpetual futures data on Hyperliquid DEX.",
    rapidHost: "hyperliquid-market-data-oi-funding",
    price: "0.08",
    params: [
      { name: "coin", type: "string", description: "Trading pair symbol (e.g. BTC, ETH, SOL)", required: true },
    ],
  },
  "india-stock": {
    description: "India stock market data from Moneycontrol. Get stock quotes, fundamentals, and historical data for Indian equities.",
    rapidHost: "india-stock-market-moneycontrol",
    price: "0.075",
    params: [
      { name: "symbol", type: "string", description: "Stock symbol or search query (e.g. RELIANCE, TCS)", required: true },
    ],
  },
  "indian-exchange": {
    description: "Indian stock exchange API data. Get NSE/BSE market data, indices, and stock information.",
    rapidHost: "indian-stock-exchange-api2",
    price: "0.075",
    params: [
      { name: "symbol", type: "string", description: "NSE/BSE stock symbol (e.g. INFY, HDFCBANK)", required: true },
      { name: "exchange", type: "string", description: "Exchange name: NSE or BSE", required: false },
    ],
  },
  "insider-trades": {
    description: "Insider trade alerts and filings. Track insider buying and selling activity for US-listed companies.",
    rapidHost: "insider-trade-alerts",
    price: "0.10",
    params: [
      { name: "symbol", type: "string", description: "Stock ticker symbol (e.g. AAPL, MSFT, TSLA)", required: true },
    ],
  },
  "sec-risk": {
    description: "SEC 8-K risk signal analysis. Analyze SEC 8-K filings for material event risk signals.",
    rapidHost: "sec-8-k-risk-signals",
    price: "0.10",
    params: [
      { name: "symbol", type: "string", description: "Stock ticker symbol (e.g. AAPL, GOOGL)", required: true },
    ],
  },
  "trading-signals": {
    description: "Trading signals from Traders Hub. Get buy/sell signals with entry, stop-loss, and take-profit levels.",
    rapidHost: "traders-hub-trading-signals5",
    price: "0.12",
    params: [
      { name: "symbol", type: "string", description: "Trading pair or ticker (e.g. BTCUSD, EURUSD, AAPL)", required: true },
    ],
  },
  "username-check": {
    description: "Username availability checker across platforms. Check if a username is available on major social media and tech platforms.",
    rapidHost: "username-availability-checker2",
    price: "0.05",
    params: [
      { name: "username", type: "string", description: "The username to check availability for", required: true },
    ],
  },
};

function buildParamProperties(params: ParamDef[]) {
  const properties: Record<string, any> = {};
  for (const p of params) {
    properties[p.name] = {
      type: p.type,
      description: p.description,
    };
  }
  return properties;
}

function buildRequiredParams(params: ParamDef[]): string[] {
  return params.filter((p) => p.required).map((p) => p.name);
}

function buildQueryParameters(params: ParamDef[]) {
  return params.map((p) => ({
    name: p.name,
    in: "query" as const,
    required: !!p.required,
    schema: { type: p.type },
    description: p.description,
  }));
}

function buildPaths() {
  const paths: Record<string, any> = {};

  for (const [name, ep] of Object.entries(endpoints)) {
    const pathKey = `/api/${name}`;
    const properties = buildParamProperties(ep.params);
    const required = buildRequiredParams(ep.params);

    paths[pathKey] = {
      get: {
        summary: `GET /api/${name}`,
        description: ep.description,
        "x-payment-info": {
          price: { mode: "fixed", currency: "USD", amount: ep.price },
        },
        protocols: [{ x402: {} }],
        parameters: buildQueryParameters(ep.params),
        responses: {
          "200": {
            description: "Success - returns proxied RapidAPI response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  description:
                    "Response shape varies by endpoint. The raw upstream JSON is returned as-is.",
                  additionalProperties: true,
                },
              },
            },
          },
          "402": {
            description:
              "Payment required - includes Payment-Required header with base64-encoded x402 payment instructions",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                    reason: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: `POST /api/${name}`,
        description: ep.description,
        "x-payment-info": {
          price: { mode: "fixed", currency: "USD", amount: ep.price },
        },
        protocols: [{ x402: {} }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties,
                ...(required.length > 0 ? { required } : {}),
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Success - returns proxied RapidAPI response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  description:
                    "Response shape varies by endpoint. The raw upstream JSON is returned as-is.",
                  additionalProperties: true,
                },
              },
            },
          },
          "402": {
            description:
              "Payment required - includes Payment-Required header with base64-encoded x402 payment instructions",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                    reason: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
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
