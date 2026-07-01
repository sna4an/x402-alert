import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const slugs = [
    "bin-checker", "cellystial", "defi-yield", "dev-intelligence",
    "exchange-rates", "fuel-price", "gold-silver", "hyperliquid",
    "india-stock", "indian-exchange", "insider-trades", "sec-risk",
    "trading-signals", "username-check"
  ];

  const resources = slugs.map((slug) => `https://x402-alert.vercel.app/api/${slug}`);

  return NextResponse.json({
    version: 1,
    resources,
  });
}
