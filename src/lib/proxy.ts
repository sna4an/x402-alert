import { NextRequest, NextResponse } from "next/server";

const TREASURY = process.env.EVM_ADDRESS || "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c";
const PAYAI = "https://facilitator.payai.network";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";

async function verifyPayment(header: string, requirements: any): Promise<any> {
  const payload = JSON.parse(Buffer.from(header, "base64").toString("utf8"));
  try {
    const res = await fetch(`${PAYAI}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentPayload: payload, paymentRequirements: requirements }),
    });
    const r = await res.json();
    if (r.isValid) return { ...r, facilitator: "payai" };
  } catch {}
  return { isValid: false, invalidReason: "payai_verify_failed" };
}

async function settlePayment(header: string, requirements: any): Promise<any> {
  const payload = JSON.parse(Buffer.from(header, "base64").toString("utf8"));
  try {
    const res = await fetch(`${PAYAI}/settle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentPayload: payload, paymentRequirements: requirements }),
    });
    return await res.json();
  } catch (e: any) {
    return { success: false, errorReason: e.message };
  }
}

export async function proxy(req: NextRequest, rapidHost: string, atomicPrice: number) {
  const paymentHeader = req.headers.get("PAYMENT-SIGNATURE") || req.headers.get("payment-signature");

  if (!paymentHeader) {
    const requirements = {
      x402Version: 2,
      error: "Payment required",
      resource: { url: req.url, description: `Access to ${rapidHost} data`, mimeType: "application/json" },
      accepts: [{
        scheme: "exact", network: "eip155:8453", amount: String(atomicPrice),
        asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        payTo: TREASURY, maxTimeoutSeconds: 300,
        extra: { name: "USD Coin", version: "2" }
      }],
    extensions: {
      bazaar: {
        info: {
          input: {
            type: "http",
            method: "POST",
            bodyType: "json",
            body: {
              type: "object",
              properties: {
                query: { type: "string", description: "Input parameter" }
              }
            }
          },
          output: {
            type: "object",
            properties: {
              result: { type: "object", description: "API response data" }
            },
            example: { result: { data: "example response" } }
          }
        },
        schema: {
          type: "object",
          properties: {
            result: { type: "object", description: "API response data" }
          }
        }
      }
    }
    };
    const encoded = Buffer.from(JSON.stringify(requirements)).toString("base64");
    const res = NextResponse.json({}, { status: 402 });
    res.headers.set("Payment-Required", encoded);
    return res;
  }

  try {
    const requirements = {
      scheme: "exact", network: "eip155:8453", amount: String(atomicPrice),
      payTo: TREASURY, maxTimeoutSeconds: 300,
      asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      extra: { name: "USD Coin", version: "2" }
    };
    const verified = await verifyPayment(paymentHeader, requirements);
    if (!verified.isValid) {
      return NextResponse.json({ error: "Invalid payment", reason: verified.invalidReason }, { status: 402 });
    }

    // Proxy to RapidAPI
    const url = new URL(req.url);
    const pathParts = url.pathname.replace(/^\/api\/[a-z-]+/, "");
    const rapidUrl = `https://${rapidHost}.p.rapidapi.com${pathParts}${url.search}`;

    const headers: Record<string, string> = {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": `${rapidHost}.p.rapidapi.com`,
      "Content-Type": "application/json"
    };

    const body = req.method === "POST" || req.method === "PUT" || req.method === "PATCH"
      ? await req.text()
      : undefined;

    const resp = await fetch(rapidUrl, { method: req.method, headers, body });
    const data = await resp.text();

    // Fire-and-forget settle
    settlePayment(paymentHeader, requirements).catch((e: any) => console.error("Settle:", e));

    return new NextResponse(data, {
      status: resp.status,
      headers: { "Content-Type": resp.headers.get("content-type") || "application/json" }
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Proxy error", message: err.message }, { status: 502 });
  }
}
